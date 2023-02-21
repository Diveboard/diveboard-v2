import { DocumentReference } from '@firebase/firestore';
import {
  GearsVariantsType, SafetySpot, ScoreType,
} from './commonTypes';
import { initialDiveDataState } from '../LogDiveData/state';
import { SurveyDanType } from '../../../../types';
import { BuddiesType, MediaUrls, SpeciesType } from '../../../../firebase/firestore/models';

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
  cylinder: 1 | 2;
  volume: number;
  volumeUnit: 'L' | 'cuft';
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
    date: Date;
    maxDepth: number;
    duration: number;
    surfaceInterval: number;
    safetyStops: SafetySpot[];
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
  species: SpeciesType[]
};

export type FifthStepType = {
  diveCenter: string;
  guideName: string;
  buddies: BuddiesType[];
};

export type SixthStepType = {
  files: { tags: string; file: File }[];
  mediaUrl: MediaUrls[];
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
  surveyRef?: DocumentReference;
  danSurvey?: SurveyDanType;
  sendToDAN?: boolean;
  saveDAN?: boolean;
};

export type PublishingMode = 'PUBLIC' | 'PRIVATE';

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
