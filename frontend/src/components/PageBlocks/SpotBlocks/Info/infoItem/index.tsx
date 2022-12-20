import React, { FC } from 'react';
import { flag } from 'country-emoji';
import styles from './styles.module.scss';

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
        <span>{flag(country)}</span>
      </span>
    )}
    <span className={styles.value}>{value}</span>
  </div>
);
