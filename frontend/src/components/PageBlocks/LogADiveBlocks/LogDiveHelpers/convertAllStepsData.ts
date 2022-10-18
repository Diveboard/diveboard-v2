import { AllStepsDataType } from '../types/stepTypes';
import { DiveType } from '../../../../firebase/firestore/models';
import { convertDiveActivities } from './convertDiveActivities';

export const convertAllStepsData = (stepsData: AllStepsDataType, draft: boolean = false) => {
  const convertedData: DiveType = {
    buddies: stepsData.fifthStep.buddies,
    danSend: false,
    diveActivities: convertDiveActivities(stepsData.firstStep.diveActivities),
    diveCenter: {
      id: '0',
      guide: '0',
    },
    diveData: { ...stepsData.secondStep.parameters, ...stepsData.secondStep.advancedParameters },
    aboutDive: { ...stepsData.firstStep.overview, ...stepsData.firstStep.diveReviews },
    draft,
    externalImgsUrls: stepsData.sixthStep.mediaUrl,
    gears: stepsData.seventhStep.gears,
    publishingMode: stepsData.ninthStep.publishingMode,
    species: ['species1', 'species2'], // stepsData.fourthStep.species,
    spotId: stepsData.thirdStep.spotId,
    tanks: stepsData.secondStep.tanks,
    oldId: null,
    unitSystem: 'metric',
    saves: 0,
  };
  return convertedData;
};
