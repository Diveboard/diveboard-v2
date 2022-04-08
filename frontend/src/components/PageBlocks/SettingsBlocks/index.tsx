import React, { FC } from 'react';
import styles from './styles.module.scss';

export const SettingsBlock: FC = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <h2 className={styles.title}>Settings</h2>
      {children}
    </div>
  </div>
);
