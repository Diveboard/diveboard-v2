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

const Settings:
InferGetServerSidePropsType<typeof getServerSideProps> = (
  { user, preferences, notifications },
) => {
  const isWidth = useWindowWidth(500, 768);

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
    const uid = context.req.cookies.diveBoardUserId;

    if (!uid) {
      throw new Error('no user uid');
    }

    const {
      email, photoURL = '', displayName = '',
    } = await firebaseAdmin.auth().getUser(uid);

    const snapshotPreferences = await firebaseAdmin
      .firestore().doc(`user-preferences/${uid}`).get();
    const preferences = await snapshotPreferences.data();

    const snapshotNotifications = await firebaseAdmin
      .firestore().doc(`notifications/${uid}`).get();
    const notifications = await snapshotNotifications.data();

    return {
      props: {
        user: {
          uid,
          email,
          photoURL,
          name: displayName,
        },
        preferences,
        notifications,
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
