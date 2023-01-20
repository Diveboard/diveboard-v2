import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { TextArea } from '../../../../../../../../../Input/TextArea';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { SurveyDanType } from '../../../../../../../../../../types';
import {
  DivePlanVariants, ExerciseVariants, RestVariants, TableUsedVariants,
} from '../../initialDANFormState';

type Props = {
  formData: SurveyDanType;
  setFormData: React.Dispatch<React.SetStateAction<SurveyDanType>>
  error: FormErrorsType['divePlan']
};

export const Before: FC<Props> = ({
  formData,
  setFormData,
  error,
}) => (
  <CategoryWrapper title="Before the dive">
    <FormItemWrapper title="How did you plan the dive?" required>
      <Dropdown
        item={DivePlanVariants[formData.dive.dive_plan]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            dive_plan: DivePlanVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={DivePlanVariants}
        width={570}
        error={error}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Dive table used for planning">
      <Dropdown
        item={TableUsedVariants[formData.dive.dive_plan_table]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            dive_plan_table: TableUsedVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={TableUsedVariants}
        width={570}
      />
    </FormItemWrapper>

    <FormItemWrapper title="State of rest before the dive">
      <Dropdown
        item={RestVariants[formData.dive.rest]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            rest: RestVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={RestVariants}
        width={570}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Number of alcoholic drinks before dive">
      <Input
        type="number"
        value={formData.dive.drinks || ''}
        setValue={(val) => setFormData({
          ...formData,
          dive: { ...formData.dive, drinks: val },
        })}
        height={48}
        width={570}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Exercise before the dive">
      <Dropdown
        item={ExerciseVariants[formData.dive.exercice]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            exercice: ExerciseVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={ExerciseVariants}
        width={570}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Medication taken before dive">
      <TextArea
        value={formData.dive.med_dive || ''}
        setValue={(val) => setFormData({
          ...formData,
          dive: { ...formData.dive, med_dive: val },
        })}
      />
    </FormItemWrapper>
  </CategoryWrapper>
);
