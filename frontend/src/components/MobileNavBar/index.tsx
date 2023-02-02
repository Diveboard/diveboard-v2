import React, { FC } from 'react';
import pagesRoutes from '../../routes/pagesRoutes.json';
import styles from './styles.module.scss';
import { NavItem, NavType } from './NavItem';

type Props = {
  uid: string | null
};

export const MobileNavBar: FC<Props> = ({ uid }) => (
  <nav className={styles.navbar} id="navbar">
    <NavItem
      activeIconName="feed-mobile-colored"
      mainIconName="feed-mobile"
      navItemName="Feed"
      navLink={pagesRoutes.feedsPageRout as NavType}
    />

    <NavItem
      activeIconName="explore-mobile-colored"
      mainIconName="explore-mobile"
      navItemName="Explore"
      navLink={pagesRoutes.explorePageRout as NavType}
    />

    {uid && (
    <NavItem
      activeIconName="logbook-mobile-colored"
      mainIconName="logbook-mobile"
      navItemName="Logbook"
      navLink={`${pagesRoutes.logbookPageRoute}/${uid}` as NavType}
    />
    )}

    <NavItem
      activeIconName="wallet-mobile-colored"
      mainIconName="wallet-mobile"
      navItemName="Wallet"
      navLink={pagesRoutes.walletPageRout as NavType}
    />

    {!uid && (
    <NavItem
      activeIconName="login-mobile-colored"
      mainIconName="login-mobile"
      navItemName="LogIn"
      navLink={pagesRoutes.authPageRout as NavType}
    />
    )}

    {uid && (
      <NavItem
        activeIconName="favorites-mobile-colored"
        mainIconName="favorites-mobile"
        navItemName="Favorites"
        navLink={pagesRoutes.favouritesPageRout as NavType}
      />
    )}

  </nav>
);
