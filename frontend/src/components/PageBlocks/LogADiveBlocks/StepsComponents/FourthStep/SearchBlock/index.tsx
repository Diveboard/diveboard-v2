import React, { FC, useRef, useState } from 'react';

import { useOutsideClick } from '../../../../../../hooks/useOutsideClick';
import KebabButton from '../../../../../Buttons/KebabButton';
import { Icon } from '../../../../../Icons/Icon';

import styles from './styles.module.scss';

export const Search: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isValid, setValid] = useState(true);
  const formArea = useRef(null);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchValue.length < 3) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  // checking if the field is empty again and the click is out of search field
  const ifClickOutside = (ev: Event): void => {
    if (ev.target !== formArea.current && searchValue.length === 0) {
      setValid(true);
    }
  };

  useOutsideClick(ifClickOutside, formArea);

  return (
    <form className={styles.search} onSubmit={searchHandler} ref={formArea}>
      <input
        type="text"
        value={searchValue}
        onChange={onChangeHandler}
        className={
          isValid ? styles.searchInput : `${styles.searchInput} ${styles.error}`
        }
        placeholder="Spieces name"
      />
      <KebabButton className="search" type="submit">
        <Icon iconName="search" width={24} height={24} />
        <span>Search</span>
      </KebabButton>
      {!isValid && (
        <div className={styles.errorText}>
          The search term must be at least 3 characters
        </div>
      )}
    </form>
  );
};
