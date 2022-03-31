import * as functions from 'firebase-functions';
import { Errors } from './errors';
import { Stripe } from 'stripe';

export function handleStripeError(err: Stripe.StripeError) {
    switch (err.type) {
        case 'StripeCardError':
            throw new functions.https.HttpsError('invalid-argument', Errors.STRIPE_BAD_CARD, { details: err.message })
        case 'StripeRateLimitError':
        case 'StripeInvalidRequestError':
        case 'StripeAPIError':
        case 'StripeConnectionError':
        case 'StripeAuthenticationError':
        default:
            throw new functions.https.HttpsError('internal', Errors.STRIPE_GENERAL_FAILURE, process.env.DEBUG_ENABLED ? {
                message: err.message,
                error: err,
            } : undefined)
    }
}
