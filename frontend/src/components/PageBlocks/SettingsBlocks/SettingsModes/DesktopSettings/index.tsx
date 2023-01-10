import React, { FC } from 'react';
import { SettingsBlock } from '../../index';
import { EditContextWrapper } from '../../EditContextWrapper';
import { PersonalInfo } from '../../PersonalInfo';
import { Preferences } from '../../Preferences';
import { Notification } from '../../Notifications';
import { UserSettingsType } from '../../../../../firebase/firestore/models';
import { MarginWrapper } from '../../../../MarginWrapper';

type Props = {
  user: UserSettingsType
};

export const DesktopSettings: FC <Props> = ({ user }) => (
  <SettingsBlock>
    <EditContextWrapper>
      <MarginWrapper top={20} display="block">
        <PersonalInfo user={user} />
      </MarginWrapper>

      <MarginWrapper top={20} display="block">
        <Preferences preferences={user.settings.preferences} language={user.settings.language} />
      </MarginWrapper>

      <MarginWrapper top={20} display="block">
        <Notification notifications={user.settings.notifications} />
      </MarginWrapper>

    </EditContextWrapper>
  </SettingsBlock>
);
