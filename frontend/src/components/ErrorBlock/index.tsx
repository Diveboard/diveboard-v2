import React from 'react';
import styles from './styles.module.scss';
import { Icon } from '../Icons/Icon';

type Props = {
  text: string;
  subtitle?: string;
};

const ErrorBlock = ({ text, subtitle }: Props) => (
  <div className={styles.mainWrapper}>
    <div className={styles.blockWrapper}>
      <Icon iconName="diveboard-logo" size={100} />
      <h1 className={styles.h1Title}>
        {text}
      </h1>
      {subtitle && (
      <h2 className={styles.h2Title}>
        {subtitle}
      </h2>
      )}
    </div>
  </div>
);

export default ErrorBlock;
