import { doc, DocumentReference } from '@firebase/firestore';
import { AllStepsDataType } from '../types/stepTypes';
import {
  BuddiesType,
  DiveType, MediaUrls, SpeciesType, UnitSystem,
} from '../../../../firebase/firestore/models';
import {
  convertDiveActivities,
  convertToDiveActivities,
} from './convertDiveActivities';
import { convertTimestampDate } from '../../../../utils/convertTimestampDate';
import { SafetySpot } from '../types/commonTypes';
import {
  convertCalToFar,
  convertFarToCal,
  convertFeetToMeters, convertKgToLbs, convertLbsToKg,
  convertMetersToFeet,
} from '../../../../utils/unitSystemConverter';
import { PathEnum } from '../../../../firebase/firestore/firestorePaths';
import { db } from '../../../../firebase/firestore/firebaseFirestore';

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
  const checkSafetySpots = (safetyStops: Array<SafetySpot>) => safetyStops.filter((spot) => {
    if (spot.depth && spot.period) {
      return spot;
    }
  });

  const convertSpecies = (species: SpeciesType[]) => {
    const specs = {};
    species.forEach((specie) => {
      const ref = doc(db, `${PathEnum.SPECIES}/${specie.id}`);
      specs[specie.id] = ref;
    });
    return specs;
  };

  const convertDiveBuddies = (buddies: Array<BuddiesType>) => {
    if (!buddies?.length) {
      return [];
    }
    return buddies.map((buddy) => {
      if (buddy.userRef) {
        buddy.userRef = doc(db, `users/${buddy.id}`);
      }
      return buddy;
    });
  };

  return {
    buddies: convertDiveBuddies(stepsData.fifthStep.buddies),
    danSurvey: stepsData.eighthStep.danSurvey || null,
    surveyRef: stepsData.eighthStep.surveyRef || null,
    diveActivities: convertDiveActivities(stepsData.firstStep.diveActivities),
    diveData: {
      ...replaceUndefinedToNull(stepsData.secondStep.parameters),
      ...replaceUndefinedToNull(stepsData.secondStep.advancedParameters),
      safetyStops: stepsData.secondStep.parameters?.safetyStops
        ? checkSafetySpots(stepsData.secondStep.parameters.safetyStops)
        : [],
    },
    aboutDive: {
      ...replaceUndefinedToNull(stepsData.firstStep.overview),
      ...replaceUndefinedToNull(stepsData.firstStep.diveReviews),
    },
    draft,
    pictures: stepsData.sixthStep,
    gears: stepsData.seventhStep.gears?.map((gear) => replaceUndefinedToNull(gear)) || [],
    publishingMode: stepsData.ninthStep.publishingMode?.toUpperCase() || 'PUBLIC',
    species: stepsData.fourthStep.species?.length
      ? convertSpecies(stepsData.fourthStep.species)
      : {},
    spotRef: stepsData.thirdStep.spotId ? doc(db, `${PathEnum.SPOTS}/${stepsData.thirdStep.spotId}`) : null,
    tanks: stepsData.secondStep.tanks?.map((tank) => replaceUndefinedToNull(tank)) || [],
    oldId: null,
    unitSystem,
    saves: 0,
  };
};

const convertDistanceSystem = (
  userUnitSystem: UnitSystem,
  diveUnitSystem: UnitSystem,
  value: number,
): number => {
  if (!value) {
    return 0;
  }
  if (userUnitSystem === diveUnitSystem.toUpperCase()) {
    return value;
  }
  if (userUnitSystem === 'METRIC') {
    return convertFeetToMeters(value);
  }
  return convertMetersToFeet(value);
};

const convertTempSystem = (
  userUnitSystem: UnitSystem,
  diveUnitSystem: UnitSystem,
  value: number,
): number => {
  if (!value) {
    return 0;
  }
  if (userUnitSystem === diveUnitSystem.toUpperCase()) {
    return value;
  }
  if (userUnitSystem === 'METRIC') {
    return convertFarToCal(value);
  }
  return convertCalToFar(value);
};

const convertWeightSystem = (
  userUnitSystem: UnitSystem,
  diveUnitSystem: UnitSystem,
  value: number,
): number => {
  if (!value) {
    return 0;
  }
  if (userUnitSystem === diveUnitSystem.toUpperCase()) {
    return +value.toFixed(2);
  }
  if (userUnitSystem === 'METRIC') {
    return +convertLbsToKg(value).toFixed(2);
  }
  return +convertKgToLbs(value).toFixed(2);
};

const findSpotIdByRef = (spotRef: DocumentReference) => {
  // @ts-ignore
  const segments = spotRef._key?.path?.segments;
  if (segments?.length) {
    return segments[segments.length - 1];
  }
  return null;
};

export const convertToStepsData = (
  data: DiveType & { mediaUrls: Array<MediaUrls> },
  unitSystem: UnitSystem,
) => (
  {
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
        date: data.diveData?.date
          ? convertTimestampDate(data.diveData.date)
          : null,
        maxDepth: unitSystem === data.unitSystem
          ? data.diveData?.maxDepth
          : convertDistanceSystem(unitSystem, data.unitSystem, data.diveData?.maxDepth),
        duration: data.diveData?.duration,
        surfaceInterval: data.diveData?.surfaceInterval,
        profileData: data.diveData?.profileData,
        safetyStops: unitSystem === data.unitSystem
          ? data.diveData?.safetyStops
          : data.diveData?.safetyStops.map((spot) => (
            { ...spot, depth: convertDistanceSystem(unitSystem, data.unitSystem, spot.depth) }
          ))
        ,
      },
      advancedParameters: {
        surfaceTemp: unitSystem === data.unitSystem
          ? data.diveData?.surfaceTemp
          : convertTempSystem(unitSystem, data.unitSystem, data.diveData?.surfaceTemp),
        bottomTemp: unitSystem === data.unitSystem
          ? data.diveData?.bottomTemp
          : convertTempSystem(unitSystem, data.unitSystem, data.diveData?.bottomTemp),
        weights: unitSystem === data.unitSystem
          ? data.diveData?.weights
          : convertWeightSystem(unitSystem, data.unitSystem, data.diveData?.weights),
        waterVisibility: data.diveData?.waterVisibility,
        current: data.diveData?.current,
        altitude: unitSystem === data.unitSystem
          ? data.diveData?.altitude
          : convertDistanceSystem(unitSystem, data.unitSystem, data.diveData?.altitude),
        waterType: data.diveData?.waterType,
      },
      tanks: data.tanks,
    },
    thirdStep: {
      spotId: data.spotRef ? findSpotIdByRef(data.spotRef) : null,
    },
    fourthStep: {
      species: data.species,
    },
    fifthStep: {
      buddies: data.buddies,
    },
    sixthStep: {
      mediaUrl: data.mediaUrls,
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
    eighthStep: { surveyRef: data.surveyRef || null },
    ninthStep: {
      publishingMode: data.publishingMode,
    },
  });
