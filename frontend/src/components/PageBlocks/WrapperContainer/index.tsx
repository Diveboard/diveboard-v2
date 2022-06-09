import React, { FC } from 'react';
import styles from './styles.module.scss';

export const WrapperContainer:FC = ({ children }) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);
