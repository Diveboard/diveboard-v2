import React, { FC } from 'react';
import { StepType } from '../types/commonTypes';
import styles from './styles.module.scss';

type Props = {
  step: StepType
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
};
type StepItemProps = Props & {
  currentStep: StepType
};

const StepItem: FC<StepItemProps> = ({ currentStep, step, setStep }) => (
  <span
    onClick={() => {
      setStep(currentStep);
    }}
    className={`${styles.indicatorItem} 
        ${step >= currentStep ? styles.active : styles.notActive}`}
  />
);

export const StepsIndicator: FC<Props> = ({
  step,
  setStep,
}) => (
  <div className={styles.indicatorWrapper}>
    <StepItem currentStep={1} step={step} setStep={setStep} />
    <StepItem currentStep={2} step={step} setStep={setStep} />
    <StepItem currentStep={3} step={step} setStep={setStep} />
    <StepItem currentStep={4} step={step} setStep={setStep} />
    <StepItem currentStep={5} step={step} setStep={setStep} />
    <StepItem currentStep={6} step={step} setStep={setStep} />
    <StepItem currentStep={7} step={step} setStep={setStep} />
    <StepItem currentStep={8} step={step} setStep={setStep} />
    <StepItem currentStep={9} step={step} setStep={setStep} />
  </div>
);
