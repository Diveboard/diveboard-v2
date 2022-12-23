import React, {
  FC, useContext, useEffect, useState,
} from 'react';
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
import {
  firestorePreferencesService,
} from '../../../../firebase/firestore/firestoreServices/firestorePreferencesService';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';
import { sameServerData } from '../../../../utils/sameServerData';

type Props = {
  preferences: PreferencesType
  title?: boolean;
};

export const Preferences:FC<Props> = ({ preferences, title = true }) => {
  const [preferencesData, setPreferencesData] = useState(preferences);
  const { userAuth } = useContext(AuthStatusContext);

  useEffect(() => {
    (async () => {
      const clientPreferences = await firestorePreferencesService.getAllPreferences(userAuth.uid);
      if (!sameServerData(preferences, clientPreferences)) {
        setPreferencesData(clientPreferences as PreferencesType);
      }
    })();
  }, []);
  return (
    <SettingsGroup title={title && 'Preferences'}>
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
          <div className={styles.secondaryItemContent}>
            {preferencesData.scientificData.shareData || 'I want to share my data and have my name be mentioned as author'}
          </div>
          <div className={styles.secondaryItemContent}>
            {preferencesData.scientificData.shareNotes ? 'Share your dive notes' : 'Don\'t share your dive notes'}
          </div>
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
