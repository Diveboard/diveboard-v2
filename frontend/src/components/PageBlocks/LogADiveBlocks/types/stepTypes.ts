import {
  Buddy, GearsVariantsType, SafetySpot, ScoreType,
} from './commonTypes';
import { initialDiveDataState } from '../LogDiveData/state';
import { SurveyDanType } from '../../../../types';

export type FirstStepType = {
  overview: {
    diveNumber: number;
    notes: string;
    tripName: string;
  };
  diveReviews: {
    overReview: ScoreType;
    diveDifficulty: ScoreType;
    marineLifeQuality: ScoreType;
    wreck?: ScoreType;
    bigFish?: ScoreType;
  };
  diveActivities: {
    recreational: boolean;
    training: boolean;
    nightDive: boolean;
    deepDive: boolean;
    drift: boolean;
    wreck: boolean;
    cave: boolean;
    reef: boolean;
    photo: boolean;
    research: boolean;
    other: string[];
  };
};

export type Tank = {
  id: number;
  cylinder: '1x' | '2x';
  volume: number;
  size: 'L' | 'cuft';
  material: 'steel' | 'aluminum' | 'carbon';
  mixture: 'air' | 'nitrox' | 'trimix';
  o2?:number;
  he?:number;
  pressureStart: number;
  pressureEnd: number;
  pressureMeasures: 'bar' | 'psi';
};

export type SecondStepType = {
  parameters: {
    time: string;
    date: Date;
    maxDepth: number;
    duration: number;
    surfaceInterval: number;
    safetySpots: SafetySpot[];
  };

  advancedParameters: {
    surfaceTemp: number;
    bottomTemp: number;
    weights: number;
    waterVisibility: 'bad' | 'average' | 'good' | 'excellent';
    current: 'none' | 'light' | 'medium' | 'strong' | 'extreme';
    altitude: number;
    waterType: 'salt' | 'fresh';
  };
  tanks: Tank[];
};

export type ThirdStepType = {
  spotId: string | null;
};
export type FourthStepType = {
  species: string[];
};

export type FifthStepType = {
  diveCenter: string;
  guideName: string;
  buddies: Buddy[];
};

export type SixthStepType = {
  files: { tags: string; file: File }[];
  mediaUrl: string[];
};

export type SeventhStepType = {
  gears: {
    id: number;
    typeOfGear: GearsVariantsType;
    manufacturer: string;
    model: string;
    dateAcquired: Date;
    lastMaintenance: Date;
  }[];
  save: boolean;
};

export type EighthStepType = {
  surveyId?: string;
  danSurvey?: SurveyDanType;
  sendToDAN?: boolean;
  saveDAN?: boolean;
};

export type PublishingMode = 'public' | 'private' | 'friends only';

export type NinthStepType = {
  publishingMode: PublishingMode;
};

export type StepsDataType =
  | FirstStepType
  | SecondStepType
  | ThirdStepType
  | FourthStepType
  | FifthStepType
  | SixthStepType
  | SeventhStepType
  | EighthStepType
  | NinthStepType;

export type AllStepsDataType = typeof initialDiveDataState;
