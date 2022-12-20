import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { FormPropsType, getFormProps } from '../../helpers/getFormProps';
import { Input } from '../../../../../../../../../Input/CommonInput';
import styles from '../../styles.module.scss';
import { TextArea } from '../../../../../../../../../Input/TextArea';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { DanSurveyType } from '../../../../../../../../../../types';

type Props = {
  medical: DanSurveyType['medicalCondition'];
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>
  errors: Pick<FormErrorsType
  , 'weight' | 'height' >
};

export const MedicalConditions: FC<Props> = ({
  medical,
  setFormData,
  errors,
}) => {
  const {
    weight,
    height,
    medicalConditions,
    medications,
    cigarettes,
  } = getFormProps('medicalCondition', setFormData) as FormPropsType<'medical'>;

  return (
    <CategoryWrapper title="General medical condition">
      <FormItemWrapper title="Weight" required>
        <div className={styles.medicalGroup}>
          <Input
            type="number"
            value={medical.weight.value}
            setValue={
              (v) => {
                // @ts-ignore
                weight.setItems({ value: v, measures: medical.weight.measures });
              }
            }
            height={48}
            width={270}
            error={errors.weight}
          />

          <Dropdown
            item={medical.weight.measures}
            setItem={(v) => {
              // @ts-ignore
              weight.setItems({ value: medical.weight.value, measures: v });
            }}
            allItems={weight.items}
            width={140}
          />

        </div>
      </FormItemWrapper>

      <FormItemWrapper title="Height" required>
        <div className={styles.medicalGroup}>
          <Input
            type="number"
            value={medical.height.value}
            setValue={
              (v) => {
                // @ts-ignore
                height.setItems({ value: v, measures: medical.height.measures });
              }
            }
            height={48}
            width={270}
            error={errors.height}
          />

          <Dropdown
            item={medical.height.measures}
            setItem={(v) => {
              // @ts-ignore
              height.setItems({ value: medical.height.value, measures: v });
            }}
            allItems={height.items}
            width={140}
          />

        </div>
      </FormItemWrapper>

      <FormItemWrapper title="Medical conditions">
        <TextArea
          value={medical.conditions}
          setValue={medicalConditions.setItems}
          height={116}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Medications">
        <TextArea
          value={medical.medications}
          setValue={medications.setItems}
          height={116}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Smoking Cigarette">
        <Dropdown
          item={medical.cigarettes}
          setItem={cigarettes.setItems}
          allItems={cigarettes.items}
          width={419}
        />
      </FormItemWrapper>

    </CategoryWrapper>
  );
};
