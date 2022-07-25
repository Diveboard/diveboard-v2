import React, { useContext, useEffect, useState } from 'react';
import { StepsIndicator } from './StepsIndicator';
import { FirstStep } from './StepsComponents/FirstStep';
import { StepType } from './types/commonTypes';
import { LogDiveDataContext } from './LogDiveData/logDiveContext';
import { SecondStep } from './StepsComponents/SecondStep';
import styles from './styles.module.scss';
import { FourthStep } from './StepsComponents/FourthStep/fourthStep';

export const LogDiveBlock = () => {
  const [step, setStep] = useState<StepType>(2);
  const { setCurrentStep } = useContext(LogDiveDataContext);

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  return (
    <div className={styles.diveWrapper}>
      <div className={styles.header}>
        <h1>New Dive</h1>
        <span>
          SAVE DRAFT
        </span>
      </div>
      {step !== 0 && <StepsIndicator step={step} setStep={setStep} />}
      <FirstStep step={step} setStep={setStep} />
      <SecondStep step={step} setStep={setStep} />
      <FourthStep step={step} setStep={setStep} />
    </div>
  );
};
