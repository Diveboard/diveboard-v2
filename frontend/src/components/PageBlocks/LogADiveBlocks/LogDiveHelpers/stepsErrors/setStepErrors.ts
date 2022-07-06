import { ErrorsActionType } from '../../types/errorsActionsType';
import { firstStepErrorsActions, secondStepErrorsActions } from './stepErrorsActions';

export const setStepErrors = (
  errorsAction: ErrorsActionType,
) => {
  switch (errorsAction.stepType) {
    case 1:
      return firstStepErrorsActions(errorsAction);

    case 2:
      return secondStepErrorsActions(errorsAction);

    default:
      throw new Error('incorrect step error');
  }
};
