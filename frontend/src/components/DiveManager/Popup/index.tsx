import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  closePopup: () => void;
  title: string,
  children?: React.ReactNode;
};

/**
 * wrapper for popups
 * @param param0 Popup dive manager
 * @returns
 */
export const Popup: FC<Props> = ({ children, closePopup, title }) => (
  <div className={styles.popup}>
    <span className={styles.cross} onClick={closePopup} />
    <div className={styles.title}>{title}</div>
    {children}
  </div>
);
