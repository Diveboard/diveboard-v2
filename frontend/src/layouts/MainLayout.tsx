import React, { FC, useContext } from 'react';
import { Footer } from '../components/Footer/DesktopFooter';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { MobileGuestHeader, MobileUserHeader } from '../components/Header/MobileHeader';
import { MobileNavBar } from '../components/MobileNavBar';
import { FooterMobile } from '../components/Footer/MobileFooter';
import { AuthStatusContext } from './AuthLayout';
import { LogDiveProvider } from '../components/PageBlocks/LogADiveBlocks/LogDiveData/LogDiveProvider';
import { GuestHeader, UserHeader } from '../components/Header/DesktopHeader';
import useLoading from '../hooks/useLoading';
import { LineLoader } from '../components/LineLoader';

type Props = {
  isHideMobileHeader?: boolean;
  isFilled?: boolean;
};

export const MainLayout: FC<Props> = ({
  isHideMobileHeader = false,
  isFilled = false,
  children,
}) => {
  const isMobile = useWindowWidth(500, 769);
  const { userAuth } = useContext(AuthStatusContext);

  const isLoading = useLoading();

  const headerComponent = () => {
    if (userAuth) {
      if (isMobile === false) {
        return <UserHeader />;
      } if (!isHideMobileHeader) {
        return <MobileUserHeader />;
      }
    } else {
      if (isMobile === false) {
        return <GuestHeader isFilled={isFilled} />;
      } if (!isHideMobileHeader) {
        return <MobileGuestHeader />;
      }
    }
  };

  return (
    <>
      <LogDiveProvider>
        {isMobile !== undefined && headerComponent()}
        {isLoading && <LineLoader />}
      </LogDiveProvider>
      {children}
      {isMobile === false && <Footer /> }
      {isMobile === true && <FooterMobile /> }
      {isMobile === true && <MobileNavBar uid={userAuth?.uid || null} />}
    </>
  );
};
