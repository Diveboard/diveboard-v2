import 'reflect-metadata';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import UserRecord = admin.auth.UserRecord;
import { Errors } from './common/errors';
import { generateOtp } from './common/generate';
import { userExpectedInRequest, validateRequest } from './common/validate';
import { LogInRequest } from './validation/LogInRequest';
import { AuthStartRequest } from './validation/AuthStartRequest';
import { Stripe } from 'stripe';
import { OneTimeDonationRequest } from './validation/OneTimeDonationRequest';
import { handleStripeError } from './common/stripe';
import { SubscriptionDonationRequest } from './validation/SubscriptionDonationRequest';

const stripe = new Stripe(process.env.STRIPE_API_KEY || '', {
    apiVersion: '2020-08-27',
})

admin.initializeApp();

export const authStart = functions.https.onCall(async (request, context): Promise<any> => {
    const data = await validateRequest(request, AuthStartRequest);

    // TODO: check if user doesn't have user-otp and user-stripe -- create
    let newUser = false;

    let user: UserRecord;
    try {
        user = await admin.auth().getUserByEmail(data.email);
    } catch (e) {
        user = await admin.auth().createUser({
            email: data.email,
        });

        const customer = await stripe.customers.create({
            email: data.email,
        });
        
        await admin.firestore().collection('user-stripe').doc(user.uid).create({
            customerId: customer.id,
        });

        newUser = true;
    }

    const otpDoc = await admin.firestore().collection('user-otp').doc(user.uid).get();

    let otpData: {
        otp: string | null;
        sentAt: Date | null;
        expiresAfter: any;
    } = otpDoc.data() as any;

    if (!otpDoc.exists && !otpData) {
        await admin.firestore().collection('user-otp').doc(user.uid).create({
            otp: null,
            sentAt: null,
            expiresAfter: null,
        });

        const newOtpDoc = await admin.firestore().collection('user-otp').doc(user.uid).get();

        otpData = newOtpDoc.data() as any;
    }


    if (!otpData.otp || (!!otpData.expiresAfter && otpData.expiresAfter.toDate().getTime() < new Date().getTime())) {
        otpData = {
            otp: generateOtp(),
            // Now
            sentAt: new Date(),
            // In 5 minutes
            expiresAfter: new Date(new Date().getTime() + 5 * 60 * 1000),
        }
    }

    await admin.firestore().collection('mail').add({
        to: user.email,
        message: {
            subject: 'Diverboard OTP',
            html: `Your otp for Diverboard: <b>${otpData.otp}</b>`,
        },
    })

    await admin.firestore().collection('user-otp').doc(user.uid).update(otpData)

    return {
        expiresAfter: otpData.expiresAfter.toDate ? otpData.expiresAfter.toDate().getTime() : otpData.expiresAfter.getTime(),
        newUser,
    };
});

export const logIn = functions.https.onCall(async (request, context): Promise<any> => {
    const data = await validateRequest(request, LogInRequest);

    let user: UserRecord;

    try {
        user = await admin.auth().getUserByEmail(data.email);
    } catch (e) {
        throw new functions.https.HttpsError('not-found', Errors.USER_NOT_FOUND)
    }

    const otpDoc = await admin.firestore().collection('user-otp').doc(user.uid).get();

    let otpData: {
        otp: string | null;
        sentAt: Date | null;
        expiresAfter: any;
    } = otpDoc.data() as any;

    if (!otpDoc.exists) {
        throw new functions.https.HttpsError('not-found', Errors.OTP_NOT_FOUND)
    }

    if (!otpData.otp || (!!otpData.expiresAfter && otpData.expiresAfter.toDate().getTime() < new Date().getTime())) {
        throw new functions.https.HttpsError('deadline-exceeded', Errors.OTP_EXPIRED)
    }

    if (data.otp !== otpData.otp) {
        throw new functions.https.HttpsError('invalid-argument', Errors.OTP_INVALID)
    }

    const token = await admin.auth().createCustomToken(user.uid);

    await admin.firestore().collection('user-otp').doc(user.uid).update({
        otp: null,
        sentAt: null,
        expiresAfter: null,
    });

    return {
        token,
    }
})

export const oneTimeDonation = functions.https.onCall(async (request, context): Promise<any> => {
    const user = await userExpectedInRequest(context);
    const data = await validateRequest(request, OneTimeDonationRequest);

    const stripeChargeRequest: Stripe.ChargeCreateParams = {
        amount: data.amount,
        currency: 'usd',
        description: `One-time donation by User ${user.email}`,
    };

    if (data.saveCard && data.token) {
        const stripeDoc = await admin.firestore().collection('user-stripe').doc(user.uid).get();
        const stripeData = stripeDoc.data();

        const newSource = await stripe.customers.createSource(stripeData!.customerId, {
            source: data.token,
        });

        await stripe.customers.update(stripeData!.customerId, {
            default_source: newSource.id,
        });

        await admin.firestore().collection('user-stripe').doc(user.uid).set({
            defaultSource: newSource.id,
        }, { merge: true });

        stripeChargeRequest.customer = stripeData!.customerId;
    } else if (data.token) {
        stripeChargeRequest.source = data.token;
    } else if (!data.token) {
        const stripeDoc = await admin.firestore().collection('user-stripe').doc(user.uid).get();
        const stripeData = stripeDoc.data();

        if (!stripeData!.defaultSource) {
            throw new functions.https.HttpsError('invalid-argument', Errors.STRIPE_NO_DEFAULT_METHOD)
        }

        stripeChargeRequest.customer = stripeData!.customerId;
    }


    try {
        await stripe.charges.create(stripeChargeRequest);
    } catch (e) {
        handleStripeError(e as Stripe.StripeError);
    }

    return {
        success: true,
    }
});

