import React, {
  FC, useContext, useEffect, useReducer, useState,
} from 'react';
import { StepType } from '../types/commonTypes';
import styles from './styles.module.scss';
import { LogDiveDataContext } from '../LogDiveData/logDiveContext';
import { FirstStepType, SecondStepType, ThirdStepType } from '../types/stepTypes';

type Props = {
  step: StepType
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
};
type StepItemProps = Props & {
  currentStep: StepType
  stepAvailable: number;
};

const StepItem: FC<StepItemProps> = ({
  currentStep, step, setStep, stepAvailable,
}) => (
  <span
    onClick={() => {
      if (currentStep <= stepAvailable) {
        setStep(currentStep);
      }
    }}
    className={`${styles.indicatorItem} 
        ${step >= currentStep ? styles.active : styles.notActive}`}
  />
);

export const StepsIndicator: FC<Props> = ({
  step,
  setStep,
}) => {
  const steps = Array.from({ length: 9 }, (_, i) => i + 1);
  const {
    getStepData,
  } = useContext(LogDiveDataContext);

  const [stepAvailable, setStepAvailable] = useState(0);
  const { overview } = getStepData(1) as FirstStepType;
  const { parameters } = getStepData(2) as SecondStepType;
  const { spotId } = getStepData(3) as ThirdStepType;

  useEffect(() => {
    if (overview?.diveNumber && overview?.tripName) {
      setStepAvailable(2);
      if (parameters?.date && parameters?.maxDepth && parameters?.time && parameters?.duration) {
        setStepAvailable(3);
        if (spotId) {
          setStepAvailable(9);
        }
      }
    }
  }, [overview, parameters, spotId]);

  return (
    <div className={styles.indicatorWrapper}>
      {steps.map((item) => (
        <StepItem
          key={item}
          currentStep={item as StepType}
          step={step}
          setStep={setStep}
          stepAvailable={stepAvailable}
        />
      ))}
    </div>
  );
};
