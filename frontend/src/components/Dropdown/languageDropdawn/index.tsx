import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { Icon } from '../../Icons/Icon';
import styles from './styles.module.scss';
import { DropdownItem } from './DropdownItems';

type Props = {
  currentItem: string
};

export const LanguageDropdown: FC<Props> = ({ currentItem = 'English' }) => {
  const languages = ['English', 'Italian', 'Spanish', 'German'];
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(currentItem);
  const [langItems, setLangItems] = useState(languages);

  useEffect(() => {
    const notSelectedLangs = languages.filter((item) => item !== lang);
    setLangItems(notSelectedLangs);
  }, [lang]);

  const dropdownRef = useRef(null);

  const outsideClickHandler = (ev: Event): void => {
    if (ev.target !== dropdownRef.current) {
      setOpen(false);
    }
  };
  useOutsideClick(outsideClickHandler, dropdownRef);

  const itemComponents = langItems.map((item) => (<DropdownItem text={item} onSelect={setLang} />));

  return (
    <div
      ref={dropdownRef}
      onClick={(): void => {
        setOpen(!open);
      }}
      className={styles.dropdownWrapper}
    >
      <div className={styles.dropdown}>
        <span>{lang}</span>
        <Icon iconName="dropdown-arrow" />
      </div>

      {open && (
        <div className={styles.itemsWrapper}>
          {itemComponents}
        </div>
      )}

    </div>
  );
};