// 31536000

const subscriptions: {
    [key: string]: string;
} = {
    'fiveForTwelve': 'price_1Meg0FDVvZMVepMoOPhIOXrY',
    'threeForTwelve': 'price_1MefzzDVvZMVepMoAZ7dDG7F',
};

export const subDonation = functions.https.onCall(async (request, context): Promise<any> => {
    const user = await userExpectedInRequest(context);
    const data = await validateRequest(request, SubscriptionDonationRequest);

    if (!subscriptions) {
        throw new functions.https.HttpsError('invalid-argument', Errors.STRIPE_INVALID_SUBSCRIPTION)
    }
    
    let stripeDoc = await admin.firestore().collection('user-stripe').doc(user.uid).get();
    let stripeData = stripeDoc.data();
    
    if (!stripeData) {
        console.log('NO STRIPE DATA. TRYING TO CREATE A NEW ONE...')
        
        const authUser = await admin.auth().getUser(user.uid)
        
        const customer = await stripe.customers.create({
            email: authUser.email,
            name: authUser.displayName,
            phone: authUser.phoneNumber,
        });
        
        await admin.firestore().collection('user-stripe').doc(user.uid).create({
            customerId: customer.id,
        });
        
        stripeDoc = await admin.firestore().collection('user-stripe').doc(user.uid).get();
        stripeData = stripeDoc.data();
    }

    if (!data.token && !stripeData!.defaultSource) {
        throw new functions.https.HttpsError('invalid-argument', Errors.STRIPE_NO_DEFAULT_METHOD)
    }

    if (stripeData && stripeData!.activeSubscription && stripeData!.subscriptionEndsAt.toDate().getTime() > (new Date().getTime()) ) {
        throw new functions.https.HttpsError('invalid-argument', Errors.STRIPE_SUBSCRIPTION_ACTIVE)
    }

    if (data.token) {
        const newSource = await stripe.customers.createSource(stripeData!.customerId, {
            source: data.token,
        });

        await stripe.customers.update(stripeData!.customerId, {
            default_source: newSource.id,
        })

        await admin.firestore().collection('user-stripe').doc(user.uid).set({
            defaultSource: newSource.id,
        }, { merge: true });
    }

    const sub = await stripe.subscriptions.create({
        customer: stripeData!.customerId,
        items: [
            {
                price: subscriptions[data.subType],
            },
        ],
        cancel_at: Math.ceil((new Date().getTime() / 1000) + 31536000), // In a year
    });

    await admin.firestore().collection('user-stripe').doc(user.uid).set({
        activeSubscription: sub.id,
        subscriptionEndsAt: new Date(sub.cancel_at! * 1000),
    }, { merge: true });

    return {
        success: true,
    }
});

export const resetEmail = functions.https.onCall(async (request, context): Promise<any> => {
    const user = await userExpectedInRequest(context);
    const data = await validateRequest(request, AuthStartRequest);

    const otpDoc = await admin.firestore().collection('user-otp').doc(user.uid).get();

    let otpData: {
        otp: string | null;
        sentAt: Date | null;
        expiresAfter: any;
    } = otpDoc.data() as any;

    if (!otpDoc.exists && !otpData) {
        await admin.firestore().collection('user-otp').doc(user.uid).create({
            otp: null,
            sentAt: null,
            expiresAfter: null,
        });

        const newOtpDoc = await admin.firestore().collection('user-otp').doc(user.uid).get();

        otpData = newOtpDoc.data() as any;
    }


    if (!otpData.otp || (!!otpData.expiresAfter && otpData.expiresAfter.toDate().getTime() < new Date().getTime())) {
        otpData = {
            otp: generateOtp(),
            // Now
            sentAt: new Date(),
            // In 5 minutes
            expiresAfter: new Date(new Date().getTime() + 5 * 60 * 1000),
        }
    }

    await admin.firestore().collection('mail').add({
        to: data.email,
        message: {
            subject: 'Diverboard OTP',
            html: `Your otp for Diverboard: <b>${otpData.otp}</b>`,
        },
    })

    await admin.firestore().collection('user-otp').doc(user.uid).update(otpData);

    return {
        expiresAfter: otpData.expiresAfter.toDate ? otpData.expiresAfter.toDate().getTime() : otpData.expiresAfter.getTime()
    };

})

export const confirmResetEmail = functions.https.onCall(async (request, context): Promise<any> => {
    const user = await userExpectedInRequest(context);
    const data = await validateRequest(request, LogInRequest);

    const otpDoc = await admin.firestore().collection('user-otp').doc(user.uid).get();

    let otpData: {
        otp: string | null;
        sentAt: Date | null;
        expiresAfter: any;
    } = otpDoc.data() as any;


    if (!otpDoc.exists) {
        throw new functions.https.HttpsError('not-found', Errors.OTP_NOT_FOUND)
    }

    if (!otpData.otp || (!!otpData.expiresAfter && otpData.expiresAfter.toDate().getTime() < new Date().getTime())) {
        throw new functions.https.HttpsError('deadline-exceeded', Errors.OTP_EXPIRED)
    }

    if (data.otp !== otpData.otp) {
        throw new functions.https.HttpsError('invalid-argument', Errors.OTP_INVALID)
    }

    await admin.auth().updateUser(user.uid, {
        email: data.email
    });

    const token = await admin.auth().createCustomToken(user.uid);

    await admin.firestore().collection('user-otp').doc(user.uid).update({
        otp: null,
        sentAt: null,
        expiresAfter: null,
    });

    return {
        token
    }

})
