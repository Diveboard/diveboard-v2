import { useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { getRequiredFields } from './getRequiredFields';
import { getEmptyRequiredFields } from './getEmptyRequiredFields';
import { SurveyDanType } from '../../../../../../../../../types';

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

export const useFormSubmit = (formData: SurveyDanType) => {
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

  useEffect(() => {
    const requiredData = getRequiredFields(formData);
    const newErrors = { ...errors };
    for (const key in requiredData) {
      if (requiredData[key] && requiredData[key] !== '0') {
        newErrors[key] = '';
      }
    }
    setErrors(newErrors);
  }, [formData]);

  const onSaveDataHandler = (setSaveDAN: (val: boolean) => void) => {
    const requiredData = getRequiredFields(formData);
    const emptyFields = getEmptyRequiredFields(requiredData);
    const newErrors = { ...errors };

    emptyFields.forEach((emptyItem) => {
      newErrors[emptyItem] = 'This field is required';
    });
    if (!isValidPhoneNumber(requiredData.phoneHome)) {
      newErrors.phoneHome = 'Invalid phone number';
    }

    setErrors(newErrors);
    setSaveDAN(!Object.values(newErrors).some((val) => val));
    // setSurveyMode('');
  };

  return { errors, onSaveDataHandler };
};
