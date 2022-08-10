import {
  FirstStepType, SecondStepType, SixthStepType, ThirdStepType,
} from '../types/stepTypes';
import { StepType } from '../types/commonTypes';

const firstStep: FirstStepType = {
  overview: undefined,
  diveReviews: undefined,
  diveActivities: undefined,
};

const secondStep: SecondStepType = {
  parameters: undefined,
  advancedParameters: undefined,
  tanks: undefined,
};

const thirdStep: ThirdStepType = {
  spot: {
    name: undefined,
    lat: undefined,
    lng: undefined,
  },
};

const sixthStep: SixthStepType = {
  files: undefined,
  mediaUrl: undefined,
};

export const initialDiveDataState = {
  step: 1 as StepType,
  firstStep,
  secondStep,
  thirdStep,
  sixthStep,
};
