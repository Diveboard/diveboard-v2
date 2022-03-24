import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as functions from 'firebase-functions';
import { Errors } from './errors';
import { CallableContext } from 'firebase-functions/lib/common/providers/https';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;
import * as admin from 'firebase-admin';

function mapErrors(errors: ValidationError[]): any {
    return errors.map(e => {
        const constraintValues = Object.keys(e.constraints as object);

        return {
            property: e.property,
            error: e.constraints![constraintValues[0]]
        }
    });
}

export async function validateRequest<T>(data: any, schema: ClassConstructor<T>): Promise<T> {
    const transformedObject = plainToInstance(schema, data);

    const errors = await validate(transformedObject as any, {
        validationError: {
            target: false,
        },
        whitelist: true,
    });

    if (errors.length) {
        throw new functions.https.HttpsError('invalid-argument', Errors.REQUEST_DATA_INVALID, mapErrors(errors))
    }

    return transformedObject as T;
}

export function userExpectedInRequest(context: CallableContext): Promise<UserRecord> {
    if (!context.auth?.uid) {
        throw new functions.https.HttpsError('unauthenticated', Errors.AUTH_REQUIRED)
    }

    return  admin.auth().getUser(context.auth.uid);
}
