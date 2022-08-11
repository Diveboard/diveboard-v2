import { ScoreType } from './commonTypes';

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
      wreck: boolean,
      bigFish: boolean,
    },
    diveActivities: {
      recreational: boolean,
      training: boolean,
      nightDive: boolean,
      deepDive: boolean,
      drift: boolean,
      wrech: boolean,
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
    safetySpots: {
      id: number;
      depth: number;
      period: number;
    }[]
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
  spot: {
    name: string;
    lat: number;
    lng: number;
  }
};
export type FourthStepType = {};

export type SixthStepType = {
  files: { tags: string, file: File }[];
  mediaUrl: string[];
};

export type FifthStepType = {
  diveCenter: string;
  guideName: string;
  buddy: string;
};

export type NinthStepType = {
  publishingMode: 'public' | 'private' | 'friends only'
};

export type SeventhStepType = {
  typeOfGear: string;
  manufacturer: string,
  model: string;
  dateAcquired: Date;
  lastMaintenance: Date;
};

export type EighthStepType = {};

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
