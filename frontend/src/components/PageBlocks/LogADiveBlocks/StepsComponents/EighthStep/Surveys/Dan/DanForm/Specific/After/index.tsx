import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { TextArea } from '../../../../../../../../../Input/TextArea';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { SurveyDanType } from '../../../../../../../../../../types';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { BooleanVariants, ExposeToAltitudeVariants, PurposeVariants } from '../../initialDANFormState';

type Props = {
  formData: SurveyDanType;
  setFormData: React.Dispatch<React.SetStateAction<SurveyDanType>>;
  errors: Pick<FormErrorsType
  , 'feelSymptoms' | 'exposeToAltitude'>
};

export const After: FC<Props> = ({
  formData,
  setFormData,
  errors,
}) => (
  <CategoryWrapper title="Within 48hrs after the dive">
    <FormItemWrapper title="Did you perceive any symptoms?" required>
      <Dropdown
        item={PurposeVariants[formData.dive.symptoms]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            symptoms: PurposeVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={PurposeVariants}
        width={570}
        error={errors.feelSymptoms}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Comments">
      <TextArea
        value={formData.dive.comments || ''}
        setValue={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            comments: val,
          },
        })}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Exposure to Altitude" required>
      <Dropdown
        item={ExposeToAltitudeVariants[formData.dive.altitude_exposure]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            altitude_exposure: ExposeToAltitudeVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={ExposeToAltitudeVariants}
        width={570}
        error={errors.exposeToAltitude}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Surface interval before altitude exposure">
      <Input
        type="number"
        value={formData.dive.altitude_interval || ''}
        setValue={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            altitude_interval: val.toString(),
          },
        })}
        height={48}
        width={570}
        placeholder="hrs"
      />
    </FormItemWrapper>

    <FormItemWrapper title="Date of flight">
      <Input
        type="date"
        value={formData.dive.altitude_date ? `${formData.dive.altitude_date.slice(0, 4)}-${formData.dive.altitude_date.slice(4, 6)}-${formData.dive.altitude_date.slice(6)}` : null}
        setValue={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            altitude_date: val.replaceAll('-', ''),
          },
        })}
        height={48}
        width={570}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Total length of exposure">
      <Input
        type="number"
        value={formData.dive.altitude_length || ''}
        setValue={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            altitude_length: val.toString(),
          },
        })}
        height={48}
        width={570}
        placeholder="hrs"
      />
    </FormItemWrapper>

    <FormItemWrapper title="Altitude of exposure">
      <Input
        type="number"
        value={formData.dive.altitude_value || ''}
        setValue={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            altitude_value: val.toString(),
          },
        })}
        height={48}
        width={570}
        placeholder="ft"
      />
    </FormItemWrapper>

    <FormItemWrapper title="Were you treated in hyperbaric chamber?">
      <Dropdown
        item={BooleanVariants[formData.dive.hyperbar]}
        setItem={(val) => setFormData({
          ...formData,
          dive: {
            ...formData.dive,
            hyperbar: BooleanVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={BooleanVariants}
        width={570}
      />
    </FormItemWrapper>
  </CategoryWrapper>
);
