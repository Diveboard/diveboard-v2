import React, { FC } from 'react';
import styles from './styles.module.scss';
import { CheckoutForm } from './CheckoutForm';
import { PlanButtons } from './PlanButtons';
import { DonateFormProps } from '../donateTypes';

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

    <CheckoutForm
      planMode={planMode}
      setContentMode={setContentMode}
    />
  </div>
);
