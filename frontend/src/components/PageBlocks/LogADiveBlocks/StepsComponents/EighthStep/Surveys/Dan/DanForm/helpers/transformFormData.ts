import { DanSurveyType } from '../../../../../../../../../types';

export const transformFormData = (formData: DanSurveyType) => ({
  ...formData,
  beforeDive: {
    ...formData.beforeDive,
    drinks: +formData.beforeDive.drinks,
  },
  afterDive: {
    ...formData.afterDive,
    hoursBeforeExposeAltitude: +formData.afterDive.hoursBeforeExposeAltitude,
    dateOfFlight: new Date(formData.afterDive.dateOfFlight),
    totalHoursOfExpose: +formData.afterDive.totalHoursOfExpose,
    altitudeOfExpose: +formData.afterDive.altitudeOfExpose,
  },
  identification: {
    ...formData.identification,
    birth: new Date(formData.identification.birth),
  },
  divingExperience: {
    ...formData.divingExperience,
    firstDateOfCertification: new Date(formData.divingExperience.firstDateOfCertification),
    numberOfDivesInYear: +formData.divingExperience.numberOfDivesInYear,
    numberOfDivesInFiveYears: +formData.divingExperience.numberOfDivesInFiveYears,
  },
  medicalCondition: {
    ...formData.medicalCondition,
    weight: {
      value: +formData.medicalCondition.weight.value,
      measures: formData.medicalCondition.weight.measures,
    },
    height: {
      value: +formData.medicalCondition.height.value,
      measures: formData.medicalCondition.height.measures,
    },
  },
});
