import React from 'react';
import { Icon } from '../../Icons/Icon';

import styles from './styles.module.scss';

export const NoDive = () => (
  <div className={styles.nodive}>
    <h1 className={styles.title}>No dive</h1>
    <Icon iconName="diveboard-logo" size={50} />
  </div>
);
