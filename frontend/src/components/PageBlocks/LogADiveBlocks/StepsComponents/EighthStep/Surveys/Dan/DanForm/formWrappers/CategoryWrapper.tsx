import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string;
};

export const CategoryWrapper:FC<Props> = ({ title, children }) => (
  <div className={styles.categoryWrapper}>
    <span className={styles.title}>{title}</span>
    <div className={styles.content}>{children}</div>
  </div>
);
