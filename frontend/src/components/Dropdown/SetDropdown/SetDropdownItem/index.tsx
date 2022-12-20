import React, { FC } from 'react';
import { MarginWrapper } from '../../../MarginWrapper';

import styles from './styles.module.scss';

type Props = {
  title: string;
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
  hideDropdown?: (status: boolean) => void;
  showBackdrop: (status: boolean) => void;
};
// it`s a kostyl for color icons
const classNameDefinition = (title: string) => (title === 'Print' || title === 'Export' || title === 'Edit Dive' || title === 'Copy Property'
  ? `${styles.stroke} ${styles.item}`
  : styles.item);

export const SetDropdownItem: FC<Props> = ({
  title, children, onClick, hideDropdown, showBackdrop,
}) => {
  const handleClick = () => {
    onClick(true);
    hideDropdown(false);
    if (title !== 'Edit Dive' && title !== 'Paste properties') {
      showBackdrop(true);
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <a className={classNameDefinition(title)} onClick={handleClick}>
      {children}
      <MarginWrapper left={8}>
        <span className={styles.title}>{title}</span>
      </MarginWrapper>
    </a>
  );
};
