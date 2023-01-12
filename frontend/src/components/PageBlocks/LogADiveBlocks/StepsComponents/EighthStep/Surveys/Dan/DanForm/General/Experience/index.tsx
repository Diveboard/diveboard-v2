import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Dropdown } from '../../../../../../../../../Dropdown/Dropdawn';
import { FormPropsType, getFormProps } from '../../helpers/getFormProps';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { DanSurveyType } from '../../../../../../../../../../types';

type Props = {
  experience: DanSurveyType['divingExperience'];
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>
};

export const Experience: FC<Props> = ({
  experience,
  setFormData,
}) => {
  const {
    licence, certificationDate, fiveYearsDives, yearDives, level, agency,
  } = getFormProps('divingExperience', setFormData) as FormPropsType<'experience'>;

  return (
    <CategoryWrapper title="Diving Experience">
      <FormItemWrapper title="Diving license number">
        <Input
          value={experience.license}
          setValue={licence.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Diving license issuing agency">
        <Input
          value={experience.issueAgency}
          setValue={agency.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="First date of certification">
        <Input
          type="date"
          value={experience.firstDateOfCertification}
          setValue={certificationDate.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Certification level">
        <Dropdown
          item={experience.level}
          setItem={level.setItems}
          allItems={level.items}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Approximate number of dives in the last 12 months">
        <Input
          type="number"
          value={experience.numberOfDivesInYear}
          setValue={yearDives.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Approximate number of dives in the last 5 years">
        <Input
          type="number"
          value={experience.numberOfDivesInFiveYears}
          setValue={fiveYearsDives.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>
    </CategoryWrapper>
  );
};
