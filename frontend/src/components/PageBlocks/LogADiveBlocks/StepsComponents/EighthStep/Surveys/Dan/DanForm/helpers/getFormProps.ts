import React from 'react';
import { setValueToFormData } from './setToFormData';
import { DanSurveyType } from '../../../../../../../../../types';

const getBeforeDiveProps = (setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>) => {
  const setValue = setValueToFormData(setFormData, 'beforeDive');
  const setDivePlan = setValue('divePlan');
  const setTable = setValue('tablesUsed');
  const setRest = setValue('rest');
  const setDrinks = setValue('drinks');
  const setExercise = setValue('exercise');
  const setMedication = setValue('medication');

  const divePlanItems: DanSurveyType['beforeDive']['divePlan'][] = [
    'none', 'table', 'computer', 'another diver',
  ];

  const tableUsedItems: DanSurveyType['beforeDive']['tablesUsed'][] = [
    'PADI', 'NAUI', 'BSAC', 'Beuhlman', 'US NAVY', 'CSIEMD', 'CSMD', 'COMEX', 'MN90', ' Other', 'none',
  ];

  const restItems: DanSurveyType['beforeDive']['rest'][] = [
    'rested', 'tired', 'exhausted',
  ];

  const exerciseItems: DanSurveyType['beforeDive']['exercise'][] = ['none', 'exhausting', '', 'light', 'moderate', 'severe'];

  return {
    divePlan: {
      items: divePlanItems,
      setItem: setDivePlan,
    },
    diveTable: {
      items: tableUsedItems,
      setItems: setTable,
    },
    rest: {
      items: restItems,
      setItems: setRest,
    },
    drinks: {
      setItems: setDrinks,
    },
    exercise: {
      items: exerciseItems,
      setItems: setExercise,
    },
    medication: {
      setItems: setMedication,
    },
  } as const;
};

const getDuringDiveProps = (setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>) => {
  const setValue = setValueToFormData(setFormData, 'duringDive');
  const setPurpose = setValue('purpose');
  const setProgram = setValue('program');
  const setEnvironment = setValue('environment');
  const setPlatform = setValue('platform');
  const setThermal = setValue('thermal');
  const setLoad = setValue('load');
  const setDecompression = setValue('decompression');
  const setProblems = setValue('problems');
  const setEquipment = setValue('equipment');

  const purposeItems: DanSurveyType['duringDive']['purpose'][] = [
    'sightseeng', 'learning', 'teaching', 'research', 'photography', 'spearfishing', 'proficiency', 'work', 'other'];

  const programItems: DanSurveyType['duringDive']['program'][] = [
    'recreational', 'training', 'scientific', 'medical', 'commercial', 'military', 'competitive', 'other',
  ];

  const environmentItems: DanSurveyType['duringDive']['environment'][] = [
    'ocean/sea', 'lake/quarry', 'river/spring', 'cave/cavern', 'pool', 'chamber', 'under ice', 'other'];

  const platformItems: DanSurveyType['duringDive']['platform'][] = [
    'beach/shore', 'pier', 'small boat', 'charter boat', 'live-board', 'barge', 'landside', 'hyperbaric facility', 'other'];

  const thermalItems: DanSurveyType['duringDive']['thermal'][] = [
    'comfortable', 'cold', 'very cold', 'hot',
  ];

  const loadItems: DanSurveyType['duringDive']['load'][] = [
    'resting', 'light', 'moderate', 'severe', 'exhausting',
  ];

  const decompressionItems: DanSurveyType['duringDive']['decompression'][] = [
    'safety spots', 'in water', 'in chamber', 'other', 'none',
  ];

  const problemsItems: DanSurveyType['duringDive']['problems'][] = [
    'none', 'equalization', 'vertigo', 'out of air', 'buoyancy', 'shared air', 'rapid ascent', 'sea sickness', 'other',
  ];
  const equipmentItems: DanSurveyType['duringDive']['equipment'][] = [
    'none', 'face mask', 'fins', 'weighting belt', 'BC', 'thermal protection', 'dive computer', 'depth gauge', 'pressure gauge', 'breathing apparatus', 'deco reel', 'other',
  ];

  return {
    purpose: {
      items: purposeItems,
      setItems: setPurpose,
    },
    program: {
      items: programItems,
      setItems: setProgram,
    },
    environment: {
      items: environmentItems,
      setItems: setEnvironment,
    },
    platform: {
      items: platformItems,
      setItems: setPlatform,
    },
    thermal: {
      items: thermalItems,
      setItems: setThermal,
    },
    load: {
      items: loadItems,
      setItems: setLoad,
    },
    decompression: {
      items: decompressionItems,
      setItems: setDecompression,
    },
    problems: {
      items: problemsItems,
      setItems: setProblems,
    },
    equipment: {
      items: equipmentItems,
      setItems: setEquipment,
    },
  } as const;
};

