import React, { FC } from 'react';
import Link from 'next/link';
import { Icon } from '../../Icon';
import pagesRouts from '../../../../routes/pagesRouts.json';
import styles from './styles.module.scss';

type Props = {
  filled?: boolean;
};

export const LogoMobile: FC<Props> = ({ filled = true }) => {
  const logoStyle = filled ? styles.filled : styles.notFilled;
  return (
    <div className={styles.logo}>
      <Link href={pagesRouts.mainPageRout}>
        <a className={logoStyle}>
          <Icon iconName="logo" width={120} height={17} />
        </a>
      </Link>
    </div>
  );
};
