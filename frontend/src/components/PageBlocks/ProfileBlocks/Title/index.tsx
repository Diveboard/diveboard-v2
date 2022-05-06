import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string;
};
export const Title:FC<Props> = ({ title }) => (
  <h2 className={styles.title}>{title}</h2>
);
