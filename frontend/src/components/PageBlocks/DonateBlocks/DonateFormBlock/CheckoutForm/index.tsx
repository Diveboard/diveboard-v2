import React, { FC, useState } from 'react';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from '@stripe/react-stripe-js';

import { Button } from '../../../../Buttons/Button';
import { Input } from '../../../../Input/CommonInput';
import { Checkbox } from '../../../../CheckBox';
import { customDonation, subDonation } from '../../../../../firebase/donate/donateService';
import { FormInput } from '../../../../Input/FormInput';
import { FormProps } from '../../donateTypes';
import styles from './styles.module.scss';
import {Loader} from '../../../../Loader';

export const CheckoutForm: FC<FormProps> = ({
                                                planMode,
                                                setContentMode,
                                            }) => {
    const [amount, setAmount] = useState<number>();
    const [customerName, setCustomerName] = useState('');
    const [saveCustomer, setSaveCustomer] = useState(false);
    const [error, setError] = useState('');
    const [inputError, setInputError] = useState('');
    const [loading, setLoading] = useState(false);


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement('cardNumber');

        const { token, error } = await stripe.createToken(cardElement, {name: customerName});

        if(error){
            setError('The field is required')
            setLoading(false);
        }

        if (planMode === 'custom') {

            const amountInDollars = amount * 100;

            if (!amountInDollars) {
                setInputError(  'Amount - Required')
            }

            await customDonation(amountInDollars, saveCustomer, token.id);

        } else {
            const subType = planMode === '3/month' ? 'threeForTwelve' : 'fiveForTwelve';
            await subDonation(token.id, subType);
        }

        setContentMode('success');
    };

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: "#000345",
                fontSize: "14px",
                opacity: 0.4,
                "::placeholder": {
                    textTransform: 'lowercase',
                },
            },
        },
    };


    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <div className={styles.elements}>
                    {planMode === 'custom' && (
                        <label className={styles.label}>
                            {' '}
                            Donation Amount *
                            <FormInput
                                value={amount}
                                setValue={setAmount}
                                inputError={inputError}
                                setInputError={setInputError}
                                width={160}
                                height={48}
                                placeholder="$ 10.00"
                            />
                        </label>
                    )}
                    <label className={styles.label}>
                        Card Number *
                        <div className={styles.elementNumber}>
                            <CardNumberElement options={CARD_ELEMENT_OPTIONS}
                            />
                        </div>
                        {error && <span className={styles.errorTextForm}> Card Number - Required </span>}
                    </label>
                    <div className={styles.block}>
                        <div className={styles.smallInputWrapper}>
                            <label className={styles.label}>
                                Exp Date *
                            </label>
                            <CardExpiryElement className={styles.blockElement}
                                               options={CARD_ELEMENT_OPTIONS}/>
                            {error && <span className={styles.errorTextForm}> Card Expiry - Required</span>}
                        </div>
                        <div className={styles.smallInputWrapper}>
                            <label className={styles.label}>
                                CVC *
                            </label>
                            <CardCvcElement className={styles.blockElement}
                                            options={CARD_ELEMENT_OPTIONS}/>
                            {error && <span className={styles.errorTextForm}> CVC - Required </span>}
                        </div>

                    </div>
                    <label className={styles.label}>
                        {' '}
                        Card Holder’s Name
                        <Input
                            value={customerName}
                            setValue={setCustomerName}
                            height={48}
                            placeholder="Name"
                        />
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <Checkbox
                        name="save-customer"
                        checked={saveCustomer}
                        onChecked={setSaveCustomer}
                    >
                        <span className={styles.checkboxText}> Save Card For Later Payments </span>
                    </Checkbox>
                </div>

                <Button
                    disable={!stripe}
                    width={420}
                    height={48}
                    borderRadius={30}
                    border="none"
                    backgroundColor="#FDC90D"
                >
                    {loading && <Loader loading={loading} />}
                    <span className={styles.btnDonate}>  Donate Now </span>
                </Button>
            </form>
        </div>
    );
};
