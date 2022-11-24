import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string;
  notes?: string;
};

export const BlockWrapper:FC<Props> = ({ title, notes, children }) => (
  <div className={styles.blockWrapper}>
    <h3 className={styles.title}>{title}</h3>
    <span className={styles.notes}>{notes}</span>
    <div className={styles.content}>{children}</div>
  </div>
);
