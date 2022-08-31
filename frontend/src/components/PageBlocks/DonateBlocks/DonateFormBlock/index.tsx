import React, { FC } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';
import { PlanButtons } from './PlanButtons';
import { DonateFormProps } from '../donateTypes';
import styles from './styles.module.scss';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY}`);

export const DonateFormBlock: FC<DonateFormProps> = ({
  planMode,
  setPlanMode,
  setContentMode,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.title}>
      <h2> Donate Now </h2>
      <p> You help the biggest divers community growth! </p>
    </div>

    <PlanButtons
      planMode={planMode}
      setPlanMode={setPlanMode}
    />
    <Elements stripe={stripePromise}>
      <CheckoutForm
        planMode={planMode}
        setContentMode={setContentMode}
      />
    </Elements>
  </div>
);
