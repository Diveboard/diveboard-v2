import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { Icon } from '../../Icons/Icon';
import { DropdownItem } from './DropdownItems';
import styles from './styles.module.scss';

type Props = {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  allItems: string[];
  width?: number
  height?: number;
  error?: string;
};

export const Dropdown: FC<Props> = ({
  item,
  setItem,
  allItems,
  width,
  height,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const notSelectedItems = allItems.filter((currentItem) => currentItem !== item);
    setItems(notSelectedItems);
  }, [item]);

  const dropdownRef = useRef(null);

  const outsideClickHandler = (ev: Event): void => {
    if (ev.target !== dropdownRef.current) {
      setOpen(false);
    }
  };
  useOutsideClick(outsideClickHandler, dropdownRef);

  const itemComponents = items
    .map((currentItem) => (
      <DropdownItem
        key={currentItem}
        text={currentItem}
        onSelect={
          setItem
        }
      />
    ));

  return (
    <>
      <div
        ref={dropdownRef}
        onClick={(): void => {
          setOpen(!open);
        }}
        className={!error ? styles.dropdownWrapper : `${styles.dropdownWrapper} ${styles.error}`}
        style={{ width: '100%', maxWidth: `${width}px` }}
      >
        <div className={styles.dropdown} style={{ width: '100%', maxWidth: `${width}px`, height: `${height}px` }}>
          <span>{item}</span>
          <Icon iconName="dropdown-arrow" />
        </div>

        {open && (
          <div className={styles.itemsWrapper}>
            {itemComponents}
          </div>
        )}
      </div>

      {error && <span className={styles.errorTextForm}>{error}</span>}
    </>

  );
};
