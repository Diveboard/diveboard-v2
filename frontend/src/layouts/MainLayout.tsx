import React, { FC } from 'react';
import { Footer } from '../components/Footer/DesktopFooter';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { MobileHeader } from '../components/Header/MobileHeader';
import { MobileNavBar } from '../components/MobileNavBar';
import { Header } from '../components/Header/DesktopHeader';
import { FooterMobile } from '../components/Footer/MobileFooter';

export const MainLayout: FC = ({ children }) => {
  const isWidth = useWindowWidth(500, 768);

  return (
    <>
      {!isWidth ? <Header /> : <MobileHeader />}
      {children}
      {!isWidth ? <Footer /> : <FooterMobile />}
      {isWidth && <MobileNavBar />}
    </>
  );
};