import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  label: string;
  mode?:'full' | 'half' | 'common';
};

export const InputLabelWrapper:FC<Props> = ({ label, mode, children }) => {
  const getMode = (currentMode: typeof mode) => {
    switch (currentMode) {
      case 'common':
        return styles.wrapper;
      case 'full':
        return styles.fullSizedContentWrapper;
      case 'half':
        return styles.halfSizedContentWrapper;
      default: return styles.wrapper;
    }
  };
  const style = getMode(mode);
  return (
    <div className={style}>
      <span className={styles.label}>
        {label}
      </span>
      {children}
    </div>
  );
};
