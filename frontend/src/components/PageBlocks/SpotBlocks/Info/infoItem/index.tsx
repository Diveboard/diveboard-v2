import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Icon } from '../../../../Icons/Icon';

type Props = {
  value: string;
  name: string;
  country?: string;
};

export const InfoItem: FC<Props> = ({ value, name, country }) => (
  <div className={styles.item}>
    <span className={styles.name}>{name}</span>
    {country && (
      <span className={styles.country}>
        <Icon iconName={country} size={16} />
      </span>
    )}
    <span className={styles.value}>{value}</span>
  </div>
);
