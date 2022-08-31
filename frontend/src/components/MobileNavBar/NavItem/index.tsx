import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '../../Icons/Icon';
import styles from '../styles.module.scss';

export type NavType = 'feed' | '/explore' | '/logbook' | '/wallet' | '/auth' | 'favourites';

const getItemStyles = (
  path: string,
  itemType: NavType,
) => {
  if (path === itemType) {
    return `${styles.navItem} ${styles.coloredNavItem}`;
  }
  return `${styles.navItem} ${styles.notColoredNavItem} `;
};

type Props = {
  mainIconName: string;
  activeIconName: string;
  navItemName: string;
  navLink: NavType;
};

export const NavItem: FC<Props> = ({
  mainIconName,
  activeIconName,
  navItemName,
  navLink,
}) => {
  const router = useRouter();

  return (
    <Link href={navLink}>
      <a className={getItemStyles(router.pathname, navLink)}>
        {router.pathname === navLink ? (
          <Icon iconName={activeIconName} />
        ) : (
          <Icon iconName={mainIconName} />
        )}
        <span className={styles.navLabel}>{navItemName}</span>
      </a>
    </Link>
  );
};
