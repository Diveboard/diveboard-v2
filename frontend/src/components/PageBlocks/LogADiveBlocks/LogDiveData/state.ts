import {
  SixthStepType,
  FifthStepType,
  FirstStepType,
  SecondStepType,
  ThirdStepType,
  SeventhStepType, EighthStepType, NinthStepType,
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

const fifthStep: FifthStepType = {
  diveCenter: undefined,
  guideName: undefined,
  buddy: undefined,
};

const sixthStep: SixthStepType = {
  files: undefined,
  mediaUrl: undefined,
};

const seventhStep: SeventhStepType = {
  typeOfGear: undefined,
  manufacturer: undefined,
  model: undefined,
  dateAcquired: undefined,
  lastMaintenance: undefined,
};

const eighthStep: EighthStepType = {};

const ninthStep: NinthStepType = {
  publishingMode: undefined,
};

export const initialDiveDataState = {
  step: 1 as StepType,
  firstStep,
  secondStep,
  thirdStep,
  fifthStep,
  sixthStep,
  seventhStep,
  eighthStep,
  ninthStep,
};
