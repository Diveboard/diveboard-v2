import React, { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  title: string;
  className?: string;
};

const defindeClassName = (className?: string) => (className ? `${styles.title} ${styles[className]}}` : styles.title);

// eslint-disable-next-line max-len
export const DivePageTitle: FC<Props> = ({ title, className }) => <div className={defindeClassName(className)}>{title}</div>;
