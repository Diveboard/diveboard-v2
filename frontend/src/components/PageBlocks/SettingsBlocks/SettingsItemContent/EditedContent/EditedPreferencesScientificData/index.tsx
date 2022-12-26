import React, { FC, useContext, useState } from 'react';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import styles from './styles.module.scss';
import { PreferencesType, ShareData } from '../../../../../../firebase/firestore/models';
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
    share: {
      name: 'OPEN_SHARE',
      text: 'I want to share my data and have my name be mentioned as author',
    },
    anonym: {
      name: 'ANONYMOUS_SHARE',
      text: 'I want to share my data anonymously',
    },
    notShare: {
      name: 'NOT_SHARE',
      text: 'I don\'t want to share my data',
    },
  };

  const [shareData, setShareData] = useState(
    preferences.scientificData.shareData || scientificDataOptions.share.name as ShareData,
  );
  const [shareNotes, setShareNotes] = useState(preferences.scientificData.shareNotes);
  const { userAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [loading, setLoading] = useState(false);

  const setScientificDataPreferences = () => {
    setLoading(true);
    firestorePreferencesService
      .setScientificData({ shareData, shareNotes }, userAuth.uid);
    setPreferences({ ...preferences, scientificData: { shareData, shareNotes } });
    setLoading(false);
    setEditedSettings({ settingsBlock: '', settingsItem: '' });
  };

  return (
    <div>
      <MarginWrapper bottom={10} display="block">
        <RadioButton
          label={scientificDataOptions.share.text}
          name={scientificDataOptions.share.name}
          onCheck={setShareData}
          checked={shareData}
          className={styles.label}
        />
        <RadioButton
          label={scientificDataOptions.anonym.text}
          name={scientificDataOptions.anonym.name}
          onCheck={setShareData}
          checked={shareData}
          className={styles.label}
        />
        <RadioButton
          label={scientificDataOptions.notShare.text}
          name={scientificDataOptions.notShare.name}
          onCheck={setShareData}
          checked={shareData as ShareData}
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
