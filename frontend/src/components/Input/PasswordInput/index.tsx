import React, { FC, useState } from 'react';
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
  disabled?:boolean;
};

export const PasswordInput: FC<Props> = ({
  value,
  setValue,
  error,
  setError,
  placeholder,
  iconName,
  padding = `16px 16px 16px ${iconName ? '52px' : '16px'}`,
  disabled,
}) => {
  const [show, setShow] = useState(false);
  const getInputStyle = (errorValue: string) => {
    if (errorValue) {
      return `${styles.input} ${styles.error}`;
    }
    return styles.input;
  };

  return (
    <div className={styles.inputWrapper}>
      {show ? (
        <input
          type="text"
          autoComplete="off"
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
      ) : (
        <input
          type="password"
          autoComplete="off"
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
      )}
      {error && <span className={styles.errorText}>{error}</span>}

      {iconName && (
        <div className={styles.icon}>
          <Icon iconName={iconName} />
        </div>
      )}
      <div className={styles.passwordIcon} onClick={() => { setShow(!show); }}>
        <Icon iconName={show ? 'hide' : 'show'} />
      </div>
    </div>
  );
};
