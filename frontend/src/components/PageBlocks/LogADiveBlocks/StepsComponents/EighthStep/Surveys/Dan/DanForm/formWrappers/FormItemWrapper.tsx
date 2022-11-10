import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  title:string;
  required?: boolean;
};

export const FormItemWrapper:FC<Props> = ({ title, required, children }) => (
  <div className={styles.formItemWrapper}>
    <span className={styles.title}>{title}</span>
    {required && (
    <span className={styles.required}>
      {' '}
      *
    </span>
    )}
    <div className={styles.content}>{children}</div>
  </div>
);
