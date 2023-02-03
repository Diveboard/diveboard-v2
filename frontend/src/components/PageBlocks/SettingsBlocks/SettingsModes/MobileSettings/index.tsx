import React, { FC, useState } from 'react';
import { MobileSettingsTabs } from '../../MobileSettingsTabs';
import { PersonalInfo } from '../../PersonalInfo';
import { Preferences } from '../../Preferences';
import { Notification } from '../../Notifications';
import { EditContextWrapper } from '../../EditContextWrapper';
import { UserSettingsType } from '../../../../../firebase/firestore/models';
import { MarginWrapper } from '../../../../MarginWrapper';
import styles from './styles.module.scss';

type Props = {
  user: UserSettingsType;
};

export const MobileSettings: FC<Props> = ({ user }) => {
  const [mode, setMode] = useState <
  'personal info' | 'preferences' | 'notifications'
  >('personal info');
  return (
    <div className={styles.settingsWrapper}>
      <MobileSettingsTabs mode={mode} setMode={setMode} />
      <EditContextWrapper>

        {mode === 'personal info' && (
        <>
          <PersonalInfo user={user} title={false} />
          <MarginWrapper bottom={60} display="inline-block" />
        </>
        )}

        {mode === 'preferences' && (
        <>
          <Preferences
            preferences={user.settings.preferences}
            title={false}
            language={user.settings.language}
          />
          <MarginWrapper bottom={60} display="inline-block" />
        </>
        )}

        {mode === 'notifications' && (
        <>
          <Notification notifications={user.settings.notifications} title={false} />
          <MarginWrapper bottom={60} display="inline-block" />
        </>
        )}
      </EditContextWrapper>
    </div>
  );
};
