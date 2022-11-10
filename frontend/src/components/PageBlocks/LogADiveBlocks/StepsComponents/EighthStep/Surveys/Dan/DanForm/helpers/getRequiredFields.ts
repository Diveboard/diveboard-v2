import { DanSurveyType } from '../../../../../../types/stepTypes';

export const getRequiredFields = (data: DanSurveyType) => {
  const {
    beforeDive: { divePlan },
    duringDive: {
      environment, platform, thermal, load, decompression, problems, equipment,
    },
    afterDive: {
      feelSymptoms, exposeToAltitude,
    },
    identification: {
      familyName, givenName, sex, birth,
    },
    contactInfo: { phoneHome },
    medicalCondition: { weight, height },
  } = data;

  return {
    divePlan,
    environment,
    equipment,
    problems,
    platform,
    thermal,
    load,
    decompression,
    feelSymptoms,
    exposeToAltitude,
    familyName,
    givenName,
    sex,
    birth,
    phoneHome,
    weight: weight.value,
    height: height.value,
  } as const;
};

export type RequiredFormItemsType = ReturnType<typeof getRequiredFields>;
