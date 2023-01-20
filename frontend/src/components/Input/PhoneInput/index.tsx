import React, { FC, useEffect, useState } from 'react';
import Phone, { getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { CountryCode } from 'libphonenumber-js/types';
import { FlagIco } from '../../Icons/FlagIco';
import { CountryDropDown } from './CountryDropDown';
import styles from './styles.module.scss';

type Props = {
  value: string;
  setValue: (val: string) => void;
  setCountryCode: (val: string) => void;
  error?: string;
};

export const PhoneInput: FC<Props> = ({
  value,
  setValue,
  error,
  setCountryCode,
}) => {
  const [countryValue, setCountryValue] = useState('');

  useEffect(() => {
    if (countryValue && value) {
      setValue('');
    }
    if (countryValue) {
      const code = getCountryCallingCode(countryValue as CountryCode);
      setCountryCode(code);
      setValue(`+${code}`);
    }
  }, [countryValue]);

  useEffect(() => {
    if (value) {
      const valid = isValidPhoneNumber(value);
      console.log({ valid });
    }
  }, [value]);

  return (
    <>
      <Phone
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
        className={!error ? styles.phone : `${styles.phone} ${styles.error}`}
        onCountryChange={(v) => v && setCountryCode(getCountryCallingCode(v))}
        countrySelectComponent={(data) => (
          <div className={styles.wrapper}>
            <FlagIco country={data.value || countryValue} />
            <CountryDropDown
              items={data.options}
              setItem={setCountryValue}
            />
          </div>
        )}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </>

  );
};

export default PhoneInput;
