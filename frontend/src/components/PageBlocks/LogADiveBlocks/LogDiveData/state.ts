import {
  SixthStepType,
  FifthStepType,
  FirstStepType,
  SecondStepType,
  ThirdStepType,
  SeventhStepType,
  EighthStepType,
  NinthStepType,
  FourthStepType,
} from '../types/stepTypes';

import { StepType } from '../types/commonTypes';

const firstStep: FirstStepType = {
  overview: {
    diveNumber: undefined,
    notes: undefined,
    tripName: undefined,
  },
  diveReviews: {
    overReview: 5,
    diveDifficulty: 5,
    marineLifeQuality: 5,
    wreck: undefined,
    bigFish: undefined,
  },
  diveActivities: {
    recreational: false,
    training: false,
    nightDive: false,
    drift: false,
    deepDive: false,
    wreck: false,
    cave: false,
    reef: false,
    photo: false,
    research: false,
    other: undefined,
  },
};

const secondStep: SecondStepType = {
  parameters: {
    time: '',
    date: null,
    maxDepth: undefined,
    duration: undefined,
    surfaceInterval: undefined,
    safetySpots: [
      {
        id: 1,
        period: undefined,
        depth: undefined,
      },
    ],
  },
  advancedParameters: {
    surfaceTemp: undefined,
    bottomTemp: undefined,
    weights: undefined,
    waterType: undefined,
    current: undefined,
    altitude: undefined,
    waterVisibility: undefined,
  },
  tanks: [],
};

const thirdStep: ThirdStepType = {
  spotId: null,
};

const fourthStep: FourthStepType = {
  species: [],
};

const fifthStep: FifthStepType = {
  diveCenter: undefined,
  guideName: undefined,
  buddies: undefined,
};

const sixthStep: SixthStepType = {
  files: undefined,
  mediaUrl: undefined,
};

const seventhStep: SeventhStepType = {
  gears: [],
  save: false,
};

// @ts-ignore
const eighthStep: EighthStepType = {};

const ninthStep: NinthStepType = {
  publishingMode: undefined,
};

export const initialDiveDataState = {
  step: 1 as StepType,
  firstStep,
  secondStep,
  thirdStep,
  fourthStep,
  fifthStep,
  sixthStep,
  seventhStep,
  eighthStep,
  ninthStep,
};
