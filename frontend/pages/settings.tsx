import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { SettingsBlock } from '../src/components/PageBlocks/SettingsBlocks';
import { PersonalInfo } from '../src/components/PageBlocks/SettingsBlocks/PersonalInfo';
import { EditContextWrapper } from '../src/components/PageBlocks/SettingsBlocks/EditContextWrapper';
import { Notification } from '../src/components/PageBlocks/SettingsBlocks/Notifications';

import { AuthLayout } from '../src/layouts/AuthLayout';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { Preferences } from '../src/components/PageBlocks/SettingsBlocks/Preferences';

const Settings:
InferGetServerSidePropsType<typeof getServerSideProps> = (
  { user, preferences, notifications },
) => (
  <AuthLayout user={user}>
    <SettingsBlock>
      <EditContextWrapper>
        <PersonalInfo />
        <Preferences preferences={preferences} />
        <Notification notifications={notifications} />
      </EditContextWrapper>
    </SettingsBlock>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.diveBoardUserId;

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
};

export default Settings;
