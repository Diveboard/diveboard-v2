import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { FormPropsType, getFormProps } from '../../helpers/getFormProps';
import { TextArea } from '../../../../../../../../../Input/TextArea';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { DanSurveyType } from '../../../../../../../../../../types';
import { Input } from '../../../../../../../../../Input/CommonInput';

type Props = {
  after: DanSurveyType['afterDive'];
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>;
  errors: Pick<FormErrorsType
  , 'feelSymptoms' | 'exposeToAltitude'>
};

export const After: FC<Props> = ({
  after,
  setFormData,
  errors,
}) => {
  const {
    symptoms,
    exposeAltitude,
    treated,
    comments, altitudeOfExpose, hoursBeforeExposeAltitude, totalHours, dateOfFlight,
  } = getFormProps('afterDive', setFormData) as FormPropsType<'afterDive'>;

  return (
    <CategoryWrapper title="Within 48hrs after the dive">
      <FormItemWrapper title="Did you perceive any symptoms?" required>
        <Dropdown
          item={after.feelSymptoms}
          setItem={symptoms.setItems}
          allItems={symptoms.items}
          width={570}
          error={errors.feelSymptoms}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Comments">
        <TextArea
          value={after.comments}
          setValue={comments.setItems}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Exposure to Altitude" required>
        <Dropdown
          item={after.exposeToAltitude}
          setItem={exposeAltitude.setItems}
          allItems={exposeAltitude.items}
          width={570}
          error={errors.exposeToAltitude}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Surface interval before altitude exposure">
        <Input
          type="number"
          value={after.hoursBeforeExposeAltitude}
          setValue={hoursBeforeExposeAltitude.setItems}
          height={48}
          width={570}
          placeholder="hrs"
        />
      </FormItemWrapper>

      <FormItemWrapper title="Date of flight">
        <Input
          type="date"
          value={after.dateOfFlight}
          setValue={dateOfFlight.setItems}
          height={48}
          width={570}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Total length of exposure">
        <Input
          type="number"
          value={after.totalHoursOfExpose}
          setValue={totalHours.setItems}
          height={48}
          width={570}
          placeholder="hrs"
        />
      </FormItemWrapper>

      <FormItemWrapper title="Altitude of exposure">
        <Input
          type="number"
          value={after.altitudeOfExpose}
          setValue={altitudeOfExpose.setItems}
          height={48}
          width={570}
          placeholder="ft"
        />
      </FormItemWrapper>

      <FormItemWrapper title="Were you treated in hyperbaric chamber?">
        <Dropdown
          item={after.treatedInHyperbaricChamber}
          setItem={treated.setItems}
          allItems={treated.items}
          width={570}

        />
      </FormItemWrapper>
    </CategoryWrapper>
  );
};
