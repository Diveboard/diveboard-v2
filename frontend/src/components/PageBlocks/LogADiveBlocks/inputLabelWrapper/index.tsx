import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  label: string;
  full?:boolean;
};

export const InputLabelWrapper:FC<Props> = ({ label, full, children }) => {
  const style = !full ? `${styles.wrapper}` : `${styles.fullSizedContentWrapper}`;
  return (
    <div className={style}>
      <span className={styles.label}>
        {label}
      </span>
      {children}
    </div>
  );
};
