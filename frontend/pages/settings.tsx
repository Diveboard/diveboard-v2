import React from 'react';
import { SettingsBlock } from '../src/components/PageBlocks/SettingsBlocks';
import { PersonalInfo } from '../src/components/PageBlocks/SettingsBlocks/PersonalInfo';
import { Preferences } from '../src/components/PageBlocks/SettingsBlocks/Preferences';
import { EditContextWrapper } from '../src/components/PageBlocks/SettingsBlocks/EditContextWrapper';
import { Notification } from '../src/components/PageBlocks/SettingsBlocks/Notifications';

const Settings = () => (
  <SettingsBlock>
    <EditContextWrapper>
      <PersonalInfo />
      <Preferences />
      <Notification />
    </EditContextWrapper>
  </SettingsBlock>
);

export default Settings;
