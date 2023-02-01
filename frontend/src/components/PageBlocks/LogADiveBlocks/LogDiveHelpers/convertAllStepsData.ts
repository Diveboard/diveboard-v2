import { AllStepsDataType } from '../types/stepTypes';
import { DiveType, UnitSystem } from '../../../../firebase/firestore/models';
import {
  convertDiveActivities,
  convertToDiveActivities,
} from './convertDiveActivities';
import { convertTimestampDate } from '../../../../utils/convertTimestampDate';
import { SafetySpot } from '../types/commonTypes';
import { firestoreGalleryService } from '../../../../firebase/firestore/firestoreServices/firestoreGalleryService';
import {
  convertCalToFar,
  convertFarToCal,
  convertFeetToMeters, convertKgToLbs, convertLbsToKg,
  convertMetersToFeet,
} from '../../../../utils/unitSystemConverter';

export const convertAllStepsData = async (
  stepsData: AllStepsDataType,
  userId: string,
  unitSystem: UnitSystem,
  draft: boolean = false,
) => {
  const replaceUndefinedToNull = (obj) => {
    const newObj = { ...obj };
    Object.entries(newObj).forEach(([key, val]) => {
      if (val === undefined) {
        newObj[key] = null;
      }
    });
    return newObj;
  };

  // eslint-disable-next-line array-callback-return
  const checkSafetySpots = (safetySpots: Array<SafetySpot>) => safetySpots.filter((spot) => {
    if (spot.depth && spot.period) {
      return spot;
    }
  });

  const uploadFiles = async () => {
    const filesUrls = stepsData.sixthStep.mediaUrl;
    const { files } = stepsData.sixthStep;
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const res = await firestoreGalleryService.uploadGalleryFile(userId, files[i].file);
        // eslint-disable-next-line no-await-in-loop
        const imageRef = await firestoreGalleryService.getGalleryFile(res.ref);
        if (imageRef) {
          filesUrls.push(imageRef);
        } else {
          throw new Error('Error');
        }
      }
    }
    return filesUrls;
  };

  return {
    buddies: stepsData.fifthStep.buddies || [],
    danSurvey: stepsData.eighthStep.danSurvey,
    surveyId: stepsData.eighthStep.surveyId,
    diveActivities: convertDiveActivities(stepsData.firstStep.diveActivities),
    // TODO: Implement dive center logic
    diveCenter: {
      id: '0',
      guide: '0',
    },
    diveData: {
      ...replaceUndefinedToNull(stepsData.secondStep.parameters),
      ...replaceUndefinedToNull(stepsData.secondStep.advancedParameters),
      safetySpots: stepsData.secondStep.parameters?.safetySpots
        ? checkSafetySpots(stepsData.secondStep.parameters.safetySpots)
        : [],
    },
    aboutDive: {
      ...replaceUndefinedToNull(stepsData.firstStep.overview),
      ...replaceUndefinedToNull(stepsData.firstStep.diveReviews),
    },
    draft,
    externalImgsUrls: await uploadFiles(),
    gears: stepsData.seventhStep.gears?.map((gear) => replaceUndefinedToNull(gear)) || [],
    publishingMode: stepsData.ninthStep.publishingMode,
    species: stepsData.fourthStep.species || [],
    spotId: stepsData.thirdStep.spotId,
    tanks: stepsData.secondStep.tanks?.map((tank) => replaceUndefinedToNull(tank)) || [],
    oldId: null,
    unitSystem,
    saves: 0,
  };
};

const convertDistanceSystem = (
  userUnitSystem: UnitSystem,
  value: number,
): number => {
  if (!value) {
    return 0;
  }
  if (userUnitSystem === 'METRIC') {
    return convertFeetToMeters(value);
  }
  return convertMetersToFeet(value);
};

const convertTempSystem = (
  userUnitSystem: UnitSystem,
  value: number,
): number => {
  if (!value) {
    return 0;
  }
  if (userUnitSystem === 'METRIC') {
    return convertFarToCal(value);
  }
  return convertCalToFar(value);
};

const convertWeightSystem = (
  userUnitSystem: UnitSystem,
  value: number,
): number => {
  if (!value) {
    return 0;
  }
  if (userUnitSystem === 'METRIC') {
    return convertLbsToKg(value);
  }
  return convertKgToLbs(value);
};

export const convertToStepsData = (data: DiveType, unitSystem: UnitSystem) => ({
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
      maxDepth: unitSystem === data.unitSystem
        ? data.diveData?.maxDepth
        : convertDistanceSystem(unitSystem, data.diveData?.maxDepth),
      duration: data.diveData?.duration,
      surfaceInterval: data.diveData?.surfaceInterval,
      safetySpots: unitSystem === data.unitSystem
        ? data.diveData?.safetySpots
        : data.diveData?.safetySpots.map((spot) => (
          { ...spot, depth: convertDistanceSystem(unitSystem, spot.depth) }
        ))
      ,
    },
    advancedParameters: {
      surfaceTemp: unitSystem === data.unitSystem
        ? data.diveData?.surfaceTemp
        : convertTempSystem(unitSystem, data.diveData?.surfaceTemp),
      bottomTemp: unitSystem === data.unitSystem
        ? data.diveData?.bottomTemp
        : convertTempSystem(unitSystem, data.diveData?.bottomTemp),
      weights: unitSystem === data.unitSystem
        ? data.diveData?.weights
        : convertWeightSystem(unitSystem, data.diveData?.weights),
      waterVisibility: data.diveData?.waterVisibility,
      current: data.diveData?.current,
      altitude: unitSystem === data.unitSystem
        ? data.diveData?.altitude
        : convertDistanceSystem(unitSystem, data.diveData?.altitude),
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
      dateAcquired: gear.dateAcquired ? convertTimestampDate(gear.dateAcquired) : null,
      lastMaintenance: gear.lastMaintenance ? convertTimestampDate(gear.lastMaintenance) : null,
    })),
    save: true,
  },
  eighthStep: { surveyId: data.surveyId || null },
  ninthStep: {
    publishingMode: data.publishingMode,
  },
});
