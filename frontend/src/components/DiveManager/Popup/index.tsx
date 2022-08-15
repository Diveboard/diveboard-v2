import React, { FC, useRef } from 'react';
import { Properties } from 'csstype';
import styles from './styles.module.scss';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

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
}) => {
  const popupRef = useRef();
  useOutsideClick(closePopup, popupRef);
  return (
    <div className={styles.popup} style={customStyles} ref={popupRef}>
      <span className={styles.cross} onClick={closePopup} />
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};
