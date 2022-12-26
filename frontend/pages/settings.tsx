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
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { firestorePaths } from '../src/firebase/firestore/firestorePaths';

const Settings:
InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user, preferences, notifications, language,
}) => {
  const isWidth = useWindowWidth(500, 769);

  return (
    <AuthLayout user={user}>
      <MainLayout>
        {!isWidth
          ? (
            <DesktopSettings
              preferences={preferences}
              notifications={notifications}
              language={language}
            />
          )
          : (
            <MobileSettings
              preferences={preferences}
              notifications={notifications}
              language={language}
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

    const snapshotUser = await firebaseAdmin
      .firestore().doc(`${firestorePaths.users.path}/${uid}`).get();
    const {
      email, photoUrl = '', firstName = '', country = '', about = '',
    } = await snapshotUser.data();
    // const usersSettings = firestorePaths.users.segment;
    // const notificationSegment = firestorePaths.users.settings.notifications.segment;
    // const preferencesSegment = firestorePaths.users.settings.preferences.segment;
    // const getPath = (userId: string) => `${firestorePaths.users.path}/${userId}`;
    // /${firestorePaths.users.settings.segment}`;

    const snapshotPreferences = await firebaseAdmin
      .firestore().doc(`${firestorePaths.users.path}/${uid}`).get();
    const data = await snapshotPreferences.data();
    const { notifications, preferences, language } = data.settings;

    return {
      props: {
        user: {
          uid,
          email,
          photoUrl,
          firstName,
          country,
          about,
        },
        preferences,
        notifications,
        language,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
};

export default Settings;
