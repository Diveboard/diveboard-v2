import React, { useContext, useEffect, useState } from 'react';

import { StepsIndicator } from './StepsIndicator';
import { StepType } from './types/commonTypes';
import { LogDiveDataContext } from './LogDiveData/logDiveContext';
import PreStep from './StepsComponents/PreStep';
import { FirstStep } from './StepsComponents/FirstStep';
import { SecondStep } from './StepsComponents/SecondStep';
import { FourthStep } from './StepsComponents/FourthStep';
import { ThirdStep } from './StepsComponents/ThirdStep';
import { FifthStep } from './StepsComponents/FifthStep';
import { SixthStep } from './StepsComponents/SixthStep';
import { EighthStep } from "./StepsComponents/EighthStep";
import { NinthStep } from './StepsComponents/NinthStep';
import styles from './styles.module.scss';

export const LogDiveBlock = () => {
  const [step, setStep] = useState<StepType>(9);
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
      {step === 0 && (
        <PreStep setStep={setStep} />
      )}
      {step !== 0 && <StepsIndicator step={step} setStep={setStep} />}
      <FirstStep step={step} setStep={setStep} />
      <SecondStep step={step} setStep={setStep} />
      <ThirdStep step={step} setStep={setStep} />
      <FourthStep step={step} setStep={setStep} />
      <FifthStep step={step} setStep={setStep} />
      <SixthStep step={step} setStep={setStep} />

      <EighthStep step={step} setStep={setStep} />
      <NinthStep step={step} setStep={setStep} />
    </div>
  );
};
