import React from 'react';
import { SettingsGroup } from '../SettingsGroup';
import { SettingsItem } from '../SettingsItem';

export const Preferences = () => (
  <SettingsGroup title="Preferences">
    <SettingsItem
      title="Privacy"
      titleBlock="Preferences"
    >
      <span>first</span>
      <span>second</span>
    </SettingsItem>
    <SettingsItem
      title="Scientific data"
      titleBlock="Preferences"
    >
      <span>first</span>
      <span>second</span>
    </SettingsItem>
    <SettingsItem
      title="Language"
      titleBlock="Preferences"
    >
      <span>first</span>
      <span>second</span>
    </SettingsItem>
    <SettingsItem
      title="Unit System"
      titleBlock="Preferences"
    >
      <span>first</span>
      <span>second</span>
    </SettingsItem>
  </SettingsGroup>
);
