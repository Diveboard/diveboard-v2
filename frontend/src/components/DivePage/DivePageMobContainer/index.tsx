import React, { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
};

export const DivePageMobContainer: FC<Props> = ({ children }) => (
  <div className={styles.mobContainer}>
    { children}
  </div>
);
