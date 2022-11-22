import React, { useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { getRequiredFields } from './getRequiredFields';
import { getEmptyRequiredFields } from './getEmptyRequiredFields';
import { DanSurveyType } from '../../../../../../../../../types';
import { transformFormData } from './transformFormData';
import {
  firestoreSurveysService,
} from '../../../../../../../../../firebase/firestore/firestoreServices/firestoreSurveysService';
import { SurveyDataDANType } from '../../../../../../../../../firebase/firestore/models';
import { EighthStepType } from '../../../../../../types/stepTypes';

export type FormErrorsType = {
  divePlan: string,
  environment: string,
  equipment: string,
  problems: string,
  platform: string,
  thermal: string,
  load: string,
  decompression: string,
  feelSymptoms: string,
  exposeToAltitude: string,
  familyName: string,
  givenName: string,
  sex: string,
  birth: string,
  phoneHome: string,
  weight: string,
  height: string,
};

export const useFormSubmit = (formData: DanSurveyType) => {
  const [errors, setErrors] = useState({
    divePlan: '',
    environment: '',
    equipment: '',
    problems: '',
    platform: '',
    thermal: '',
    load: '',
    decompression: '',
    feelSymptoms: '',
    exposeToAltitude: '',
    familyName: '',
    givenName: '',
    sex: '',
    birth: '',
    phoneHome: '',
    weight: '',
    height: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requiredData = getRequiredFields(formData);
    const newErrors = { ...errors };
    for (const key in requiredData) {
      if (requiredData[key]) {
        newErrors[key] = '';
      }
    }
    setErrors(newErrors);
  }, [formData]);

  const onSaveDataHandler = async (
    setSurvey: React.Dispatch<React.SetStateAction<EighthStepType>>,
    setSurveyMode: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const requiredData = getRequiredFields(formData);
    const emptyFields = getEmptyRequiredFields(requiredData);
    const newErrors = { ...errors };

    emptyFields.forEach((emptyItem) => {
      newErrors[emptyItem] = 'this field is required';
    });
    if (!isValidPhoneNumber(requiredData.phoneHome)) {
      newErrors.phoneHome = 'invalid phone number';
    }

    setErrors(newErrors);

    if (emptyFields.length === 0) {
      setLoading(true);
      const danData = transformFormData(formData);
      const surveyId = await firestoreSurveysService.setSurveyData('DAN', danData as unknown as SurveyDataDANType);
      // @ts-ignore
      setSurvey((prevState) => [...prevState, { surveyId, surveyName: 'DAN', date: new Date() }]);
      setSurveyMode('');
      setLoading(false);
    }
  };

  return { errors, onSaveDataHandler, loading };
};
