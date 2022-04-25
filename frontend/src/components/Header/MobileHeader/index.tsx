import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { LogoMobile } from '../../Icons/Logo/MobileLogo';
import { Icon } from '../../Icons/Icon';
import styles from './styles.module.scss';
import pagesRouts from '../../../routes/pagesRoutes.json';
import { MarginWrapper } from '../../MarginWrapper';
import { useScroll } from '../../../hooks/useScroll';

export const MobileHeader: FC = () => {
  const router = useRouter();
  const { scrolled } = useScroll(10);

  const scrolledHeaderStyle = () => {
    if (scrolled) {
      return `${styles.header} ${styles.filled}`;
    }
    return styles.header;
  };

  return (
    <header className={scrolledHeaderStyle()}>
      <LogoMobile />
      <MarginWrapper right={15}>
        <div
          className={styles.signUpBtn}
          onClick={() => {
            router.push(pagesRouts.authPageRout);
          }}
        >
          <Icon
            iconName={!scrolled ? 'signup-white-ico' : 'signup-ico'}
            size={20}
          />
          <span style={{ color: scrolled ? '#000345' : '#FFFFFF' }}>
            Sign Up
          </span>
        </div>
      </MarginWrapper>
    </header>
  );
};
