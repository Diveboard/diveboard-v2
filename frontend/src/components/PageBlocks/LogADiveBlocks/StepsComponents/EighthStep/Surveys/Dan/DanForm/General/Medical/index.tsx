import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { Input } from '../../../../../../../../../Input/CommonInput';
import styles from '../../styles.module.scss';
import { TextArea } from '../../../../../../../../../Input/TextArea';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { SurveyDanType } from '../../../../../../../../../../types';
import {
  BooleanVariants, HeightVariants, WeightVariants,
} from '../../initialDANFormState';

type Props = {
  formData: SurveyDanType;
  setFormData: React.Dispatch<React.SetStateAction<SurveyDanType>>;
  errors: Pick<FormErrorsType
  , 'weight' | 'height' >
};

export const MedicalConditions: FC<Props> = ({
  formData,
  setFormData,
  errors,
}) => (
  <CategoryWrapper title="General medical condition">
    <FormItemWrapper title="Weight" required>
      <div className={styles.medicalGroup}>
        <Input
          type="number"
          value={formData.diver.weight ? formData.diver.weight[0] : ''}
          setValue={(val) => {
            const newWeight = formData.diver.weight || ['', ''];
            newWeight[0] = val;
            return setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                weight: newWeight,
              },
            });
          }}
          height={48}
          width={270}
          error={errors.weight}
        />

        <Dropdown
          item={formData.diver.weight ? WeightVariants[formData.diver.weight[1]] : ''}
          setItem={(val) => {
            const newWeight = formData.diver.weight || ['', ''];
            newWeight[1] = WeightVariants.findIndex((i) => i === val).toString();
            setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                weight: newWeight,
              },
            });
          }}
          allItems={WeightVariants}
          width={140}
        />

      </div>
    </FormItemWrapper>

    <FormItemWrapper title="Height" required>
      <div className={styles.medicalGroup}>
        <Input
          type="number"
          value={formData.diver.height ? formData.diver.height[0] : ''}
          setValue={(val) => {
            const newHeight = formData.diver.height || ['', ''];
            newHeight[0] = val;
            return setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                height: newHeight,
              },
            });
          }}
          height={48}
          width={270}
          error={errors.height}
        />

        <Dropdown
          item={formData.diver.height ? HeightVariants[formData.diver.height[1]] : ''}
          setItem={(val) => {
            const newHeight = formData.diver.height || ['', ''];
            newHeight[1] = HeightVariants.findIndex((i) => i === val).toString();
            setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                height: newHeight,
              },
            });
          }}
          allItems={HeightVariants}
          width={140}
        />

      </div>
    </FormItemWrapper>

    <FormItemWrapper title="Medical conditions">
      <TextArea
        value={formData.diver.conditions || ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: { ...formData.diver, conditions: val },
        })}
        height={116}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Medications">
      <TextArea
        value={formData.diver.medications || ''}
        setValue={(val) => setFormData({
          ...formData,
          diver: { ...formData.diver, medications: val },
        })}
        height={116}
        width={419}
      />
    </FormItemWrapper>

    <FormItemWrapper title="Smoking Cigarette">
      <Dropdown
        item={BooleanVariants[formData.diver.cigarette]}
        setItem={(val) => setFormData({
          ...formData,
          diver: {
            ...formData.diver,
            cigarette: BooleanVariants.findIndex((i) => i === val).toString(),
          },
        })}
        allItems={BooleanVariants}
        width={419}
      />
    </FormItemWrapper>

  </CategoryWrapper>
);