const getAfterDiveProps = (setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>) => {
  const setValue = setValueToFormData(setFormData, 'afterDive');
  const setSymptoms = setValue('feelSymptoms');
  const setComments = setValue('comments');
  const setExposeToAltitude = setValue('exposeToAltitude');
  const setHoursBeforeExposeAltitude = setValue('hoursBeforeExposeAltitude');
  const setDateOfFlight = setValue('dateOfFlight');
  const setTotalHoursOfExpose = setValue('totalHoursOfExpose');
  const setAltitudeOfExpose = setValue('altitudeOfExpose');
  const setTreated = setValue('treatedInHyperbaricChamber');

  const symptomsItems: DanSurveyType['afterDive']['feelSymptoms'][] = ['yes', 'no'];
  const exposeAltitudeItems: DanSurveyType['afterDive']['exposeToAltitude'][] = ['none', 'commercial aircraft', 'unpressurized aircraft', 'medevac aircraft', 'group transportation', 'helicopter'];
  const treatedItems: DanSurveyType['afterDive']['treatedInHyperbaricChamber'][] = ['yes', 'no'];

  return {
    symptoms: {
      items: symptomsItems,
      setItems: setSymptoms,
    },
    comments: {
      setItems: setComments,
    },
    exposeAltitude: {
      items: exposeAltitudeItems,
      setItems: setExposeToAltitude,
    },
    hoursBeforeExposeAltitude: {
      setItems: setHoursBeforeExposeAltitude,
    },
    dateOfFlight: {
      setItems: setDateOfFlight,
    },
    totalHours: {
      setItems: setTotalHoursOfExpose,
    },
    altitudeOfExpose: {
      setItems: setAltitudeOfExpose,
    },
    treated: {
      items: treatedItems,
      setItems: setTreated,
    },
  } as const;
};

const getIdentificationProps = (
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>,
) => {
  const setValue = setValueToFormData(setFormData, 'identification');
  const setDanProjectId = setValue('DANProjectDiveExplorationID');
  const setDanMemberId = setValue('DANMemberID');
  const setFamilyName = setValue('familyName');
  const setGivenName = setValue('givenName');
  const setMiddleName = setValue('middleName');
  const setSuffixName = setValue('suffix');
  const setPrefixName = setValue('prefix');
  const setDegree = setValue('degree');
  const setAlias = setValue('alias');
  const setMothersMaidenName = setValue('mothersMaidenName');
  const setSex = setValue('sex');
  const setBirth = setValue('birth');
  const setCityBirth = setValue('birthplaceCity');
  const setRegionBirth = setValue('birthplaceRegion');
  const setCountryBirth = setValue('birthplaceCountry');

  const sexItems: DanSurveyType['identification']['sex'][] = ['male', 'female', 'other'];

  return {
    projectId: {
      setItems: setDanProjectId,
    },
    memberId: {
      setItems: setDanMemberId,
    },
    givenName: {
      setItems: setGivenName,
    },
    familyName: {
      setItems: setFamilyName,
    },
    middleName: {
      setItems: setMiddleName,
    },
    suffix: {
      setItems: setSuffixName,
    },
    prefix: {
      setItems: setPrefixName,
    },
    degree: {
      setItems: setDegree,
    },
    alias: {
      setItems: setAlias,
    },
    mothersMaidenName: {
      setItems: setMothersMaidenName,
    },
    sex: {
      items: sexItems,
      setItems: setSex,
    },
    birthDate: {
      setItems: setBirth,
    },
    cityBirth: {
      setItems: setCityBirth,
    },
    regionBirth: {
      setItems: setRegionBirth,
    },
    countryBirth: {
      setItems: setCountryBirth,
    },
  } as const;
};

