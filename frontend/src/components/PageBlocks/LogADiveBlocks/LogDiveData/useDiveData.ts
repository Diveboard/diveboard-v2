import { useReducer } from 'react';
import { diveDataReducer } from './reducer/reducer';
import { initialDiveDataState } from './state';
import { DiveDataActions, firstStepDiveDataActions } from './actions';
import { StepType } from '../types/commonTypes';
import { StepsDataType } from '../types/stepTypes';

export const UseDiveData = () => {
  const [state, dispatch] = useReducer(diveDataReducer, initialDiveDataState);

  console.log('state', { state });

  const setCurrentStep = (step: StepType) => {
    dispatch(DiveDataActions.setStep(step));
  };

  const getCurrentStep = (): StepType => state.step;

  const setStepData = (step: StepType, StepData: StepsDataType) => {
    switch (step) {
      case 1:
        return dispatch(firstStepDiveDataActions.setFirstStepData(StepData));
      default:
        throw new Error('incorrect step');
    }
  };

  const getStepData = (step: StepType): StepsDataType => {
    switch (step) {
      case 1:
        return state.firstStep;
      default:
        throw new Error('incorrect step');
    }
  };

  return {
    setCurrentStep,
    getCurrentStep,
    setStepData,
    getStepData,
  };
};
