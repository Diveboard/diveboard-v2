import React, { FC, useContext } from 'react';
import { Footer } from '../components/Footer/DesktopFooter';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { MobileGuestHeader } from '../components/Header/MobileHeader/GuestHeader';
import { MobileNavBar } from '../components/MobileNavBar';
import { GuestHeader } from '../components/Header/DesktopHeader/GuestHeader';
import { FooterMobile } from '../components/Footer/MobileFooter';
import { AuthStatusContext } from './AuthLayout';
import { UserHeader } from '../components/Header/DesktopHeader/UserHeader';
import { MobileUserHeader } from '../components/Header/MobileHeader/UserHeader';

export const MainLayout: FC = ({ children }) => {
  const isWidth = useWindowWidth(500, 768);
  const { userAuth } = useContext(AuthStatusContext);
  const guestHeader = !isWidth ? <GuestHeader /> : <MobileGuestHeader />;
  const userHeader = !isWidth ? <UserHeader /> : <MobileUserHeader />;
  const headerComponent = userAuth ? userHeader : guestHeader;
  return (
    <>
      {headerComponent}

      {children}
      {!isWidth ? <Footer /> : <FooterMobile />}

      {isWidth && <MobileNavBar />}
    </>
  );
};
