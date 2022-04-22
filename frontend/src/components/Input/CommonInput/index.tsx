import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Icon } from '../../Icons/Icon';

type Props = {
  padding?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  iconName?: string;
  disabled?:boolean
};

export const Input: FC<Props> = ({
  value,
  setValue,
  error,
  setError,
  placeholder,
  iconName,
  padding = `16px 16px 16px ${iconName ? '52px' : '16px'}`,
  disabled,
}) => {
  const getInputStyle = (errorValue: string) => {
    if (errorValue) {
      return `${styles.input} ${styles.error}`;
    }
    return styles.input;
  };

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          style={{ padding }}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (setError) {
              setError('');
            }
          }}
          className={getInputStyle(error)}
          placeholder={placeholder}
          disabled={disabled}
        />

        {iconName && (
        <div className={styles.icon}>
          <Icon iconName={iconName} />
        </div>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </>
  );
};
