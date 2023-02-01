import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { SurveyDanType } from '../../../../../../../../../../types';
import { LevelVariants } from '../../initialDANFormState';

type Props = {
  formData: SurveyDanType;
  setFormData: React.Dispatch<React.SetStateAction<SurveyDanType>>;
};

export const Experience: FC<Props> = ({
  formData,
  setFormData,
}) => (
  <CategoryWrapper title="Diving Experience">
    <FormItemWrapper title="Diving license number">
      <Input
        value={formData.diver.license ? formData.diver.license[0] : ''}
        setValue={(val) => {
          const newLicense = formData.diver.license || ['', ''];
          newLicense[0] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              license: newLicense,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Diving license issuing agency">
      <Input
        value={formData.diver.license ? formData.diver.license[1] : ''}
        setValue={(val) => {
          const newLicense = formData.diver.license || ['', ''];
          newLicense[1] = val;
          return setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              license: newLicense,
            },
          });
        }}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="First date of certification">
      <Input
        type="date"
        value={formData.diver.first_certif ? `${formData.diver.first_certif.slice(0, 4)}-${formData.diver.first_certif.slice(4, 6)}-${formData.diver.first_certif.slice(6)}` : ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            first_certif: val.replaceAll('-', ''),
          },
        })}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Certification level">
      <Dropdown
        item={LevelVariants[formData.diver.certif_level]}
        setItem={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            certif_level: LevelVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={LevelVariants}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Approximate number of dives in the last 12 months">
      <Input
        type="number"
        value={formData.diver.dives_12m || ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: { ...formData.diver, dives_12m: val },
        })}
        height={48}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Approximate number of dives in the last 5 years">
      <Input
        type="number"
        value={formData.diver.dives_5y || ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: { ...formData.diver, dives_5y: val },
        })}
        height={48}
        width={419}
      />
    </FormItemWrapper>
  </CategoryWrapper>
);
