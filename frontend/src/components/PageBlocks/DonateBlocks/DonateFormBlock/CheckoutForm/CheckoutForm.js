import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from '@stripe/react-stripe-js';
import React, { useState } from "react";
import styles from './styles.module.scss'
import { Button } from "../../../../Buttons/Button";
import { Input } from "../../../../Input/CommonInput";
import { Checkbox } from "../../../../CheckBox";
import { customDonation } from "../../../../../firebase/donate/donateService";
import { FormInput } from "../../../../Input/FormInput";

export const CheckoutForm = ({ planMode, setPlaneMode }) => {
    const [ amount, setAmount ] = useState();
    const [ customerName, setCustomerName ] = useState('');
    const [ saveCustomer, setSaveCustomer ] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement('cardNumber');

        const { token } = await stripe.createToken(cardElement);

        await customDonation(amount*100, saveCustomer, token.id);

        await stripe.redirectToCheckout({
                    successUrl: 'http://localhost:3000/success'})

    };
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <div className={styles.elements}>
                    { planMode === 'custom' && <label className={styles.label}> Donation Amount
                        <FormInput
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
                            />
                        </div>
                    </label>
                    <div className={styles.block}>
                        <label className={styles.label}> Exp Date *
                            <CardExpiryElement className={styles.blockElement}/> </label>
                        <label className={styles.label}> CVV *
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

