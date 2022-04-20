import React, { FC, useRef, useState } from 'react';
import styles from './style.module.scss';
import { LogbookDropdownItem } from './DropdownItem';
import { Icon } from '../../Icons/Icon';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { LogDive, ViewLogbook } from '../../Icons/IconSVGComponents';
import pageRoutes from '../../../routes/pagesRoutes.json';

const logbookItems = [
  {
    id: 1,
    svgItem: <LogDive />,
    title: 'Log a New Dive',
    link: pageRoutes.logDivePageRout,
  },
  {
    id: 2,
    svgItem: <ViewLogbook />,
    title: 'View a Logbook',
    link: pageRoutes.logbookPageRout,
  },
];

export const LogbookDropdown: FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const outsideClickHandler = (ev: Event): void => {
    if (ev.target !== dropdownRef.current) {
      setOpen(false);
    }
  };

  useOutsideClick(outsideClickHandler, dropdownRef);

  const dropdownElements = logbookItems.map((item) => (
    <LogbookDropdownItem key={item.id} title={item.title} link={item.link}>
      {item.svgItem}
    </LogbookDropdownItem>
  ));
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

      {open && <div className={styles.itemsWrapper}>{dropdownElements}</div>}
    </div>
  );
};
