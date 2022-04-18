import React, { FC, useState } from 'react';
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
import { PreferencesType } from '../../../../firebase/firestore/models';

type Props = {
  preferences: PreferencesType
};

export const Preferences:FC<Props> = ({ preferences }) => {
  const [preferencesData, setPreferencesData] = useState(preferences);

  return (
    <SettingsGroup title="Preferences">
      <SettingsItem
        title="Privacy"
        titleBlock="Preferences"
      >
        <span
          className={styles.secondaryItemContent}
        >
          {preferencesData.privacy.divesPublic
            ? 'Make your dives public when complete'
            : 'Make your dives private when complete'}
        </span>
        <EditedPreferencesPrivacy
          preferences={preferencesData}
          setPreferences={setPreferencesData}
        />
      </SettingsItem>

      <SettingsItem
        title="Scientific data"
        titleBlock="Preferences"
      >
        <>
          {preferencesData.scientificData.shareData
            ? (
              <div className={styles.secondaryItemContent}>
                I want to share my data and have my name be mentioned as author
              </div>
            ) : (
              <div className={styles.secondaryItemContent}>
                I don't want to share my data and have my name be mentioned as author
              </div>
            )}
          {preferencesData.scientificData.shareNotes
            ? (
              <div className={styles.secondaryItemContent}>
                Share your dive notes
              </div>
            ) : (
              <div className={styles.secondaryItemContent}>
                Don't share your dive notes
              </div>
            )}
        </>
        <EditedPreferencesScientificData
          preferences={preferencesData}
          setPreferences={setPreferencesData}
        />
      </SettingsItem>

      <SettingsItem
        title="Language"
        titleBlock="Preferences"
      >
        <span className={styles.secondaryItemContent}>{preferencesData.language}</span>
        <EditedPreferencesLanguage
          preferences={preferencesData}
          setPreferences={setPreferencesData}
        />
      </SettingsItem>
      <SettingsItem
        title="Unit System"
        titleBlock="Preferences"
      >
        <span className={styles.secondaryItemContent}>{preferencesData.unitSystem}</span>
        <EditedPreferencesUnitSystem
          preferences={preferencesData}
          setPreferences={setPreferencesData}
        />
      </SettingsItem>
    </SettingsGroup>
  );
};
