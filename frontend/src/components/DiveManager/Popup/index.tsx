import React, { FC, useEffect, useRef } from 'react';
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
  useEffect(() => {
    const setBodyOverflow = (style: string): string => document.body.style.overflow = style;
    if (document) {
      setBodyOverflow('hidden');
    }
    return () => setBodyOverflow('auto') as unknown as void;
  }, []);
  return (
    <div className={styles.popup} style={customStyles} ref={popupRef}>
      <span className={styles.cross} onClick={closePopup} />
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};
