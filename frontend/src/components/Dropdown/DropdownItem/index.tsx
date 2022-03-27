import React, { FC } from 'react';
import Link from 'next/link';
import { MarginWrapper } from '../../MarginWrapper';

import styles from './style.module.scss';

type Props = {
  title: string;
  link: string;
};

export const DropdownItem: FC<Props> = ({ title, link, children }) => (
  <Link href={link}>
    <a className={styles.item}>
      {children}
      <MarginWrapper left={8}>
        <span className={styles.title}>{title}</span>
      </MarginWrapper>
    </a>
  </Link>
);
