import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  name: string;
  onChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Checkbox: FC<Props> = ({ name, onChecked, children }) => (
  <>
    <input
      className={styles.checkbox}
      type="checkbox"
      id={name}
      name={name}
      onChange={(e) => {
        onChecked(e.target.checked);
      }}
    />
    <label htmlFor={name}>
      {children}
      {' '}
    </label>
  </>
);
