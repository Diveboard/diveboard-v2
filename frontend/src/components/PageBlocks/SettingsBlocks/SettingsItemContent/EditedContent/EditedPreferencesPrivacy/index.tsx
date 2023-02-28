import React, { FC, useContext, useState } from 'react';
import { Checkbox } from '../../../../../CheckBox';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import styles from './styles.module.scss';
import { PreferencesType } from '../../../../../../firebase/firestore/models';
import {
  firestorePreferencesService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePreferencesService';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import { notify } from '../../../../../../utils/notify';
import { deleteCache } from '../../../../../../utils/refreshCache';

type Props = {
  preferences: PreferencesType;
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesType>>;
};

export const EditedPreferencesPrivacy: FC<Props> = ({ preferences, setPreferences }) => {
  const [makePublic, setMakePublic] = useState(preferences.privacy.divesPublic);
  const [loading, setLoading] = useState(false);
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);

  const setPrivacyPreferences = async () => {
    try {
      setLoading(true);
      await firestorePreferencesService.setPrivacy(makePublic, userAuth.uid);
      setUserAuth({
        ...userAuth,
        settings: {
          ...userAuth.settings,
          preferences: {
            ...userAuth.settings.preferences,
            privacy: { divesPublic: makePublic },
          },
        },
      });
      setPreferences({ ...preferences, privacy: { divesPublic: makePublic } });
      await deleteCache();
      setLoading(false);
      setEditedSettings({ settingsBlock: '', settingsItem: '' });
    } catch (e) {
      notify('Something went wrong');
    }
  };

  return (
    <div>
      <MarginWrapper bottom={10} display="block">
        <Checkbox name="make-public" onChecked={setMakePublic} checked={makePublic}>
          <span className={styles.label}>
            Make your dives public when complete
          </span>
        </Checkbox>
      </MarginWrapper>

      <SaveThisButton onClick={setPrivacyPreferences} loading={loading} disabled={loading} />
    </div>
  );
};
