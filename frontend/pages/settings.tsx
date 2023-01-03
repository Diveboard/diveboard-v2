import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
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

const Settings: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
}) => {
  const isWidth = useWindowWidth(500, 769);

  return (
    <AuthLayout user={user}>
      <MainLayout>
        {!isWidth
          ? (
            <DesktopSettings
              preferences={user.settings.preferences}
              notifications={user.settings.notifications}
              language={user.settings.language}
            />
          )
          : (
            <MobileSettings
              preferences={user.settings.preferences}
              notifications={user.settings.notifications}
              language={user.settings.language}
            />
          )}
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
