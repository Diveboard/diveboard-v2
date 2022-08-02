import React, {
  FC, useState,
} from 'react';
import { Icon } from '../../Icons/Icon';
import { Input } from '../CommonInput';
import { useDebounce } from '../../../hooks/useDebounce';
import styles from './styles.module.scss';

type Props = {
  setQueryData: React.Dispatch<React.SetStateAction<string>>;
  ms: number;
  placeholder?: string;
};

export const SearchInput: FC<Props> = ({
  setQueryData,
  ms,
  placeholder,
}) => {
  const [value, setValue] = useState('');
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
        setValue={(val) => {
          setValue(val);
        }}
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
