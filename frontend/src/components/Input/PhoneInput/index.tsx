import React, { FC, useEffect, useState } from 'react';
import Phone, { getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { CountryCode } from 'libphonenumber-js/types';
import { FlagIco } from '../../Icons/FlagIco';
import { CountryDropDown } from './CountryDropDown';
import styles from './styles.module.scss';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  height?: number;
  width?: number
};

export const PhoneInput: FC<Props> = ({
  value,
  setValue,
  error,
  setError,
  placeholder,
  height,
  width,
}) => {
  const i = 0;
  const [countryValue, setCountryValue] = useState('');

  console.log({
    setError,
    placeholder,
    height,
    width,
    i,
  });

  useEffect(() => {
    if (countryValue && value) {
      setValue('');
    }
    if (countryValue) {
      const code = getCountryCallingCode(countryValue as CountryCode);
      setValue(`+${code}`);
    }
  }, [countryValue]);

  useEffect(() => {
    const valid = isValidPhoneNumber(value);
    console.log({ valid });
  }, [value]);

  return (
    <>
      <Phone
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
        className={!error ? styles.phone : `${styles.phone} ${styles.error}`}
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
