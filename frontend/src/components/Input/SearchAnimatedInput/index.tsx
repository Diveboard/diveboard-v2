import React, { FC, useEffect, useState } from 'react';
import { Icon } from '../../Icons/Icon';
import styles from './styles.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchAnimatedInput: FC<Props> = ({
  value,
  setValue,
}) => {
  const isMobile = useWindowWidth(500, 768);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setOpened(true);
    }
  }, [isMobile]);

  useEffect(() => {
    // delay
    // filter
  }, [value]);

  const inputStyle = opened
    ? `${styles.input} ${styles.openedInput}`
    : `${styles.input} ${styles.closedInput}`;

  return (
    <div className={styles.inputWrapper}>
      <span
        onClick={() => {
          setOpened(false);
        }}
        className={styles.closeButton}
      >
        <Icon
          iconName="back-button"
          size={40}
        />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={inputStyle}
        placeholder="Sharm El Shaikh"
      />
      <span
        onClick={() => {
          setOpened(true);
        }}
        className={styles.searchButton}
      >
        <Icon iconName="search" size={24} />
      </span>

    </div>
  );
};
