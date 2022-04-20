import React, { FC, useState } from 'react';
import { MobileSettingsTabs } from '../../MobileSettingsTabs';
import { PersonalInfo } from '../../PersonalInfo';
import { Preferences } from '../../Preferences';
import { Notification } from '../../Notifications';
import { EditContextWrapper } from '../../EditContextWrapper';
import { NotificationsType, PreferencesType } from '../../../../../firebase/firestore/models';

type Props = {
  preferences: PreferencesType
  notifications: NotificationsType
};

export const MobileSettings: FC<Props> = ({ preferences, notifications }) => {
  const [mode, setMode] = useState <
  'personal info' | 'preferences' | 'notifications'
  >('personal info');
  return (
    <>
      <MobileSettingsTabs mode={mode} setMode={setMode} />
      <EditContextWrapper>
        {mode === 'personal info' && <PersonalInfo title={false} />}
        {mode === 'preferences' && <Preferences preferences={preferences} title={false} />}
        {mode === 'notifications' && <Notification notifications={notifications} title={false} />}
      </EditContextWrapper>
    </>
  );
};
