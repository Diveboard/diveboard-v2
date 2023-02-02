import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useScroll } from '../../../../hooks/useScroll';
import { LogbookDropdown } from '../../../Dropdown/LogbookDropdown';
import { Logo } from '../../../Icons/Logo/DesktopLogo';
import { Button } from '../../../Buttons/Button';
import { LinkedButton } from '../../../Buttons/LinkedButton';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { Burger } from '../../../Dropdown/Burger';
import pagesRoutes from '../../../../routes/pagesRoutes.json';
import styles from './style.module.scss';

export const UserHeader: FC = (): JSX.Element => {
  const router = useRouter();
  const { scrolled } = useScroll(10);
  const isWidth = useWindowWidth(100, 1025);

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <Logo size={!isWidth ? 'large' : 'medium'} />
        <LogbookDropdown />
        <LinkedButton
          link={pagesRoutes.walletPageRout}
          label="Wallet"
          iconName="wallet-mobile"
          labelColor={
            router.pathname === pagesRoutes.mainPageRoute && !scrolled
              ? '#FFFFFF'
              : '#000345'
          }
        />
      </div>

      <div className={styles.rightGroup}>
        <LinkedButton
          link={pagesRoutes.explorePageRout}
          iconName="search"
        />

        <LinkedButton
          link={pagesRoutes.favouritesPageRout}
          iconName="heart-gap"
        />
        <LinkedButton
          link={pagesRoutes.communityPageRout}
          iconName="community-small"
        />

        <Button
          width={123}
          height={56}
          borderRadius={30}
          border="none"
          backgroundColor="#FDC90D"
          onClick={() => {
            router.push('/donate');
          }}
        >
          <span
            style={{
              color: '#000345',
            }}
            className={styles.btnText}
          >
            Donate
          </span>
        </Button>

        <Burger />

      </div>
    </header>
  );
};
