import {
  FifthStepErrorsActionType,
  FirstStepErrorsActionType,
  SecondStepErrorsActionType,
} from '../../types/errorsActionsType';

export const firstStepErrorsActions = ({
  data,
  errors,
  setErrors,
}: FirstStepErrorsActionType) => {
  let error = false;
  const newErrors = { ...errors };
  if (!data.diveNumber) {
    newErrors.diveNumberError = 'fill dive number';
    error = true;
  }

  const notNaN = Number.isNaN(data.diveNumber);
  const notInteger = !Number.isInteger(data.diveNumber);

  if (notNaN || notInteger) {
    newErrors.diveNumberError = 'fill correct number of a dive';
    error = true;
  }

  setErrors(newErrors);
  return error;
};

export const secondStepErrorsActions = (
  {
    data,
    errors,
    setErrors,
  }: SecondStepErrorsActionType,
) => {
  let error = false;
  const newErrors = { ...errors };

  if (!data.time.length) {
    newErrors.timeError = 'fill time of dive';
    error = true;
  }

  if (!data.date) {
    newErrors.dateError = 'fill date of a dive';
    error = true;
  }

  if (!data.maxDepth) {
    newErrors.maxDepthError = 'fill max depth of a dive';
    error = true;
  }

  if (Number.isNaN(+data.maxDepth)) {
    newErrors.maxDepthError = 'fill max depth of a dive';
    error = true;
  }

  if (!data.duration) {
    newErrors.durationError = 'fill duration of a dive';
    error = true;
  }

  if (Number.isNaN(+data.duration)) {
    newErrors.durationError = 'incorrect duration';
    error = true;
  }

  setErrors(newErrors);
  return error;
};

export const fifthStepErrorsActions = (
  {
    data,
    setErrors,
  }: FifthStepErrorsActionType,
) => {
  const mailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!data.match(mailRegexp) && data.length) {
    setErrors('incorrect email, write correct email or clear this input');
    return true;
  }
};
