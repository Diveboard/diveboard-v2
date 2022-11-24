import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { FormPropsType, getFormProps } from '../../helpers/getFormProps';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { DanSurveyType } from '../../../../../../../../../../types';

type Props = {
  identification: DanSurveyType['identification'];
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>
  errors: Pick<FormErrorsType
  , 'familyName' | 'givenName' | 'sex' | 'birth'>
};

export const Identification: FC<Props> = ({
  identification,
  setFormData,
  errors,
}) => {
  const {
    projectId,
    birthDate,
    cityBirth,
    countryBirth,
    regionBirth,
    degree,
    sex,
    familyName,
    givenName,
    middleName,
    mothersMaidenName,
    prefix,
    suffix,
    memberId,
    alias,
  } = getFormProps('identification', setFormData) as FormPropsType<'identification'>;

  return (
    <CategoryWrapper title="Diver identification">
      <FormItemWrapper title="DAN Project Dive Exploration ID">
        <Input
          value={identification.DANProjectDiveExplorationID}
          setValue={projectId.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="DAN member ID">
        <Input
          value={identification.DANMemberID}
          setValue={memberId.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Family name" required>
        <Input
          value={identification.familyName}
          setValue={familyName.setItems}
          height={48}
          width={419}
          error={errors.familyName}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Given name" required>
        <Input
          value={identification.givenName}
          setValue={givenName.setItems}
          height={48}
          width={419}
          error={errors.givenName}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Middle name">
        <Input
          value={identification.middleName}
          setValue={middleName.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Suffix">
        <Input
          value={identification.suffix}
          setValue={suffix.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Prefix">
        <Input
          value={identification.prefix}
          setValue={prefix.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Degree">
        <Input
          value={identification.degree}
          setValue={degree.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Alias">
        <Input
          value={identification.alias}
          setValue={alias.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Mother's maiden name">
        <Input
          value={identification.mothersMaidenName}
          setValue={mothersMaidenName.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Sex" required>
        <Dropdown
          item={identification.sex}
          setItem={sex.setItems}
          allItems={sex.items}
          width={419}
          error={errors.sex}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Date of birth" required>
        <Input
          type="date"
          value={identification.birth}
          setValue={birthDate.setItems}
          height={48}
          width={419}
          error={errors.birth}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Birthplace city">
        <Input
          value={identification.birthplaceCity}
          setValue={cityBirth.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Birthplace region">
        <Input
          value={identification.birthplaceRegion}
          setValue={regionBirth.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Birthplace country">
        <Input
          value={identification.birthplaceCountry}
          setValue={countryBirth.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>
    </CategoryWrapper>
  );
};
