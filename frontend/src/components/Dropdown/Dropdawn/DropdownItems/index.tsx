import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  text: string
  onSelect: React.Dispatch<React.SetStateAction<string>>
  icon?: JSX.Element;
};

export const DropdownItem: FC<Props> = ({
  text,
  onSelect,
  icon,
}) => (
  <div
    className={styles.item}
    onClick={() => {
      onSelect(text);
    }}
  >
    <span>
      {text}
    </span>
    {icon && <span>{icon}</span>}
  </div>
);
