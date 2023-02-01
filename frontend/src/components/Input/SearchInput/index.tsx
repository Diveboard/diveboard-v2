import React, { FC } from 'react';
import { Icon } from '../../Icons/Icon';
import { Input } from '../CommonInput';
import { useDebounce } from '../../../hooks/useDebounce';
import styles from './styles.module.scss';

type Props = {
  setQueryData: React.Dispatch<React.SetStateAction<string>>;
  ms: number;
  placeholder?: string;
  value: string;
  setValue: (val: string) => void;
};

export const SearchInput: FC<Props> = ({
  setQueryData,
  ms,
  placeholder,
  value,
  setValue,
}) => {
  useDebounce(value, setQueryData, ms);

  return (
    <div className={styles.searchInputWrapper}>
      <span className={styles.pointsIcon}>
        <Icon
          iconName="point-grey"
          size={24}
        />
      </span>
      <Input
        type="text"
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        height={48}
      />
      <span
        className={styles.searchButton}
      >
        <Icon iconName="search" size={24} />
      </span>
    </div>
  );
};
