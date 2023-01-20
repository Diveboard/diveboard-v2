import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { SurveyDanType } from '../../../../../../../../../../types';
import {
  DecompressionVariants,
  EnvironmentVariants,
  EquipmentVariants,
  LoadVariants,
  PlatformVariants, ProblemsVariants,
  ProgramVariants,
  PurposeVariants,
  ThermalVariants,
} from '../../initialDANFormState';

type Props = {
  formData: SurveyDanType;
  setFormData: React.Dispatch<React.SetStateAction<SurveyDanType>>;
  errors: Pick<FormErrorsType
  , 'environment' | 'platform' | 'thermal' | 'load' | 'decompression' | 'problems' | 'equipment'>

};

export const During: FC<Props> = ({
  formData,
  setFormData,
  errors,
}) => (
  <CategoryWrapper title="During the dive">
    <FormItemWrapper title="Purpose for this dive">
      <Dropdown
        item={PurposeVariants[formData.dive.purpose]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            purpose: PurposeVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={PurposeVariants}
        width={570}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Program">
      <Dropdown
        item={ProgramVariants[formData.dive.program]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            program: ProgramVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={ProgramVariants}
        width={570}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Environment" required>
      <Dropdown
        item={EnvironmentVariants[formData.dive.environment]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            environment: EnvironmentVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={EnvironmentVariants}
        width={570}
        error={errors.environment}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Platform" required>
      <Dropdown
        item={PlatformVariants[formData.dive.platform]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            platform: PlatformVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={PlatformVariants}
        width={570}
        error={errors.platform}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Thermal Comfort" required>
      <Dropdown
        item={ThermalVariants[formData.dive.thermal_confort]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            thermal_confort: ThermalVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={ThermalVariants}
        width={570}
        error={errors.thermal}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Workload during the dive" required>
      <Dropdown
        item={LoadVariants[formData.dive.workload]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            workload: LoadVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={LoadVariants}
        width={570}
        error={errors.load}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Decompression" required>
      <Dropdown
        item={DecompressionVariants[formData.dive.decompression]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            decompression: DecompressionVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={DecompressionVariants}
        width={570}
        error={errors.decompression}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Problem that occured during the dive" required>
      <Dropdown
        item={ProblemsVariants[formData.dive.problems]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            problems: ProblemsVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={ProblemsVariants}
        width={570}
        error={errors.problems}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Equipment Malfunction" required>
      <Dropdown
        item={EquipmentVariants[formData.dive.malfunction]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            malfunction: EquipmentVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={EquipmentVariants}
        width={570}
        error={errors.equipment}
      />
    </FormItemWrapper>
  </CategoryWrapper>
);
