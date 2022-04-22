import React, { FC } from 'react';
import { SettingsBlock } from '../../index';
import { EditContextWrapper } from '../../EditContextWrapper';
import { PersonalInfo } from '../../PersonalInfo';
import { Preferences } from '../../Preferences';
import { Notification } from '../../Notifications';
import { NotificationsType, PreferencesType } from '../../../../../firebase/firestore/models';

type Props = {
  preferences: PreferencesType
  notifications: NotificationsType
};

export const DesktopSettings: FC <Props> = ({ preferences, notifications }) => (
  <SettingsBlock>
    <EditContextWrapper>
      <PersonalInfo />
      <Preferences preferences={preferences} />
      <Notification notifications={notifications} />
    </EditContextWrapper>
  </SettingsBlock>
);
