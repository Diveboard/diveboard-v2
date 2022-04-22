import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '../Icons/Icon';
import pagesRoutes from '../../routes/pagesRoutes.json';
import styles from './styles.module.scss';

export const MobileNavBar = () => {
  const router = useRouter();

  const getItemStyles = (
    path: string,
    itemType: '/explore' | '/logbook' | '/wallet' | '/auth',
  ) => {
    if (path === itemType) {
      return `${styles.navItem} ${styles.coloredNavItem}`;
    }
    return `${styles.navItem} ${styles.notColoredNavItem} `;
  };

  return (
    <nav className={styles.navbar}>
      <Link href={pagesRoutes.explorePageRout}>
        <a className={getItemStyles(router.pathname, '/explore')}>
          {router.pathname === pagesRoutes.explorePageRout ? (
            <Icon iconName="explore-mobile-colored" />
          ) : (
            <Icon iconName="explore-mobile" />
          )}
          <span className={styles.navLabel}>Explore</span>
        </a>
      </Link>
      <Link href={pagesRoutes.logbookPageRout}>
        <a className={getItemStyles(router.pathname, '/logbook')}>
          {router.pathname === pagesRoutes.logbookPageRout ? (
            <Icon iconName="logbook-mobile-colored" />
          ) : (
            <Icon iconName="logbook-mobile" />
          )}
          <span className={styles.navLabel}>Logbook</span>
        </a>
      </Link>
      <Link href={pagesRoutes.walletPageRout}>
        <a className={getItemStyles(router.pathname, '/wallet')}>
          {router.pathname === pagesRoutes.walletPageRout ? (
            <Icon iconName="wallet-mobile-colored" />
          ) : (
            <Icon iconName="wallet-mobile" />
          )}
          <span className={styles.navLabel}>Wallet</span>
        </a>
      </Link>
      <Link href={pagesRoutes.authPageRout}>
        <a className={getItemStyles(router.pathname, '/auth')}>
          {router.pathname === pagesRoutes.authPageRout ? (
            <Icon iconName="login-mobile-colored" />
          ) : (
            <Icon iconName="login-mobile" />
          )}
          <span className={styles.navLabel}>LogIn</span>
        </a>
      </Link>
    </nav>
  );
};
