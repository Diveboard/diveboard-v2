import React, { FC, useContext } from 'react';
import Link from 'next/link';
import { Icon } from '../../Icon';
import styles from './styles.module.scss';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';

type Props = {
  filled?: boolean;
  size?: 'large' | 'medium';
};

export const Logo: FC<Props> = ({ filled = true, size = 'large' }) => {
  const logoStyle = filled ? styles.filled : styles.notFilled;
  const logoSize = size === 'large'
    ? `${styles.logo} ${styles.large}`
    : `${styles.logo} ${styles.medium}`;

  const {
    userAuth,
  } = useContext(AuthStatusContext);

  return (
    <div className={logoSize}>
      <Link href={userAuth?.uid ? `/logbook/${userAuth.uid}` : '/main/home-guest'}>
        <a className={logoStyle}>
          <Icon
            iconName="logo"
            width={size === 'large' ? 203 : 150}
            height={size === 'large' ? 29 : 20}
          />
        </a>
      </Link>
    </div>
  );
};
