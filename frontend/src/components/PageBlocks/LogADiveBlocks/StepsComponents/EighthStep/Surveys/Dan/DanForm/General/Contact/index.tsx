import React, { FC } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { FormPropsType, getFormProps } from '../../helpers/getFormProps';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { DanSurveyType } from '../../../../../../../../../../types';
import styles from '../../styles.module.scss';
import PhoneInput from '../../../../../../../../../Input/PhoneInput';

type Props = {
  contacts: DanSurveyType['contactInfo'];
  setFormData: React.Dispatch<React.SetStateAction<DanSurveyType>>
  error: FormErrorsType['phoneHome']
};

export const Contacts: FC<Props> = ({
  contacts,
  setFormData,
  error,
}) => {
  const {
    street,
    city,
    country,
    email,
    address,
    homePhone,
    workPhone,
    state,
    zipCode,
    language,
    citizenship,
  } = getFormProps('contactInfo', setFormData) as FormPropsType<'contacts'>;

  return (
    <CategoryWrapper title="Contact information">
      <FormItemWrapper title="Street address">
        <Input
          value={contacts.streetAddress}
          setValue={street.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Address complement">
        <Input
          value={contacts.addressComplement}
          setValue={address.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="City">
        <Input
          value={contacts.city}
          setValue={city.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <div className={styles.medicalGroup}>
        <FormItemWrapper title="State">
          <Input
            value={contacts.state}
            setValue={state.setItems}
            height={48}
            width={270}
          />
        </FormItemWrapper>

        <FormItemWrapper title="ZIP code">
          <Input
            value={contacts.zipCode}
            setValue={zipCode.setItems}
            height={48}
            width={140}
          />
        </FormItemWrapper>

      </div>

      <FormItemWrapper title="Country">
        <Input
          value={contacts.country}
          setValue={country.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Phone number (home)" required>
        <PhoneInput value={contacts.phoneHome} setValue={homePhone.setItems} error={error} />
      </FormItemWrapper>

      <FormItemWrapper title="Phone number (work)">
        <PhoneInput value={contacts.phoneWork} setValue={workPhone.setItems} />
      </FormItemWrapper>

      <FormItemWrapper title="Email">
        <Input
          value={contacts.email}
          setValue={email.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Primary language">
        <Input
          value={contacts.language}
          setValue={language.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Citizenship">
        <Input
          value={contacts.citizenship}
          setValue={citizenship.setItems}
          height={48}
          width={419}
        />
      </FormItemWrapper>
    </CategoryWrapper>
  );
};
