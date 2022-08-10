import React from 'react';
import { FirstStepType, SecondStepType } from './stepTypes';
import { FifthStepErrors, FirstStepErrors, SecondStepErrors } from './errorTypes';

export type FirstStepErrorsActionType = {
  stepType: 1;
  data: FirstStepType['overview'];
  errors: FirstStepErrors;
  setErrors: React.Dispatch<React.SetStateAction<FirstStepErrors>>,
};

export type SecondStepErrorsActionType = {
  stepType: 2;
  data: SecondStepType['parameters'];
  errors: SecondStepErrors;
  setErrors: React.Dispatch<React.SetStateAction<SecondStepErrors>>,
};

export type FifthStepErrorsActionType = {
  stepType: 5;
  data: string;
  errors: FifthStepErrors;
  setErrors: React.Dispatch<React.SetStateAction<FifthStepErrors>>,
};

export type ErrorsActionType =
  FirstStepErrorsActionType
  | SecondStepErrorsActionType
  | FifthStepErrorsActionType;
