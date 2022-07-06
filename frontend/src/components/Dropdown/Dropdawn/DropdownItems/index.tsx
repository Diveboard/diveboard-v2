import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  text: string
  onSelect: React.Dispatch<React.SetStateAction<string>>
};

export const DropdownItem: FC<Props> = ({ text, onSelect }) => (
  <div
    className={styles.item}
    onClick={() => {
      onSelect(text);
    }}
  >
    <span>
      {text}
    </span>
  </div>
);
