import { DanSurveyType } from '../../../../../../../../types';

export const InitialDANFormState: DanSurveyType = {
  beforeDive: {
    divePlan: '',
    tablesUsed: '',
    rest: '',
    drinks: '',
    exercise: '',
    medication: '',
  },
  duringDive: {
    purpose: '',
    program: '',
    environment: '',
    platform: '',
    thermal: '',
    load: '',
    decompression: '',
    problems: '',
    equipment: '',
  },
  afterDive: {
    feelSymptoms: '',
    comments: '',
    exposeToAltitude: '',
    hoursBeforeExposeAltitude: '',
    dateOfFlight: '',
    totalHoursOfExpose: '',
    altitudeOfExpose: '',
    treatedInHyperbaricChamber: '',
  },

  identification: {
    DANProjectDiveExplorationID: '',
    DANMemberID: '',
    familyName: '',
    givenName: '',
    middleName: '',
    suffix: '',
    prefix: '',
    alias: '',
    degree: '',
    mothersMaidenName: '',
    sex: '',
    birth: '',
    birthplaceCity: '',
    birthplaceRegion: '',
    birthplaceCountry: '',
  },
  contactInfo: {
    streetAddress: '',
    addressComplement: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneHome: '',
    phoneWork: '',
    email: '',
    language: '',
    citizenship: '',
  },
  divingExperience: {
    license: '',
    issueAgency: '',
    firstDateOfCertification: '',
    level: '',
    numberOfDivesInYear: '',
    numberOfDivesInFiveYears: '',
  },
  medicalCondition: {
    weight: { value: '', measures: 'kg' },
    height: { value: '', measures: 'cm' },
    conditions: '',
    medications: '',
    cigarettes: '',
  },
};