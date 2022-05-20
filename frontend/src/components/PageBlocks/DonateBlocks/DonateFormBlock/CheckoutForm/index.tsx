import React, { FC, useEffect, useState } from 'react';
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
import { Loader } from '../../../../Loader';
import { FormProps } from '../../donateTypes';
import styles from './styles.module.scss';

export const CheckoutForm: FC<FormProps> = ({
  planMode,
  setContentMode,
}) => {
  const [amount, setAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [saveCustomer, setSaveCustomer] = useState(false);

  const [amountError, setAmountError] = useState('');
  const [cardError, setCardError] = useState('');
  const [expDateError, setExpDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [nameError, setNameError] = useState('');

  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (Number.isNaN(+amount)) {
      setAmountError('only digits allowed');
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (amount === '0' || !amount) {
      setAmountError('empty amount');
    }

    if (!customerName || customerName.length < 3) {
      setNameError('too short name');
    }

    if (amountError && cardError && expDateError && cvvError && nameError) {
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement('cardNumber');

    const {
      token,
      error,
    } = await stripe.createToken(cardElement, { name: customerName });
    if (error) {
      setLoading(false);
      return;
    }

    if (planMode === 'custom') {
      const amountInDollars = +amount * 100;
      try {
        await customDonation(amountInDollars, saveCustomer, token.id);
      } catch (e) {
        setLoading(false);
        setCardError(e.message);
      }
    } else {
      const subType = planMode === '3/month' ? 'threeForTwelve' : 'fiveForTwelve';
      try {
        await subDonation(token.id, subType);
      } catch (e) {
        setLoading(false);
        setCardError(e.message);
        return;
      }
    }

    setContentMode('success');
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#000345',
        fontSize: '14px',
        opacity: 0.4,
        '::placeholder': {
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
            <>
              <label className={styles.label}>
                Donation Amount *
              </label>
              <Input
                value={amount}
                setValue={setAmount}
                error={amountError}
                setError={setAmountError}
                width={160}
                height={48}
                placeholder="$ 10.00"
              />
            </>
          )}

          <div>
            <label className={styles.label}>
              Card Number *
            </label>
            <div className={`${styles.elementNumber} ${cardError && styles.errorInput}`}>
              <CardNumberElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={(e) => {
                  if (e.error) {
                    setCardError(e.error.message);
                  } else {
                    setCardError('');
                  }
                }}
              />
            </div>
            {cardError && (
              <span className={styles.errorTextForm}>
                {cardError}
              </span>
            )}
          </div>

          <div className={styles.block}>
            <div className={styles.smallInputWrapper}>
              <label className={styles.label}>
                Exp Date *
              </label>
              <CardExpiryElement
                className={`${styles.blockElement} ${expDateError && styles.errorInput}`}
                options={CARD_ELEMENT_OPTIONS}
                onChange={(e) => {
                  if (e.error) {
                    setExpDateError(e.error.message);
                  } else {
                    setExpDateError('');
                  }
                }}
              />
              {expDateError && (
                <span className={styles.errorTextForm}>
                  {' '}
                  {expDateError}
                </span>
              )}
            </div>
            <div className={styles.smallInputWrapper}>
              <label className={styles.label}>
                CVC *
              </label>
              <CardCvcElement
                className={`${styles.blockElement} ${cvvError && styles.errorInput}`}
                options={CARD_ELEMENT_OPTIONS}
                onChange={(e) => {
                  if (e.error) {
                    setCvvError(e.error.message);
                  } else {
                    setCvvError('');
                  }
                }}
              />
              {cvvError && (
                <span className={styles.errorTextForm}>
                  {cvvError}
                </span>
              )}
            </div>

          </div>

          <div>
            <label className={styles.label}>
              Card Holder’s Name
            </label>
            <Input
              value={customerName}
              setValue={setCustomerName}
              error={nameError}
              setError={setNameError}
              height={48}
              placeholder="Name"
            />
          </div>

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
