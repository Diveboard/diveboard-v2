import { FirstStepType } from '../types/stepTypes';
import { StepType } from '../types/commonTypes';

export const DiveDataActions = {
  setStep: (step: StepType) => ({
    type: 'set-step',
    payload: { step },
  } as const),

};

export const firstStepDiveDataActions = {
  setFirstStepData: (firstStepData: FirstStepType) => ({
    type: 'set-first-step-data',
    payload: { firstStepData },
  } as const),
};

export type ActionsType = typeof DiveDataActions & typeof firstStepDiveDataActions;
