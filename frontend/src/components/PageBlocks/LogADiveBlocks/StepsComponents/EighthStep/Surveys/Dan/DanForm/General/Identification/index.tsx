import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { SurveyDanType } from '../../../../../../../../../../types';
import { SexVariants } from '../../initialDANFormState';

type Props = {
  formData: SurveyDanType;
  setFormData: React.Dispatch<React.SetStateAction<SurveyDanType>>;
  errors: Pick<FormErrorsType
  , 'familyName' | 'givenName' | 'sex' | 'birth'>
};

export const Identification: FC<Props> = ({
  formData,
  setFormData,
  errors,
}) => (
  <CategoryWrapper title="Diver identification">
    <FormItemWrapper title="DAN Project Dive Exploration ID">
      <Input
        value={formData.diver.dan_pde_id || ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            dan_pde_id: val,
          },
        })}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="DAN member ID">
      <Input
        value={formData.diver.dan_id || ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            dan_id: val,
          },
        })}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Family name" required>
      <Input
        value={formData.diver.name ? formData.diver.name[0] : ''}
        setValue={(val) => {
          const newName = formData.diver.name || ['', '', '', '', '', ''];
          newName[0] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              name: newName,
            },
          });
        }}
        height={48}
        width={419}
        error={errors.familyName}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Given name" required>
      <Input
        value={formData.diver.name ? formData.diver.name[1] : ''}
        setValue={(val) => {
          const newName = formData.diver.name || ['', '', '', '', '', ''];
          newName[1] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              name: newName,
            },
          });
        }}
        height={48}
        width={419}
        error={errors.givenName}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Middle name">
      <Input
        value={formData.diver.name ? formData.diver.name[2] : ''}
        setValue={(val) => {
          const newName = formData.diver.name || ['', '', '', '', '', ''];
          newName[2] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              name: newName,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Suffix">
      <Input
        value={formData.diver.name ? formData.diver.name[3] : ''}
        setValue={(val) => {
          const newName = formData.diver.name || ['', '', '', '', '', ''];
          newName[3] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              name: newName,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Prefix">
      <Input
        value={formData.diver.name ? formData.diver.name[4] : ''}
        setValue={(val) => {
          const newName = formData.diver.name || ['', '', '', '', '', ''];
          newName[4] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              name: newName,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Degree">
      <Input
        value={formData.diver.name ? formData.diver.name[5] : ''}
        setValue={(val) => {
          const newName = formData.diver.name || ['', '', '', '', '', ''];
          newName[5] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              name: newName,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Alias">
      <Input
        value={formData.diver.alias || ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            alias: val,
          },
        })}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Mother's maiden name">
      <Input
        value={formData.diver.mother || ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            mother: val,
          },
        })}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Sex" required>
      <Dropdown
        item={SexVariants[formData.diver.sex]}
        setItem={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            sex: SexVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={SexVariants}
        width={419}
        error={errors.sex}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Date of birth" required>
      <Input
        type="date"
        value={formData.diver.birthday ? `${formData.diver.birthday.slice(0, 4)}-${formData.diver.birthday.slice(4, 6)}-${formData.diver.birthday.slice(6)}` : ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            birthday: val.replaceAll('-', ''),
          },
        })}
        height={48}
        width={419}
        error={errors.birth}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Birthplace city">
      <Input
        value={formData.diver.birthplace ? formData.diver.birthplace[0] : ''}
        setValue={(val) => {
          const newBirthplace = formData.diver.birthplace || ['', '', ''];
          newBirthplace[0] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              birthplace: newBirthplace,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Birthplace region">
      <Input
        value={formData.diver.birthplace ? formData.diver.birthplace[1] : ''}
        setValue={(val) => {
          const newBirthplace = formData.diver.birthplace || ['', '', ''];
          newBirthplace[1] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              birthplace: newBirthplace,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Birthplace country">
      <Input
        value={formData.diver.birthplace ? formData.diver.birthplace[2] : ''}
        setValue={(val) => {
          const newBirthplace = formData.diver.birthplace || ['', '', ''];
          newBirthplace[2] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              birthplace: newBirthplace,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>
  </CategoryWrapper>
);
