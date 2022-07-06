import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  label: string;
};

export const InputLabelWrapper:FC<Props> = ({ label, children }) => (
  <div className={styles.wrapper}>
    <span className={styles.label}>
      {label}
    </span>
    {children}
  </div>
);
