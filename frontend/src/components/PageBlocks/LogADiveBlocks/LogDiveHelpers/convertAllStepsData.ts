import { AllStepsDataType } from '../types/stepTypes';
import { DiveType } from '../../../../firebase/firestore/models';
import {
  convertDiveActivities,
  convertToDiveActivities,
} from './convertDiveActivities';
import { convertTimestampDate } from '../../../../utils/convertTimestampDate';

export const convertAllStepsData = (
  stepsData: AllStepsDataType,
  draft: boolean = false,
) => ({
  buddies: stepsData.fifthStep.buddies,
  danSend: false,
  diveActivities: convertDiveActivities(stepsData.firstStep.diveActivities),
  // TODO: Implement dive center logic
  diveCenter: {
    id: '0',
    guide: '0',
  },
  diveData: {
    ...stepsData.secondStep.parameters,
    ...stepsData.secondStep.advancedParameters,
  },
  aboutDive: {
    ...stepsData.firstStep.overview,
    ...stepsData.firstStep.diveReviews,
  },
  draft,
  externalImgsUrls: stepsData.sixthStep.mediaUrl,
  gears: stepsData.seventhStep.gears,
  publishingMode: stepsData.ninthStep.publishingMode,
  species: stepsData.fourthStep.species,
  spotId: stepsData.thirdStep.spotId,
  tanks: stepsData.secondStep.tanks,
  oldId: null,
  unitSystem: 'metric',
  saves: 0,
});

export const convertToStepsData = (data: DiveType) => ({
  firstStep: {
    overview: {
      diveNumber: data.aboutDive?.diveNumber,
      notes: data.aboutDive?.notes,
      tripName: data.aboutDive?.tripName,
    },
    diveReviews: {
      overReview: data.aboutDive?.overReview,
      diveDifficulty: data.aboutDive?.diveDifficulty,
      marineLifeQuality: data.aboutDive?.marineLifeQuality,
      wreck: data.aboutDive?.wreck,
      bigFish: data.aboutDive?.bigFish,
    },
    diveActivities: {
      ...convertToDiveActivities(data.diveActivities),
    },
  },
  secondStep: {
    parameters: {
      time: data.diveData?.time,
      date: data.diveData.date
        ? convertTimestampDate(data.diveData.date)
        : null,
      maxDepth: data.diveData?.maxDepth,
      duration: data.diveData?.duration,
      surfaceInterval: data.diveData?.surfaceInterval,
      safetySpots: data.diveData?.safetySpots,
    },
    advancedParameters: {
      surfaceTemp: data.diveData?.surfaceTemp,
      bottomTemp: data.diveData?.bottomTemp,
      weights: data.diveData?.weights,
      waterVisibility: data.diveData?.waterVisibility,
      current: data.diveData?.current,
      altitude: data.diveData?.altitude,
      waterType: data.diveData?.waterType,
    },
    tanks: data.tanks,
  },
  thirdStep: {
    spotId: data.spotId,
  },
  fourthStep: {
    species: data.species,
  },
  fifthStep: {
    buddies: data.buddies as { id : string }[],
    diveCenter: data.diveCenter.id,
    guideName: data.diveCenter.guide,
  },
  sixthStep: {
    mediaUrl: data.externalImgsUrls,
    files: null,
  },
  seventhStep: {
    gears: data.gears.map((gear) => ({
      ...gear,
      dateAcquired: convertTimestampDate(gear.dateAcquired),
      lastMaintenance: convertTimestampDate(gear.lastMaintenance),
    })),
    save: true,
  },
  eighthStep: {},
  ninthStep: {
    publishingMode: data.publishingMode,
  },
});
