import { ErrorsActionType } from '../../types/errorsActionsType';
import {
  fifthStepErrorsActions,
  firstStepErrorsActions,
  secondStepErrorsActions,
  thirdStepErrorsActions,
} from './stepErrorsActions';

export const setStepErrors = (
  errorsAction: ErrorsActionType,
) => {
  switch (errorsAction.stepType) {
    case 1:
      return firstStepErrorsActions(errorsAction);
    case 2:
      return secondStepErrorsActions(errorsAction);
    case 3:
      return thirdStepErrorsActions(errorsAction);
    case 5:
      return fifthStepErrorsActions(errorsAction);

    default:
      throw new Error('incorrect step error');
  }
};
