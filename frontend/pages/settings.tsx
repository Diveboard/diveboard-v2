import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { AuthStatusContext } from '../src/layouts/AuthLayout';
import { useWindowWidth } from '../src/hooks/useWindowWidth';
import {
  DesktopSettings,
} from '../src/components/PageBlocks/SettingsBlocks/SettingsModes/DesktopSettings';
import {
  MobileSettings,
} from '../src/components/PageBlocks/SettingsBlocks/SettingsModes/MobileSettings';
import pageRoutes from '../src/routes/pagesRoutes.json';

const Settings = () => {
  const isWidth = useWindowWidth(500, 769);
  const { userAuth } = useContext(AuthStatusContext);
  if (!isWidth) {
    return <DesktopSettings user={userAuth} />;
  }
  return <MobileSettings user={userAuth} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (!uid) {
    return {
      redirect: {
        destination: pageRoutes.authPageRout,
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Settings;
