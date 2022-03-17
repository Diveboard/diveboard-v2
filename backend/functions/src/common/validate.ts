import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as functions from 'firebase-functions';
import { Errors } from './errors';


export async function validateRequest<T>(data: any, schema: new () => T): Promise<T> {
    const transformedObject = plainToClass(data, schema);

    const errors = await validate(transformedObject as object, {
        validationError: {
            target: false,
        },
        whitelist: true,
    });

    if (errors.length) {
        throw new functions.https.HttpsError('invalid-argument', Errors.REQUEST_DATA_INVALID, errors)
    }

    return transformedObject as T;
}
