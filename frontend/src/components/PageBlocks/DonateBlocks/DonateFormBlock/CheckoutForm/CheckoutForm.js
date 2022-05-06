import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement, CardElement,
} from '@stripe/react-stripe-js';
import React, { useState } from "react";
import styles from './styles.module.scss'
import { Button } from "../../../../Buttons/Button";
import { Input } from "../../../../Input/CommonInput";
import { Checkbox } from "../../../../CheckBox";
import { customDonation } from "../../../../../firebase/user/donateService";

export const CheckoutForm = ({planMode, setPlanMode, contentMode, setContentMode}) => {
    const [amount, setAmount] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [saveCustomer, setSaveCustomer ] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const stripe = useStripe();
    const elements = useElements();


    const handleCardDetailsChange = event => {
        event.error ? setCheckoutError(event.error.message) : setCheckoutError();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

       const stripeInfo = await customDonation(amount, saveCustomer);
        console.log(stripeInfo)

        const cardElement = elements.getElement(CardElement);
        console.log(cardElement)


        const result = await stripe.confirmCardPayment("pi_3KOivPJVPt1Jo8AR0OL9pLFj_secret_UYhK5EwG4GJzNjZD1QVdhD56n", {
            payment_method: {
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: customerName,
                },
                confirmParams: {
                    // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
                    // return_url: '',
                },
            },
        })
        console.log(result)

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
                            value={amount}
                            setValue={setAmount}
                            width={160}
                            height={48}
                            placeholder={'$ 10.00'}
                        />
                    </label>
                    }
                    <label className={styles.labelBlock}> Card Number *
                        <div className={styles.elementNumber}>
                            <CardNumberElement
                                onChange={handleCardDetailsChange}
                            />
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
                            value={customerName}
                            setValue={setCustomerName}
                            height={48}
                            placeholder={'Name'}
                        />
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Checkbox
                        name={'save-customer'}
                        checked={saveCustomer}
                        onChecked={setSaveCustomer}
                    >
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

