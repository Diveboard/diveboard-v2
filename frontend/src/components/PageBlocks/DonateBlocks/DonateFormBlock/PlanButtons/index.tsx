import React, { FC } from 'react';
import { Button } from '../../../../Buttons/Button';
import { PlanButtonsProps, PlanType } from '../../donateTypes';
import styles from './styles.module.scss';

export const PlanButtons: FC<PlanButtonsProps> = ({
  planMode,
  setPlanMode,
}) => {
  const handlePlanChange = (plan: PlanType) => {
    setPlanMode(plan);
  };
  return (
    <div className={styles.btn_wrapper}>
      <Button
        width={130}
        height={52}
        borderRadius={30}
        border="1px solid rgba(0, 3, 69, 0.2)"
        backgroundColor={planMode === '3/month' ? 'rgba(63, 255, 255, 0.6)' : '#ffffff'}
        onClick={() => {
          handlePlanChange('3/month');
        }}
      >
        <span className={styles.btnText}> $3/month  for 12 months </span>
      </Button>

      <Button
        width={130}
        height={52}
        borderRadius={30}
        border="1px solid rgba(0, 3, 69, 0.2)"
        backgroundColor={planMode === '5/month' ? 'rgba(63, 255, 255, 0.6)' : '#ffffff'}
        onClick={() => {
          handlePlanChange('5/month');
        }}
      >
        <span className={styles.btnText}> $5/month  for 12 months </span>
      </Button>

      <Button
        width={130}
        height={52}
        borderRadius={30}
        border="1px solid rgba(0, 3, 69, 0.2)"
        backgroundColor={planMode === 'custom' ? 'rgba(63, 255, 255, 0.6)' : '#ffffff'}
        onClick={() => {
          handlePlanChange('custom');
        }}
      >
        <span className={styles.btnText}> Custom Donation</span>
      </Button>
    </div>
  );
};
