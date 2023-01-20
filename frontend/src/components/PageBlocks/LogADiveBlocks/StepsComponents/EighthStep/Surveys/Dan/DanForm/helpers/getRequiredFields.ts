import { SurveyDanType } from '../../../../../../../../../types';

export const getRequiredFields = (data: SurveyDanType) => ({
  divePlan: data?.dive.dive_plan,
  environment: data?.dive.environment,
  equipment: data?.dive.malfunction,
  problems: data?.dive.problems,
  platform: data?.dive.platform,
  thermal: data?.dive.thermal_confort,
  load: data?.dive.workload,
  decompression: data?.dive.decompression,
  feelSymptoms: data?.dive.symptoms,
  exposeToAltitude: data?.dive.altitude_exposure,
  familyName: data?.diver.name ? data.diver.name[0] : '',
  givenName: data?.diver.name ? data.diver.name[1] : '',
  sex: data?.diver.sex,
  birth: data?.diver.birthday,
  phoneHome: data?.diver.phone_home ? `+${data?.diver.phone_home.join('')}` : '',
  weight: data?.diver.weight ? data.diver.weight[0] : '',
  height: data?.diver.height ? data.diver.height[0] : '',
} as const);

export type RequiredFormItemsType = ReturnType<typeof getRequiredFields>;
