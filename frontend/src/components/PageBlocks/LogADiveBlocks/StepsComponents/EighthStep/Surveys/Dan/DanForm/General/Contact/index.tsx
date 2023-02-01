import React, { FC, useEffect, useState } from 'react';
import { CategoryWrapper } from '../../formWrappers/CategoryWrapper';
import { FormItemWrapper } from '../../formWrappers/FormItemWrapper';
import { Input } from '../../../../../../../../../Input/CommonInput';
import { FormErrorsType } from '../../helpers/useFormSubmit';
import { SurveyDanType } from '../../../../../../../../../../types';
import styles from '../../styles.module.scss';
import PhoneInput from '../../../../../../../../../Input/PhoneInput';

type Props = {
  formData: SurveyDanType;
  setFormData: React.Dispatch<React.SetStateAction<SurveyDanType>>;
  error: FormErrorsType['phoneHome']
};

export const Contacts: FC<Props> = ({
  formData,
  setFormData,
  error,
}) => {
  const [homeCode, setHomeCode] = useState(formData.diver.phone_home ? formData.diver.phone_home[0] : '');
  const [workCode, setWorkCode] = useState(formData.diver.phone_work ? formData.diver.phone_work[0] : '');

  useEffect(() => {
    const newPhoneHome = formData.diver.phone_home || ['', ''];
    newPhoneHome[0] = homeCode;
    setFormData({
      ...formData,
      diver: {
        ...formData.diver,
        phone_home: newPhoneHome,
      },
    });
  }, [homeCode]);

  useEffect(() => {
    const newPhoneWork = formData.diver.phone_work || ['', ''];
    newPhoneWork[0] = workCode;
    setFormData({
      ...formData,
      diver: {
        ...formData.diver,
        phone_work: newPhoneWork,
      },
    });
  }, [workCode]);

  return (
    <CategoryWrapper title="Contact information">
      <FormItemWrapper title="Street address">
        <Input
          value={formData.diver.address ? formData.diver.address[0] : ''}
          setValue={(val) => {
            const newAddress = formData.diver.address || ['', '', '', '', '', ''];
            newAddress[0] = val;
            return setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                address: newAddress,
              },
            });
          }}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Address complement">
        <Input
          value={formData.diver.address ? formData.diver.address[1] : ''}
          setValue={(val) => {
            const newAddress = formData.diver.address || ['', '', '', '', '', ''];
            newAddress[1] = val;
            return setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                address: newAddress,
              },
            });
          }}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="City">
        <Input
          value={formData.diver.address ? formData.diver.address[2] : ''}
          setValue={(val) => {
            const newAddress = formData.diver.address || ['', '', '', '', '', ''];
            newAddress[2] = val;
            return setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                address: newAddress,
              },
            });
          }}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <div className={styles.medicalGroup}>
        <FormItemWrapper title="State">
          <Input
            value={formData.diver.address ? formData.diver.address[3] : ''}
            setValue={(val) => {
              const newAddress = formData.diver.address || ['', '', '', '', '', ''];
              newAddress[3] = val;
              return setFormData({
                ...formData,
                diver: {
                  ...formData.diver,
                  address: newAddress,
                },
              });
            }}
            height={48}
            width={270}
          />
        </FormItemWrapper>

        <FormItemWrapper title="ZIP code">
          <Input
            value={formData.diver.address ? formData.diver.address[4] : ''}
            setValue={(val) => {
              const newAddress = formData.diver.address || ['', '', '', '', '', ''];
              newAddress[4] = val;
              return setFormData({
                ...formData,
                diver: {
                  ...formData.diver,
                  address: newAddress,
                },
              });
            }}
            height={48}
            width={140}
          />
        </FormItemWrapper>

      </div>

      <FormItemWrapper title="Country">
        <Input
          value={formData.diver.address ? formData.diver.address[5] : ''}
          setValue={(val) => {
            const newAddress = formData.diver.address || ['', '', '', '', '', ''];
            newAddress[5] = val;
            return setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                address: newAddress,
              },
            });
          }}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Phone number (home)" required>
        <PhoneInput
          value={formData.diver.phone_home ? `+${formData.diver.phone_home.join(' ')}` : ''}
          setCountryCode={setHomeCode}
          setValue={(val) => {
            setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                phone_home: [homeCode, val ? val.split(homeCode)[1] : ''],
              },
            });
          }}
          error={error}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Phone number (work)">
        <PhoneInput
          value={formData.diver.phone_work ? `+${formData.diver.phone_work.join(' ')}` : ''}
          setCountryCode={setWorkCode}
          setValue={(val) => {
            setFormData({
              ...formData,
              diver: {
                ...formData.diver,
                phone_work: [workCode, val ? val.split(workCode)[1] : ''],
              },
            });
          }}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Email">
        <Input
          value={formData.diver.email || ''}
          setValue={(val) => setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              email: val,
            },
          })}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Primary language">
        <Input
          value={formData.diver.language || ''}
          setValue={(val) => setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              language: val,
            },
          })}
          height={48}
          width={419}
        />
      </FormItemWrapper>

      <FormItemWrapper title="Citizenship">
        <Input
          value={formData.diver.citizenship || ''}
          setValue={(val) => setFormData({
            ...formData,
            diver: {
              ...formData.diver,
              citizenship: val,
            },
          })}
          height={48}
          width={419}
        />
      </FormItemWrapper>
    </CategoryWrapper>
  );
};
