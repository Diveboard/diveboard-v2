import React, { FC, useContext } from 'react';
import { StepType } from '../types/commonTypes';
import styles from './styles.module.scss';
import { LogDiveDataContext } from '../LogDiveData/logDiveContext';

type Props = {
  currentDataKey?: 'diveNumber' | 'date';
  objectKey?: 'parameters' | 'overview';
  step: StepType;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  setStepData: () => void;
  setErrors?: () => boolean
};
type StepItemProps = Props & {
  currentStep: StepType
};

const StepItem: FC<StepItemProps> = ({
  currentStep, step, setStep, setStepData, setErrors, objectKey, currentDataKey,
}) => {
  const { getStepData } = useContext(LogDiveDataContext);
  const data = getStepData(step);

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
        if (step === 1 && !data[objectKey][currentDataKey]) {
          setStep(2);
        }
        if (step === 2 && !data[objectKey][currentDataKey]) {
          setStep(3);
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
  objectKey,
  currentDataKey,
  setStep,
  setStepData,
  setErrors,
}) => {
  const steps = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <div className={styles.indicatorWrapper}>
      {steps.map((item) => (
        <StepItem
          currentDataKey={currentDataKey}
          objectKey={objectKey}
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
