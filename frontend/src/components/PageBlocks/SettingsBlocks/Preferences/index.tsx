import React from 'react';
import { SettingsGroup } from '../SettingsGroup';
import { SettingsItem } from '../SettingsItem';
import {
  EditedPreferencesScientificData,
} from '../SettingsItemContent/EditedContent/EditedPreferencesScientificData';
import {
  EditedPreferencesPrivacy,
} from '../SettingsItemContent/EditedContent/EditedPreferencesPrivacy';
import styles from '../itemContentStyle.module.scss';
import {
  EditedPreferencesLanguage,
} from '../SettingsItemContent/EditedContent/EditedPreferencesLanguage';
import {
  EditedPreferencesUnitSystem,
} from '../SettingsItemContent/EditedContent/EditedPreferencesUnitSystem';

export const Preferences = () => (
  <SettingsGroup title="Preferences">
    <SettingsItem
      title="Privacy"
      titleBlock="Preferences"
    >
      <span className={styles.secondaryItemContent}>first</span>
      <EditedPreferencesPrivacy />
    </SettingsItem>
    <SettingsItem
      title="Scientific data"
      titleBlock="Preferences"
    >
      <span className={styles.secondaryItemContent}>first</span>
      <EditedPreferencesScientificData />
    </SettingsItem>
    <SettingsItem
      title="Language"
      titleBlock="Preferences"
    >
      <span className={styles.secondaryItemContent}>first</span>
      <EditedPreferencesLanguage />
    </SettingsItem>
    <SettingsItem
      title="Unit System"
      titleBlock="Preferences"
    >
      <span className={styles.secondaryItemContent}>first</span>
      <EditedPreferencesUnitSystem defaultCheck="metric" />
    </SettingsItem>
  </SettingsGroup>
);
