import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import UserRecord = admin.auth.UserRecord;

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();


function generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(10);
}

export const authStart = functions.https.onRequest(async (request, response): Promise<any> => {
    let user: UserRecord;
    try {
        user = await admin.auth().getUserByEmail(request.body.email);
    } catch (e) {
        user = await admin.auth().createUser({
            email: request.body.email,
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

    return response.send({
        expiresAfter: otpData.expiresAfter.toDate ? otpData.expiresAfter.toDate() : otpData.expiresAfter,
    });
});


export const logIn = functions.https.onRequest(async (request, response): Promise<any> => {
    let user: UserRecord;

    try {
        user = await admin.auth().getUserByEmail(request.body.email);
    } catch (e) {
        return response.send({
            error: 'User not found',
        })
    }

    const otpDoc = await admin.firestore().collection('user-otp').doc(user.email!).get();

    let otpData: {
        otp: string | null;
        sentAt: Date | null;
        expiresAfter: any;
    } = otpDoc.data() as any;

    if (!otpDoc.exists) {
        return response.send({
            error: 'User has no OTP requested'
        })
    }

    if (!otpData.otp || (!!otpData.expiresAfter && otpData.expiresAfter.toDate().getTime() < new Date().getTime())) {
        return response.send({
            error: 'Code is expired'
        })
    }

    if (request.body.otp !== otpData.otp) {
        return response.send({
            error: 'Code is invalid'
        })
    }

    const token = await admin.auth().createCustomToken(user.uid);

    await admin.firestore().collection('user-otp').doc(user.email!).update({
        otp: null,
        sentAt: null,
        expiresAfter: null,
    });

    return response.send({
        token,
    })
})

