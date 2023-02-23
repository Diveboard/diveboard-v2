import React, { FC, useContext } from 'react';
import Link from 'next/link';
import { Icon } from '../../Icon';
import pagesRoutes from '../../../../routes/pagesRoutes.json';
import styles from './styles.module.scss';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';

type Props = {
  filled?: boolean;
};

export const LogoMobile: FC<Props> = ({ filled = true }) => {
  const logoStyle = filled ? styles.filled : styles.notFilled;
  const {
    userAuth,
  } = useContext(AuthStatusContext);
  return (
    <div className={styles.logo}>
      <Link href={!userAuth?.uid ? pagesRoutes.mainPageRoute : pagesRoutes.donatePageRoute}>
        <a className={!userAuth?.uid ? logoStyle : styles.logoBtn}>
          {!userAuth?.uid
            ? <Icon iconName="logo" width={120} height={17} />
            : <span>Donate</span>}
        </a>
      </Link>
    </div>
  );
};
