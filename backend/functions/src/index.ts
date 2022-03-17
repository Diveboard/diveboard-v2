import 'reflect-metadata';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import UserRecord = admin.auth.UserRecord;
import { Errors } from './common/errors';
import { generateOtp } from './common/generate';
import { validateRequest } from './common/validate';
import { LogInRequest } from './validation/LogInRequest';

admin.initializeApp();



export const authStart = functions.https.onCall(async (request, context): Promise<any> => {
    const data = await validateRequest(request, LogInRequest);

    let user: UserRecord;
    try {
        user = await admin.auth().getUserByEmail(data.email);
    } catch (e) {
        user = await admin.auth().createUser({
            email: data.email,
        });
    }

    const otpDoc = await admin.firestore().collection('user-otp').doc(user.email!).get();

    let otpData: {
        otp: string | null;
        sentAt: Date | null;
        expiresAfter: any;
    } = otpDoc.data() as any;

    if (!otpDoc.exists && !otpData) {
        await admin.firestore().collection('user-otp').doc(user.email!).create({
            otp: null,
            sentAt: null,
            expiresAfter: null,
        });

        const newOtpDoc = await admin.firestore().collection('user-otp').doc(user.email!).get();

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
            html: `Your ot for Diverboard: <b>${otpData.otp}</b>`,
        },
    })

    await admin.firestore().collection('user-otp').doc(user.email!).update(otpData)

    return {
        expiresAfter: otpData.expiresAfter.toDate ? otpData.expiresAfter.toDate() : otpData.expiresAfter,
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

    const otpDoc = await admin.firestore().collection('user-otp').doc(user.email!).get();

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

    await admin.firestore().collection('user-otp').doc(user.email!).update({
        otp: null,
        sentAt: null,
        expiresAfter: null,
    });

    return {
        token,
    }
})

