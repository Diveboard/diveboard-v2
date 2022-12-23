import React, { FC, useContext, useState } from 'react';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import styles from './styles.module.scss';
import { PreferencesType } from '../../../../../../firebase/firestore/models';
import {
  firestorePreferencesService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePreferencesService';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import { RadioButton } from '../../../../../RadioButton';
import { Checkbox } from '../../../../../CheckBox';

type Props = {
  preferences: PreferencesType;
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesType>>;
};

export const EditedPreferencesScientificData: FC <Props> = ({ preferences, setPreferences }) => {
  const scientificDataOptions = {
    share: 'I want to share my data and have my name be mentioned as author',
    anonym: 'I want to share my data anonymously',
    notShare: 'I don\'t want to share my data',
  };
  const [shareData, setShareData] = useState(
    preferences.scientificData.shareData || scientificDataOptions.share,
  );
  const [shareNotes, setShareNotes] = useState(preferences.scientificData.shareNotes);
  const { userAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [loading, setLoading] = useState(false);

  const setScientificDataPreferences = () => {
    setLoading(true);
    firestorePreferencesService
      .setScientificData({ scientificData: { shareData, shareNotes } }, userAuth.uid);
    setPreferences({ ...preferences, scientificData: { shareData, shareNotes } });
    setLoading(false);
    setEditedSettings({ settingsBlock: '', settingsItem: '' });
  };

  return (
    <div>
      <MarginWrapper bottom={10} display="block">
        <RadioButton
          label={scientificDataOptions.share}
          name={scientificDataOptions.share}
          onCheck={setShareData}
          checked={shareData}
          className={styles.label}
        />
        <RadioButton
          label={scientificDataOptions.anonym}
          name={scientificDataOptions.anonym}
          onCheck={setShareData}
          checked={shareData}
          className={styles.label}
        />
        <RadioButton
          label={scientificDataOptions.notShare}
          name={scientificDataOptions.notShare}
          onCheck={setShareData}
          checked={shareData}
          className={styles.label}
        />
      </MarginWrapper>
      {/* <Checkbox name="share-data" onChecked={setShareData} checked={shareData}> */}
      {/*  <span className={styles.label}> */}
      {/*    I want to share my data and have my name */}
      {/*    be mentioned as author */}
      {/*  </span> */}
      {/* </Checkbox> */}
      <MarginWrapper bottom={10} display="block">
        <Checkbox name="share-notes" onChecked={setShareNotes} checked={shareNotes}>
          <span className={styles.label}> Share your dive notes </span>
        </Checkbox>
      </MarginWrapper>
      <SaveThisButton onClick={setScientificDataPreferences} loading={loading} disabled={loading} />
    </div>
  );
};
