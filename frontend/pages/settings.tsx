import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWindowWidth } from '../src/hooks/useWindowWidth';
import {
  DesktopSettings,
} from '../src/components/PageBlocks/SettingsBlocks/SettingsModes/DesktopSettings';
import {
  MobileSettings,
} from '../src/components/PageBlocks/SettingsBlocks/SettingsModes/MobileSettings';
import { firestorePublicProfileService } from '../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import { UserSettingsType } from '../src/firebase/firestore/models';
import 'react-toastify/dist/ReactToastify.css';

const Settings: NextPage<{ user: UserSettingsType }> = (props) => {
  const isWidth = useWindowWidth(500, 769);

  const { user } = props;

  return (
    <AuthLayout user={user}>
      <ToastContainer />
      <MainLayout>
        {!isWidth
          ? <DesktopSettings user={user} />
          : <MobileSettings user={user} />}
      </MainLayout>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;

    if (!uid) {
      throw new Error('no user uid');
    }

    const user = await firestorePublicProfileService.getUserById(uid);

    if (!user) {
      throw new Error('no user');
    }

    return {
      props: {
        user,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
};

export default Settings;
