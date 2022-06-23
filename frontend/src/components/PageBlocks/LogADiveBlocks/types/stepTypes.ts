import { ScoreType } from './commonTypes';

export type FirstStepType =
  {
    overview:
    {
      diveNumber: string,
      notes: string,
      tripName: string,
    },
    diveReviews:
    {
      overReview: ScoreType,
      diveDifficulty: ScoreType,
      marineLifeQuality: ScoreType
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

export type StepsDataType = FirstStepType;
