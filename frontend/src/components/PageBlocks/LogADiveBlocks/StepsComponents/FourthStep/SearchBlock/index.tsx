import React, { FC, useState } from 'react';

import KebabButton from '../../../../../Buttons/KebabButton';
import { Icon } from '../../../../../Icons/Icon';

import styles from './styles.module.scss';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onClick: (searchedValue: string)=>void;
};

export const Search: FC<Props> = ({ value, setValue, onClick }) => {
  const [error, setError] = useState(false);
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        className={
          !error ? styles.searchInput : `${styles.searchInput}  ${styles.error}`
        }
        placeholder="Spieces name"
      />
      <KebabButton
        className="search"
        type="submit"
        onClick={() => {
          value.length >= 3 ? onClick(value) : setError(true);
        }}
      >
        <Icon iconName="search" width={24} height={24} />
        <span>Search</span>
      </KebabButton>
      {error && <span className={styles.errorText}>type more than 2 letters</span>}
    </div>
  );
};
