import React, { FC, useState } from 'react';
import { StepProps } from '../../types/commonTypes';
import styles from './styles.module.scss';
import { ContentModeType, PlanType } from '../../../DonateBlocks/donateTypes';
import { Icon } from '../../../../Icons/Icon';
import { Button } from '../../../../Buttons/Button';

const CongratsStep: FC<Pick<StepProps, 'setStep'>> = ({ setStep }) => {
  const [planMode, setPlanMode] = useState<PlanType>();
  const [contentMode, setContentMode] = useState<ContentModeType>('main');
  console.log(planMode, contentMode);
  return (
    <>
      <div className={styles.container}>
        <h1>Congratulations!</h1>
        <p>
          Your dive has been successfully published. You can view it here.
          <br />
          <br />
          Help keep Diveboard kickin’ !
          Diveboard is a non-profit and relies on your
          generous support to keep the platform running.
          <br />
          <br />
          Donate today, and wear the “patron” badge on your profile!
        </p>
        <div className={styles.btnWrapper}>
          <Button
            width={340}
            height={48}
            borderRadius={30}
            border="none"
            backgroundColor="#FDC90D"
            onClick={() => {
              setPlanMode('3/month');
              setContentMode('plan');
            }}
          >
            <span className={styles.btnText}> $3 per month for 12 months </span>
          </Button>

          <Button
            width={340}
            height={48}
            borderRadius={30}
            border="none"
            marginTop={12}
            backgroundColor="#FDC90D"
            onClick={() => {
              setPlanMode('5/month');
              setContentMode('plan');
            }}
          >
            <span className={styles.btnText}> $5 per month for 12 months </span>
          </Button>

          <Button
            width={340}
            height={48}
            borderRadius={30}
            border="none"
            marginTop={12}
            backgroundColor="#FDC90D"
            onClick={() => {
              setPlanMode('custom');
              setContentMode('plan');
            }}
          >
            <span className={styles.btnText}> Custom Donation</span>
          </Button>

        </div>
      </div>
      <div className={styles.stepsNavWrapper}>
        <div className={styles.stepsNav}>
          <Button
            onClick={() => setStep(9)}
            height={32}
            width={104}
            borderRadius={30}
            border="none"
            backgroundColor="#F0F6FF"
            disable={false}
          >
            <Icon iconName="left-arrow" />
            <span className={styles.leftBtn}>
              Previous
            </span>
          </Button>
          <span>No, thanks</span>
        </div>
      </div>
    </>
  );
};

export default CongratsStep;
