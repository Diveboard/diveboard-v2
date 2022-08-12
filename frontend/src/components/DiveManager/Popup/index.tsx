import React, { FC } from 'react';
import { Properties } from 'csstype';
import styles from './styles.module.scss';

type Props = {
  closePopup: () => void;
  title?: string,
  children?: React.ReactNode;
  customStyles?: Properties<string | number, string & {}>;
};

/**
 * wrapper for popups
 * @param param0 Popup dive manager
 * @returns
 */
export const Popup: FC<Props> = ({
  children, closePopup, title, customStyles,
}) => (
  <div className={styles.popup} style={customStyles}>
    <span className={styles.cross} onClick={closePopup} />
    {title && <div className={styles.title}>{title}</div>}
    {children}
  </div>
);
