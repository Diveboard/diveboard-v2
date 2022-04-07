import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  label:string;
  name:string;
  onCheck: React.Dispatch<React.SetStateAction<string>>
  checked:string;
};
export const RadioButton : FC<Props> = ({
  label, name, onCheck, checked,
}) => (
  <div>
    <input
      id={name}
      type="radio"
      name={name}
      onChange={() => {
        onCheck(name);
      }}
      checked={name === checked}
      className={styles.radio}
    />
    <label htmlFor={name} className={styles.label}>{label}</label>
  </div>
);
