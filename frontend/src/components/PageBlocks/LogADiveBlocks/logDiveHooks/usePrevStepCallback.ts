import { useEffect } from 'react';
import { StepType } from '../types/commonTypes';

export const usePrevStepCallback = (
  currentStep:StepType,
  prevStep: StepType,
  isError: boolean,
  callback: ()=>void,
) => {
  useEffect(() => {
    if (currentStep === prevStep) {
      if (!isError) {
        callback();
      }
    }
  }, [prevStep]);
};
