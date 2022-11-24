import React from 'react';
import { DanSurveyType } from '../../../../../../../../../types';

export const setValueToFormData = <Block extends keyof DanSurveyType>(
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>,
  formBlock: Block,
) => <Field extends keyof DanSurveyType[Block]>(field: Field) => (
    v: DanSurveyType[typeof formBlock][typeof field],
  ) => {
    setFormData((prev) => (
      {
        ...prev,
        [formBlock]:
          {
            ...prev[formBlock],
            [field]: v,
          },
      }));
  };
