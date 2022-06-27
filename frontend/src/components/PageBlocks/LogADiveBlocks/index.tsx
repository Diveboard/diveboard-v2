import React, { useContext, useEffect, useState } from 'react';
import { StepsNavigation } from './StepsNavigation';
import { StepsIndicator } from './StepsIndicator';
import { FirstStep } from './stepsComponents/FirstStep';
import { usePrevStep } from './logDiveHooks/usePrevStep';
import { StepType } from './types/commonTypes';
import styles from './styles.module.scss';
import { LogDiveDataContext } from './LogDiveData/logDiveContext';
import { SecondStep } from './stepsComponents/SecondStep';

export const LogDiveBlock = () => {
  const [step, setStep] = useState<StepType>(2);
  const prev = usePrevStep(step);
  const { setCurrentStep } = useContext(LogDiveDataContext);

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  return (
    <>
      <div className={styles.diveWrapper}>
        <div className={styles.header}>
          <h1>New Dive</h1>
          <span>
            SAVE DRAFT
          </span>
        </div>
        {step !== 0 && <StepsIndicator step={step} setStep={setStep} />}
        <FirstStep step={step} prevStep={prev} setStep={setStep} />
        <SecondStep step={step} prevStep={prev} setStep={setStep} />
      </div>
      {step !== 0 && <StepsNavigation setStep={setStep} />}
    </>
  );
};
