import { AllStepsDataType } from '../types/stepTypes';
import {
  DiveType, MediaUrls, SpeciesType, UnitSystem,
} from '../../../../firebase/firestore/models';
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
  const checkSafetySpots = (safetyStops: Array<SafetySpot>) => safetyStops.filter((spot) => {
    if (spot.depth && spot.period) {
      return spot;
    }
  });

  const convertSpecies = (species: SpeciesType[]) => {
    const specs = {};
    species.forEach((specie) => {
      specs[specie.id] = specie.ref;
    });
    return specs;
  };

  const uploadFiles = async () => {
    const mediaUrls = stepsData.sixthStep.mediaUrl;
    const result = [];
    if (mediaUrls.length) {
      for (let i = 0; i < mediaUrls.length; i++) {
        if (!mediaUrls[i].id) {
          // eslint-disable-next-line no-await-in-loop
          const newPic = await firestoreGalleryService.addImgToGallery({
            url: mediaUrls[i].url,
            user: userId,
            createdAt: new Date(),
            media: 'IMAGE',
            height: 0,
            width: 0,
            spot: stepsData.thirdStep.spotId,
            videoUrl: null,
          });
          result.push(newPic);
        } else {
          result.push([mediaUrls[i].id, mediaUrls[i].ref]);
        }
      }
    }

    const { files } = stepsData.sixthStep;
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const res = await firestoreGalleryService.uploadGalleryFile(userId, files[i].file);
        // eslint-disable-next-line no-await-in-loop
        const imageRef = await firestoreGalleryService.getGalleryFile(res.ref);
        if (imageRef) {
        // eslint-disable-next-line no-await-in-loop
          result.push(await firestoreGalleryService.addImgToGallery({
            url: imageRef,
            user: userId,
            createdAt: new Date(),
            media: 'IMAGE',
            height: 0,
            width: 0,
            spot: stepsData.thirdStep.spotId,
            videoUrl: null,
          }));
        } else {
          throw new Error('Error');
        }
      }
    }
    console.log(Object.fromEntries(result));
    return Object.fromEntries(result);
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
      safetyStops: stepsData.secondStep.parameters?.safetyStops
        ? checkSafetySpots(stepsData.secondStep.parameters.safetyStops)
        : [],
    },
    aboutDive: {
      ...replaceUndefinedToNull(stepsData.firstStep.overview),
      ...replaceUndefinedToNull(stepsData.firstStep.diveReviews),
    },
    draft,
    pictures: await uploadFiles(),
    gears: stepsData.seventhStep.gears?.map((gear) => replaceUndefinedToNull(gear)) || [],
    publishingMode: stepsData.ninthStep.publishingMode.toUpperCase(),
    species: stepsData.fourthStep.species?.length
      ? convertSpecies(stepsData.fourthStep.species)
      : {},
    spotId: stepsData.thirdStep.spotId, // Add spot ref
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
        time: data.diveData?.time,
        date: data.diveData?.date
          ? convertTimestampDate(data.diveData.date)
          : null,
        maxDepth: unitSystem === data.unitSystem
          ? data.diveData?.maxDepth
          : convertDistanceSystem(unitSystem, data.diveData?.maxDepth),
        duration: data.diveData?.duration,
        surfaceInterval: data.diveData?.surfaceInterval,
        safetyStops: unitSystem === data.unitSystem
          ? data.diveData?.safetyStops
          : data.diveData?.safetyStops.map((spot) => (
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
    eighthStep: { surveyId: data.surveyId || null },
    ninthStep: {
      publishingMode: data.publishingMode,
    },
  });
