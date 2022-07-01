import React, { FC, useRef, useState } from 'react';
import { LogbookDropdownItem } from '../LogbookDropdown/DropdownItem';

import styles from './styles.module.scss';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

type Props = {
  dropdownList: {
    id: number;
    title: string;
    link: string;
    svgItem: JSX.Element;
  }[];
  dropdownButton: React.RefObject<HTMLDivElement>;
  hideDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SetDropdown: FC<Props> = ({
  hideDropdown,
  dropdownButton,
  dropdownList,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownElements = dropdownList.map((item) => (
    <LogbookDropdownItem key={item.id} title={item.title} link={item.link}>
      {item.svgItem}
    </LogbookDropdownItem>
  ));
  const outsideClickHandler = (ev: Event): void => {
    const target = ev.target as HTMLElement;
    if (
      ev.target !== dropdownRef.current &&
      !dropdownButton.current.contains(target)
    ) {
      hideDropdown(false);
    }
  };
  useOutsideClick(outsideClickHandler, dropdownRef);

  return (
    <div
      ref={dropdownRef}
      onClick={(): void => {
        setOpen(!open);
      }}
      className={styles.itemsWrapper}
    >
      {dropdownElements}
    </div>
  );
};
