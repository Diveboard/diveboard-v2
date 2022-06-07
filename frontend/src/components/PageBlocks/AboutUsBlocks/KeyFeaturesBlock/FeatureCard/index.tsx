import React, { FC } from 'react';
import { Icon } from '../../../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  iconName: string;
  title: string;
  description: string;
};

export const FeatureCard: FC<Props> = ({
  iconName,
  title,
  description,
}) => (
  <div className={styles.featureCard}>
    <div className={styles.header}>
      <div className={styles.iconWrapper}>
        <Icon iconName={iconName} size={40} />
      </div>
    </div>
    <div className={styles.cardBody}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);
