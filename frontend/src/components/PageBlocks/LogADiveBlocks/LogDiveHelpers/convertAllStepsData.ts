import { AllStepsDataType } from '../types/stepTypes';
import { DiveType } from '../../../../firebase/firestore/models';
import {
  convertDiveActivities,
  convertToDiveActivities,
} from './convertDiveActivities';
import { convertTimestampDate } from '../../../../utils/convertTimestampDate';
import { SafetySpot } from '../types/commonTypes';
import { firestoreGalleryService } from '../../../../firebase/firestore/firestoreServices/firestoreGalleryService';

export const convertAllStepsData = async (
  stepsData: AllStepsDataType,
  userId: string,
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
    danSend: false,
    diveActivities: convertDiveActivities(stepsData.firstStep.diveActivities),
    // TODO: Implement dive center logic
    diveCenter: {
      id: '0',
      guide: '0',
    },
    diveData: {
      ...replaceUndefinedToNull(stepsData.secondStep.parameters),
      ...replaceUndefinedToNull(stepsData.secondStep.advancedParameters),
      // eslint-disable-next-line max-len
      safetySpots: stepsData.secondStep.parameters?.safetySpots ? checkSafetySpots(stepsData.secondStep.parameters.safetySpots) : [],
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
    unitSystem: 'metric',
    saves: 0,
  };
};

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
      dateAcquired: gear.dateAcquired ? convertTimestampDate(gear.dateAcquired) : null,
      lastMaintenance: gear.lastMaintenance ? convertTimestampDate(gear.lastMaintenance) : null,
    })),
    save: true,
  },
  eighthStep: {},
  ninthStep: {
    publishingMode: data.publishingMode,
  },
});
