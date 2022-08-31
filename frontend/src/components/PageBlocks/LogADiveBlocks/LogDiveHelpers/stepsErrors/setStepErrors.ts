import { ErrorsActionType } from '../../types/errorsActionsType';
import {
  fifthStepErrorsActions,
  firstStepErrorsActions,
  secondStepErrorsActions,
} from './stepErrorsActions';

export const setStepErrors = (
  errorsAction: ErrorsActionType,
) => {
  switch (errorsAction.stepType) {
    case 1:
      return firstStepErrorsActions(errorsAction);
    case 2:
      return secondStepErrorsActions(errorsAction);
    case 5:
      return fifthStepErrorsActions(errorsAction);

    default:
      throw new Error('incorrect step error');
  }
};
