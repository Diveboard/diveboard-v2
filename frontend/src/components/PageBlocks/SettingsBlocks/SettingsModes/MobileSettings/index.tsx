import React, { FC, useState } from 'react';
import { MobileSettingsTabs } from '../../MobileSettingsTabs';
import { PersonalInfo } from '../../PersonalInfo';
import { Preferences } from '../../Preferences';
import { Notification } from '../../Notifications';
import { EditContextWrapper } from '../../EditContextWrapper';
import { NotificationsType, PreferencesType } from '../../../../../firebase/firestore/models';
import { MarginWrapper } from '../../../../MarginWrapper';

type Props = {
  preferences: PreferencesType
  notifications: NotificationsType
  language: string
};

export const MobileSettings: FC<Props> = ({ preferences, notifications, language }) => {
  const [mode, setMode] = useState <
  'personal info' | 'preferences' | 'notifications'
  >('personal info');
  return (
    <>
      <MobileSettingsTabs mode={mode} setMode={setMode} />
      <EditContextWrapper>

        {mode === 'personal info' && (
        <>
          <PersonalInfo title={false} />
          <MarginWrapper bottom={60} display="inline-block" />
        </>
        )}

        {mode === 'preferences' && (
        <>
          <Preferences preferences={preferences} title={false} language={language} />
          <MarginWrapper bottom={60} display="inline-block" />
        </>
        )}

        {mode === 'notifications' && (
        <>
          <Notification notifications={notifications} title={false} />
          <MarginWrapper bottom={60} display="inline-block" />
        </>
        )}
      </EditContextWrapper>
    </>
  );
};
