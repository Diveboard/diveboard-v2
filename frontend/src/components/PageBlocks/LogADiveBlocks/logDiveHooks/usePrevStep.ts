import { useEffect, useRef, useState } from 'react';
import { StepType } from '../index';

export const usePrevStep = (step: StepType) => {
  const tempStep = useRef<StepType>(step);
  const [prevStep, setPrevStep] = useState<StepType>();

  useEffect(() => {
    if (tempStep.current !== step) {
      setPrevStep(tempStep.current);
      tempStep.current = step;
    }
  }, [step]);

  return prevStep;
};
