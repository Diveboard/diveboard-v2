import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from '@stripe/react-stripe-js';
import React from "react";
import styles from './styles.module.scss'
import { Button } from "../../../../Buttons/Button";
import { Input } from "../../../../Input/CommonInput";
import { Checkbox } from "../../../../CheckBox";

export const CheckoutForm = ({planMode, setPlanMode}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://diveboard-org.web.app/main/home-guest",
            },

        });


        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }

    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <div className={styles.elements}>
                    { planMode === 'custom' && <label className={styles.label}> Donation Amount
                        <Input
                            width={160}
                            height={48}
                            placeholder={'$ 10.00'}
                        />
                    </label>
                    }
                    <label className={styles.labelBlock}> Card Number *
                        <div className={styles.elementNumber}>
                            <CardNumberElement/>
                        </div>
                    </label>
                    <div className={styles.block}>
                        <label className={styles.labelBlock}> Exp Date *
                            <CardExpiryElement className={styles.blockElement}/> </label>
                        <label className={styles.labelBlock}> CVV *
                            <CardCvcElement className={styles.blockElement}/> </label>
                    </div>
                    <label className={styles.label}> Card Holder’s Name *
                        <Input
                            height={48}
                            placeholder={'Name'}
                        />
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Checkbox checked={true}>
                        <span className={styles.commonText}> Save Card For Later Payments </span>
                    </Checkbox>
                </div>
                <Button
                    disabled={!stripe}
                    width={420}
                    height={48}
                    borderRadius={30}
                    border='none'
                    backgroundColor='#FDC90D'
                >
                    <span className={styles.btnDonate}>  Donate Now </span>
                </Button>
            </form>
        </div>
    )
}

