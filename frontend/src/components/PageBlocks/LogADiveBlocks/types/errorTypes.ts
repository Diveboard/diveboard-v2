export type FirstStepErrors = {
  diveNumberError: string;
  tripNameError: string;
};

export type SecondStepErrors = {
  dateError: string,
  maxDepthError: string,
  durationError: string,
};

export type ThirdStepErrors = {
  spotError: string,
};

export type FifthStepErrors = string;

export type StepsErrorsType = FirstStepErrors
| SecondStepErrors | FifthStepErrors;
