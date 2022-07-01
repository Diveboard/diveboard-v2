import React, { FC } from 'react';
import Link from 'next/link';
import { MarginWrapper } from '../../../MarginWrapper';

import styles from './style.module.scss';

type Props = {
  title: string;
  link: string;
};
// it`s a kostyl for color icons
const classNameDefinition = (title: string) => (title === 'Print'
  || title === 'Export'
  || title === 'Edit Dive'
  || title === 'Copy Property'
  ? `${styles.stroke} ${styles.item}`
  : styles.item);

export const LogbookDropdownItem: FC<Props> = ({ title, link, children }) => (
  <Link href={link}>
    <a className={classNameDefinition(title)}>
      {children}
      <MarginWrapper left={8}>
        <span className={styles.title}>{title}</span>
      </MarginWrapper>
    </a>
  </Link>
);
