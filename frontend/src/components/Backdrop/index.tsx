import React, { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
};

export const Backdrop: FC<Props> = ({ children }) => (
  <div className={styles.backdrop}>{children}</div>
);
