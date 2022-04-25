import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '../Icons/Icon';
import pagesRouts from '../../routes/pagesRoutes.json';
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
      <Link href={pagesRouts.explorePageRout}>
        <a className={getItemStyles(router.pathname, '/explore')}>
          {router.pathname === pagesRouts.explorePageRout ? (
            <Icon iconName="explore-mobile-colored" />
          ) : (
            <Icon iconName="explore-mobile" />
          )}
          <span className={styles.navLabel}>Explore</span>
        </a>
      </Link>
      <Link href={pagesRouts.logbookPageRout}>
        <a className={getItemStyles(router.pathname, '/logbook')}>
          {router.pathname === pagesRouts.logbookPageRout ? (
            <Icon iconName="logbook-mobile-colored" />
          ) : (
            <Icon iconName="logbook-mobile" />
          )}
          <span className={styles.navLabel}>Logbook</span>
        </a>
      </Link>
      <Link href={pagesRouts.walletPageRout}>
        <a className={getItemStyles(router.pathname, '/wallet')}>
          {router.pathname === pagesRouts.walletPageRout ? (
            <Icon iconName="wallet-mobile-colored" />
          ) : (
            <Icon iconName="wallet-mobile" />
          )}
          <span className={styles.navLabel}>Wallet</span>
        </a>
      </Link>
      <Link href={pagesRouts.authPageRout}>
        <a className={getItemStyles(router.pathname, '/auth')}>
          {router.pathname === pagesRouts.authPageRout ? (
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