const getContactsProps = (setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>) => {
  const setValue = setValueToFormData(setFormData, 'contactInfo');
  const setStreet = setValue('streetAddress');
  const setAddress = setValue('addressComplement');
  const setCity = setValue('city');
  const setState = setValue('state');
  const setZip = setValue('zipCode');
  const setCountry = setValue('country');
  const setHomePhone = setValue('phoneHome');
  const setWorkPhone = setValue('phoneWork');
  const setEmail = setValue('email');
  const setLanguage = setValue('language');
  const setCitizenship = setValue('citizenship');

  return {
    street: {
      setItems: setStreet,
    },
    address: {
      setItems: setAddress,
    },
    city: {
      setItems: setCity,
    },
    state: {
      setItems: setState,
    },
    zipCode: {
      setItems: setZip,
    },
    country: {
      setItems: setCountry,
    },
    homePhone: {
      setItems: setHomePhone,
    },
    workPhone: {
      setItems: setWorkPhone,
    },
    email: {
      setItems: setEmail,
    },
    language: {
      setItems: setLanguage,
    },
    citizenship: {
      setItems: setCitizenship,
    },
  } as const;
};

const getExperienceProps = (setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>) => {
  const setValue = setValueToFormData(setFormData, 'divingExperience');
  const setLicenceNumber = setValue('license');
  const setLicenceAgency = setValue('issueAgency');
  const setDateOfCertification = setValue('firstDateOfCertification');
  const setCertificationLevel = setValue('level');
  const setNumberOfDivesInYear = setValue('numberOfDivesInYear');
  const setNumberOfDivesInFiveYears = setValue('numberOfDivesInFiveYears');

  const levelItems: DanSurveyType['divingExperience']['level'][] = ['student', 'basic', 'advanced/speciality', 'rescue', 'dive master', 'instructor', 'technical/cave/deep diving', 'scientific', 'commercial', 'military'];

  return {
    licence: {
      setItems: setLicenceNumber,
    },
    agency: {
      setItems: setLicenceAgency,
    },
    certificationDate: {
      setItems: setDateOfCertification,
    },
    level: {
      setItems: setCertificationLevel,
      items: levelItems,
    },
    yearDives: {
      setItems: setNumberOfDivesInYear,
    },
    fiveYearsDives: {
      setItems: setNumberOfDivesInFiveYears,
    },
  } as const;
};

const getMedicalConditionsProps = (
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>,
) => {
  const setValue = setValueToFormData(setFormData, 'medicalCondition');
  const setWeight = setValue('weight');
  const setHeight = setValue('height');
  const setConditions = setValue('conditions');
  const setMedications = setValue('medications');
  const setCigarettes = setValue('cigarettes');

  const weightItems = ['kg', 'lb'];
  const heightItems = ['cm', 'in'];
  const cigarettesItems: DanSurveyType['medicalCondition']['cigarettes'][] = ['yes', 'no'];

  return {
    weight: {
      setItems: setWeight,
      items: weightItems,
    },
    height: {
      setItems: setHeight,
      items: heightItems,
    },
    medicalConditions: {
      setItems: setConditions,
    },
    medications: {
      setItems: setMedications,
    },
    cigarettes: {
      setItems: setCigarettes,
      items: cigarettesItems,
    },
  } as const;
};

type AllFormPropsType = {
  beforeDive: ReturnType<typeof getBeforeDiveProps>;
  duringDive: ReturnType<typeof getDuringDiveProps>;
  afterDive: ReturnType<typeof getAfterDiveProps>;
  identification: ReturnType<typeof getIdentificationProps>;
  contacts: ReturnType<typeof getContactsProps>;
  experience: ReturnType<typeof getExperienceProps>;
  medical: ReturnType<typeof getMedicalConditionsProps>;
};

export type FormPropsType<Block extends keyof AllFormPropsType> = AllFormPropsType[Block];

export const getFormProps = <Block extends keyof DanSurveyType>(
  formBlock: Block,
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>) => {
  switch (formBlock) {
    case 'beforeDive':
      return getBeforeDiveProps(setFormData);
    case 'duringDive':
      return getDuringDiveProps(setFormData);
    case 'afterDive':
      return getAfterDiveProps(setFormData);
    case 'identification':
      return getIdentificationProps(setFormData);
    case 'contactInfo':
      return getContactsProps(setFormData);
    case 'divingExperience':
      return getExperienceProps(setFormData);
    case 'medicalCondition':
      return getMedicalConditionsProps(setFormData);
    default:
      throw new Error('incorrect block name');
  }
};
