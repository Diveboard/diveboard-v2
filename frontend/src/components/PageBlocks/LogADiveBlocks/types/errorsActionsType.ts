import React from 'react';
import { FirstStepType, SecondStepType, ThirdStepType } from './stepTypes';
import {
  FifthStepErrors, FirstStepErrors, SecondStepErrors, ThirdStepErrors,
} from './errorTypes';

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

export type ThirdStepErrorsActionType = {
  stepType: 3;
  data: ThirdStepType['spotId'];
  errors: ThirdStepErrors;
  setErrors: React.Dispatch<React.SetStateAction<ThirdStepErrors>>,
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
  | ThirdStepErrorsActionType
  | FifthStepErrorsActionType;
