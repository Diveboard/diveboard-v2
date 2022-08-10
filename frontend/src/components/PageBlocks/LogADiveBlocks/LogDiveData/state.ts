import {
  FirstStepType, SecondStepType, SeventhStepType, ThirdStepType,
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

const seventhStep: SeventhStepType = {
  typeOfGear: undefined,
  manufacturer: undefined,
  model: undefined,
  dateAcquired: undefined,
  lastMaintenance: undefined,
};

export const initialDiveDataState = {
  step: 1 as StepType,
  firstStep,
  secondStep,
  thirdStep,
  seventhStep,
};
