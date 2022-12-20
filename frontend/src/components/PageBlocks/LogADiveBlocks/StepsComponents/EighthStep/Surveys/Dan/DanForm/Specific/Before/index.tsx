import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { FormPropsType, getFormProps } from '../../helpers/getFormProps';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { TextArea } from '../../../../../../../../../Input/TextArea';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { DanSurveyType } from '../../../../../../../../../../types';

type Props = {
  before: DanSurveyType['beforeDive'];
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>
  error: FormErrorsType['divePlan']
};

export const Before: FC<Props> = ({
  before,
  setFormData,
  error,
}) => {
  const {
    divePlan, diveTable, rest, drinks, exercise, medication,
  } = getFormProps('beforeDive', setFormData) as FormPropsType<'beforeDive'>;

  return (
    <CategoryWrapper title="Before the dive">
      <FormItemWrapper title="How did you plan the dive?" required>
        <Dropdown
          item={before.divePlan}
          setItem={divePlan.setItem}
          allItems={divePlan.items}
          width={570}
          error={error}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Dive table used for planning">
        <Dropdown
          item={before.tablesUsed}
          setItem={diveTable.setItems}
          allItems={diveTable.items}
          width={570}
        />
      </FormItemWrapper>

      <FormItemWrapper title="State of rest before the dive">
        <Dropdown
          item={before.rest}
          setItem={rest.setItems}
          allItems={rest.items}
          width={570}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Number of alcoholic drinks before dive">
        <Input
          type="number"
          value={before.drinks !== null ? before.drinks.toString() : ''}
          setValue={drinks.setItems}
          height={48}
          width={570}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Exercise before the dive">
        <Dropdown
          item={before.exercise}
          setItem={exercise.setItems}
          allItems={exercise.items}
          width={570}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Medication taken before dive">
        <TextArea value={before.medication} setValue={medication.setItems} />
      </FormItemWrapper>
    </CategoryWrapper>
  );
};
