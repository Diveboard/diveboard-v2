import React, {
  FC, useRef, useState,
} from 'react';
import { Icon } from '../../../Icons/Icon';
import { DropdownItem } from '../../../Dropdown/Dropdawn/DropdownItems';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import styles from './style.module.scss';
import { FlagIco } from '../../../Icons/FlagIco';

type Props = {
  items: { value: string, label: string }[]
  setItem: React.Dispatch<React.SetStateAction<string>>;
};

export const CountryDropDown: FC <Props> = ({ items, setItem }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const outsideClickHandler = (ev: Event): void => {
    if (ev.target !== dropdownRef.current) {
      setOpen(false);
    }
  };
  useOutsideClick(outsideClickHandler, dropdownRef);

  const countryItemsComponents = items
    .map(({ value, label }) => (
      <div className={styles.items}>
        <DropdownItem
          key={value}
          text={label}
          onSelect={() => { setItem(value); }}
          icon={<FlagIco country={value} size={16} />}
        />
      </div>

    ));

  return (
    <div ref={dropdownRef} onClick={() => { setOpen(!open); }} className={styles.countryDropdown}>
      <Icon iconName="dropdown-arrow" />
      {open && (
        <div className={styles.itemsWrapper}>
          {countryItemsComponents}
        </div>
      )}
    </div>
  );
};
