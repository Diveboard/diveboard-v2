import React, { FC, useRef, useState } from 'react';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { SetDropdownItem } from './SetDropdownItem';

import styles from './styles.module.scss';

type Props = {
  dropdownList: {
    id: number;
    title: string;
    svgItem: JSX.Element;
    onClick: React.Dispatch<React.SetStateAction<boolean>>; // setState popup modal
  }[];
  dropdownButtons: React.RefObject<HTMLDivElement>[];
  hideDropdown: (status: boolean) => void;
};

export const SetDropdown: FC<Props> = ({
  hideDropdown, dropdownList, dropdownButtons,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownButton, dropdownKebab] = dropdownButtons;

  const dropdownElements = dropdownList.map((item) => (
    <SetDropdownItem
      key={item.id}
      title={item.title}
      onClick={item.onClick}
      hideDropdown={hideDropdown}
    >
      {item.svgItem}
    </SetDropdownItem>
  ));

  const outsideClickHandler = (ev: Event): void => {
    const target = ev.target as HTMLElement;
    if (ev.target !== dropdownRef.current
      && !dropdownButton.current.contains(target) && !dropdownKebab.current.contains(target)) {
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
