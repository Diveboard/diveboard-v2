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
InferGetServerSidePropsType<typeof getServerSideProps> = (
  { user, preferences, notifications },
) => {
  const isWidth = useWindowWidth(500, 769);

  return (
    <AuthLayout user={user}>
      <MainLayout>
        {!isWidth
          ? (
            <DesktopSettings
              preferences={preferences}
              notifications={notifications}
            />
          )
          : (
            <MobileSettings
              preferences={preferences}
              notifications={notifications}
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
      email, photoURL = '', name = '', country = '', about = '',
    } = await snapshotUser.data();

    const notificationSegment = firestorePaths.users.settings.notifications.segment;
    const preferencesSegment = firestorePaths.users.settings.preferences.segment;
    const getPath = (userId: string) => `${firestorePaths.users.path}/${userId}/${firestorePaths.users.settings.segment}`;

    const snapshotPreferences = await firebaseAdmin
      .firestore().doc(`${getPath(uid)}/${preferencesSegment}`).get();
    const preferences = await snapshotPreferences.data();

    const snapshotNotifications = await firebaseAdmin
      .firestore().doc(`${getPath(uid)}/${notificationSegment}`).get();
    const notifications = await snapshotNotifications.data();

    return {
      props: {
        user: {
          uid,
          email,
          photoURL,
          name,
          country,
          about,
        },
        preferences,
        notifications,
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
