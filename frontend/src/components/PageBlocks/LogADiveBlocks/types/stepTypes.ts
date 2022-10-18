import { GearsVariantsType, SafetySpot, ScoreType } from './commonTypes';
import { initialDiveDataState } from '../LogDiveData/state';

export type FirstStepType =
  {
    overview:
    {
      diveNumber: number,
      notes: string,
      tripName: string,
    },
    diveReviews:
    {
      overReview: ScoreType,
      diveDifficulty: ScoreType,
      marineLifeQuality: ScoreType,
      wreck?: ScoreType,
      bigFish?: ScoreType,
    },

    diveActivities: {
      recreational: boolean,
      training: boolean,
      nightDive: boolean,
      deepDive: boolean,
      drift: boolean,
      wreck: boolean,
      cave: boolean,
      reef: boolean,
      photo: boolean,
      research: boolean,
      other: string[],
    }
  };

export type SecondStepType = {
  parameters: {
    time: string;
    date: Date;
    maxDepth: number;
    duration: number;
    surfaceInterval: number;
    safetySpots: SafetySpot[]
  }

  advancedParameters: {
    surfaceTemp: number;
    bottomTemp: number;
    weights: number;
    waterVisibility: 'bad' | 'average' | 'good' | 'excellent';
    current: 'none' | 'light' | 'medium' | ' strong' | 'extreme';
    altitude: number;
    waterType: 'salt' | 'fresh';
  }
  tanks: {
    id: number;
    cylinder: '1x' | '2x';
    volume: number;
    size: 'L' | 'cuft';
    material: 'steel' | 'aluminum' | 'carbon';
    mixture: 'air' | 'nitrox' | 'trimix';
    pressureStart: number;
    pressureEnd: number;
    pressureMeasures: 'bar' | 'psi';
  }[]
};

export type ThirdStepType = {
  spotId: string | null
};
export type FourthStepType = {
  species: string[]
};

export type FifthStepType = {
  diveCenter: string;
  guideName: string;
  buddies: { id?: string, name: string, email?:string }[];
};

export type SixthStepType = {
  files: { tags: string, file: File }[];
  mediaUrl: string[];
};

export type SeventhStepType = {
  gears: {
    id: number
    typeOfGear: GearsVariantsType;
    manufacturer: string,
    model: string;
    dateAcquired: Date;
    lastMaintenance: Date; }[]
};

export type EighthStepType = {};

export type NinthStepType = {
  publishingMode: 'public' | 'private' | 'friends only'
};

export type StepsDataType =
  FirstStepType
  | SecondStepType
  | ThirdStepType
  | FourthStepType
  | FifthStepType
  | SixthStepType
  | SeventhStepType
  | EighthStepType
  | NinthStepType;

export type AllStepsDataType = typeof initialDiveDataState;
