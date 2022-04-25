import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { useScroll } from '../../../hooks/useScroll';
import { LogbookDropdown } from '../../Dropdown/LogbookDropdown';
import { LogDive, ViewLogbook } from '../../Icons/IconSVGComponents';
import { Logo } from '../../Icons/Logo/DesktopLogo';
import { Button } from '../../Buttons/Button';
import { LinkedButton } from '../../Buttons/LinkedButton';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

import pagesRouts from '../../../routes/pagesRoutes.json';
import styles from './style.module.scss';

export const Header: FC = (): JSX.Element => {
  const router = useRouter();
  const { scrolled } = useScroll(10);
  const { userAuth } = useContext(AuthStatusContext);
  const isWidth = useWindowWidth(100, 1025);

  const scrolledHeaderStyle = () => {
    if (scrolled) {
      return `${styles.header} ${styles.filled}`;
    }
    return styles.header;
  };

  const logbookItems = [
    {
      id: 1,
      svgItem: <LogDive />,
      title: 'Log a New Dive',
      link: '/',
    },
    {
      id: 2,
      svgItem: <ViewLogbook />,
      title: 'View a Logbook',
      link: '/',
    },
  ];

  return (
    <header className={scrolledHeaderStyle()}>
      <div className={styles.leftGroup}>
        <Logo size={!isWidth ? 'large' : 'medium'} />

        {!userAuth ? (
          <LinkedButton
            link="/"
            label="Logbook"
            iconName={
              router.pathname === pagesRouts.mainPageGuest && !scrolled
                ? 'logbook-white'
                : 'logbook'
            }
            labelColor={
              router.pathname === pagesRouts.mainPageGuest && !scrolled
                ? '#FFFFFF'
                : '#000345'
            }
          />
        ) : (
          <LogbookDropdown imgName="logbook" title="Logbook" items={logbookItems} />
        )}

        <LinkedButton
          link="/"
          label="Wallet"
          iconName={
            router.pathname === pagesRouts.mainPageGuest && !scrolled
              ? 'wallet-white'
              : 'wallet-mobile'
          }
          labelColor={
            router.pathname === pagesRouts.mainPageGuest && !scrolled
              ? '#FFFFFF'
              : '#000345'
          }
        />
      </div>

      <div className={styles.rightGroup}>
        <LinkedButton
          link="/"
          iconName={
            router.pathname === pagesRouts.mainPageGuest && !scrolled
              ? 'search-white'
              : 'search'
          }
        />

        <Button
          width={206}
          height={56}
          borderRadius={30}
          border={`2px solid ${
            router.pathname === pagesRouts.mainPageGuest && !scrolled
              ? '#FFFFFF'
              : '#000345'
          }`}
          backgroundColor="transparent"
          onClick={() => {
            router.push(pagesRouts.authPageRout);
          }}
        >
          <span
            style={{
              color: `${
                router.pathname === pagesRouts.mainPageGuest && !scrolled
                  ? '#FFFFFF'
                  : '#000345'
              }`,
            }}
            className={styles.btnText}
          >
            Log In / Sign Up
          </span>
        </Button>
      </div>
    </header>
  );
};
