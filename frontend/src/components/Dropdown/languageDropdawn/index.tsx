import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { Icon } from '../../Icons/Icon';
import styles from './styles.module.scss';
import { DropdownItem } from './DropdownItems';

type Props = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const LanguageDropdown: FC<Props> = ({ language, setLanguage }) => {
  const languages = ['English', 'Italian', 'Spanish', 'German'];
  const [open, setOpen] = useState(false);
  const [langItems, setLangItems] = useState(languages);

  useEffect(() => {
    const notSelectedLangs = languages.filter((item) => item !== language);
    setLangItems(notSelectedLangs);
  }, [language]);

  const dropdownRef = useRef(null);

  const outsideClickHandler = (ev: Event): void => {
    if (ev.target !== dropdownRef.current) {
      setOpen(false);
    }
  };
  useOutsideClick(outsideClickHandler, dropdownRef);

  const itemComponents = langItems
    .map((item) => (<DropdownItem text={item} onSelect={setLanguage} />));

  return (
    <div
      ref={dropdownRef}
      onClick={(): void => {
        setOpen(!open);
      }}
      className={styles.dropdownWrapper}
    >
      <div className={styles.dropdown}>
        <span>{language}</span>
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
