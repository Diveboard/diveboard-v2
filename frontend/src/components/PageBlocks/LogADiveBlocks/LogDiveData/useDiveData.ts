import { useReducer } from 'react';
import { diveDataReducer } from './reducer/reducer';
import { initialDiveDataState } from './state';
import { DiveDataActions, diveDataActions } from './actions';
import { StepType } from '../types/commonTypes';
import { FirstStepType, SecondStepType, StepsDataType } from '../types/stepTypes';

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
        return dispatch(diveDataActions.setFirstStepData(StepData as FirstStepType));
      case 2:
        return dispatch(diveDataActions.setSecondStepData(StepData as SecondStepType));
      default:
        throw new Error('incorrect step');
    }
  };

  const getStepData = (step: StepType): StepsDataType => {
    switch (step) {
      case 1:
        return state.firstStep;
      case 2:
        return state.secondStep;
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
