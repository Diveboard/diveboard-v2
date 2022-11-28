import React, { FC } from 'react';
import { StepType } from '../types/commonTypes';
import styles from './styles.module.scss';

type Props = {
  step: StepType;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  setStepData: () => void;
  setErrors?: () => boolean
};
type StepItemProps = Props & {
  currentStep: StepType
};

const StepItem: FC<StepItemProps> = ({
  currentStep, step, setStep, setStepData, setErrors,
}) => {
  const clickHandler = () => {
    if (currentStep === step) {
      return;
    }
    if (currentStep > step) {
      if (!setErrors || !setErrors()) {
        setStepData();
        if (step !== 9) {
          setStep(currentStep);
        }
      }
    } else {
      setStepData();
      setStep(currentStep);
    }
  };
  return (
    <span
      onClick={clickHandler}
      className={`${styles.indicatorItem} 
        ${step >= currentStep ? styles.active : styles.notActive}`}
    />
  );
};

export const StepsIndicator: FC<Props> = ({
  step,
  setStep,
  setStepData,
  setErrors,
}) => {
  const steps = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <div className={styles.indicatorWrapper}>
      {steps.map((item) => (
        <StepItem
          key={item}
          currentStep={item as StepType}
          step={step}
          setStep={setStep}
          setErrors={setErrors}
          setStepData={setStepData}
        />
      ))}
    </div>
  );
};
