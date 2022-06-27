import { FirstStepType, SecondStepType } from '../types/stepTypes';
import { StepType } from '../types/commonTypes';

const firstStep: FirstStepType = {
  overview: {
    diveNumber: '',
    notes: '',
    tripName: '',
  },
  diveReviews: {
    overReview: 0,
    diveDifficulty: 0,
    marineLifeQuality: 0,
  },
  diveActivities: {
    recreational: false,
    training: false,
    nightDive: false,
    deepDive: false,
    drift: false,
    wrech: false,
    cave: false,
    reef: false,
    photo: false,
    research: false,
    other: [],
  },
};

const secondStep: SecondStepType = {
  parameters: undefined,
  advancedParameters: undefined,
  tanks: undefined,
};

export const initialDiveDataState = {
  step: 1 as StepType,
  firstStep,
  secondStep,
};
