import React, {
  FC, useRef, useState,
} from 'react';
import styles from './style.module.scss';
import { LogbookDropdownItem } from './DropdownItem';
import { Icon } from '../../Icons/Icon';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { LogDive, ViewLogbook } from '../../Icons/IconSVGComponents';
import pageRoutes from '../../../routes/pagesRoutes.json';

export const LogbookDropdown: FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const outsideClickHandler = (ev: Event): void => {
    if (ev.target !== dropdownRef.current) {
      setOpen(false);
    }
  };

  useOutsideClick(outsideClickHandler, dropdownRef);

  return (
    <div
      ref={dropdownRef}
      onClick={(): void => {
        setOpen(!open);
      }}
      className={styles.dropdown}
    >
      <div className={styles.dropdownButton}>
        <Icon iconName="logbook" />
        <span className={styles.title}>Logbook</span>
        <Icon iconName="dropdown" size={10} />
      </div>

      {open && (
      <div className={styles.itemsWrapper}>
        <LogbookDropdownItem title="Log a New Dive" link={pageRoutes.logDivePageRout}>
          <LogDive />
        </LogbookDropdownItem>
        <LogbookDropdownItem title="View a Logbook" link="/">
          <ViewLogbook />
        </LogbookDropdownItem>
      </div>
      )}
    </div>
  );
};
