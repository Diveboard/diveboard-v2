import { InferredActionsType } from '../../types/inferActionsType';
import { InitialDiveDataStateType } from '../../types/diveDataStatetype';

export const diveDataReducer = (
  state: InitialDiveDataStateType,
  action: InferredActionsType,
): InitialDiveDataStateType => {
  switch (action.type) {
    case 'set-step':
      return { ...state, step: action.payload.step };
    case 'set-first-step-data':
      return {
        ...state,
        firstStep: action.payload.firstStepData,
      };

    default:
      throw new Error('invalid action');
  }
};
