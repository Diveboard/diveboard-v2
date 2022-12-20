import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { FormPropsType, getFormProps } from '../../helpers/getFormProps';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { DanSurveyType } from '../../../../../../../../../../types';

type Props = {
  during: DanSurveyType['duringDive'];
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>;
  errors: Pick<FormErrorsType
  , 'environment' | 'platform' | 'thermal' | 'load' | 'decompression' | 'problems' | 'equipment'>

};

export const During: FC<Props> = ({
  during,
  setFormData,
  errors,
}) => {
  const {
    purpose, program, equipment, platform, thermal, load, decompression, problems, environment,
  } = getFormProps('duringDive', setFormData) as FormPropsType<'duringDive'>;

  return (
    <CategoryWrapper title="During the dive">
      <FormItemWrapper title="Purpose for this dive">
        <Dropdown
          item={during.purpose}
          setItem={purpose.setItems}
          allItems={purpose.items}
          width={570}

        />
      </FormItemWrapper>

      <FormItemWrapper title="Program">
        <Dropdown
          item={during.program}
          setItem={program.setItems}
          allItems={program.items}
          width={570}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Environment" required>
        <Dropdown
          item={during.environment}
          setItem={environment.setItems}
          allItems={environment.items}
          width={570}
          error={errors.environment}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Platform" required>
        <Dropdown
          item={during.platform}
          setItem={platform.setItems}
          allItems={platform.items}
          width={570}
          error={errors.platform}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Thermal Comfort" required>
        <Dropdown
          item={during.thermal}
          setItem={thermal.setItems}
          allItems={thermal.items}
          width={570}
          error={errors.thermal}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Workload during the dive" required>
        <Dropdown
          item={during.load}
          setItem={load.setItems}
          allItems={load.items}
          width={570}
          error={errors.load}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Decompression" required>
        <Dropdown
          item={during.decompression}
          setItem={decompression.setItems}
          allItems={decompression.items}
          width={570}
          error={errors.decompression}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Problem that occured during the dive" required>
        <Dropdown
          item={during.problems}
          setItem={problems.setItems}
          allItems={problems.items}
          width={570}
          error={errors.problems}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Equipment Malfunction" required>
        <Dropdown
          item={during.equipment}
          setItem={equipment.setItems}
          allItems={equipment.items}
          width={570}
          error={errors.equipment}
        />
      </FormItemWrapper>
    </CategoryWrapper>
  );
};
