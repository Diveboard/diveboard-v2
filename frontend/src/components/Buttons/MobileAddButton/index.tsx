import React, { FC } from 'react';
import Link from 'next/link';
import { Icon } from '../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  iconName: string;
  link?:string;
  onClick?: ()=>void
};

export const MobileAddButton: FC<Props> = ({ iconName, link, onClick }) => (
  <span className={styles.btnWrapper} onClick={onClick}>
    {link ? (
      <Link href={link}>
        <a className={styles.btn}>
          <Icon
            iconName={iconName}
            size={24}
          />
        </a>
      </Link>
    ) : (
      <span className={styles.btn}>
        <Icon
          iconName={iconName}
          size={24}
        />
      </span>
    )}
  </span>
);
