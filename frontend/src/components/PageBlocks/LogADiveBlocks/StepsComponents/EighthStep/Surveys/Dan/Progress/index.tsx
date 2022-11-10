import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  progress: number
};

export const Progress:FC<Props> = ({ progress }) => (
  <div className={styles.progressWrapper}>
    <div className={styles.progress}>
      <div className={styles.progressLine} style={{ width: `${progress}%` }} />
    </div>
    <span className={styles.progressLabel}>
      {progress}
      %
    </span>
  </div>
);
