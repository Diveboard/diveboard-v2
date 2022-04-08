import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  name: string;
  onChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
};

export const Checkbox: FC<Props> = ({
  name,
  onChecked,
  checked,
  children,
}) => (
  <div className={styles.checkboxWrapper}>
    <input
      className={styles.checkbox}
      type="checkbox"
      id={name}
      name={name}
      onChange={(e) => {
        onChecked(e.target.checked);
      }}
      checked={checked}
    />
    <label htmlFor={name} className={styles.label}>
      {children}
    </label>
  </div>
);
