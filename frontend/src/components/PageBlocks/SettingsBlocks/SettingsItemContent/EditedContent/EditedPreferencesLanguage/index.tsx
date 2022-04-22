import React, { FC, useContext, useState } from 'react';
import { LanguageDropdown } from '../../../../../Dropdown/languageDropdawn';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import { PreferencesType } from '../../../../../../firebase/firestore/models';
import {
  firestorePreferencesService,
} from '../../../../../../firebase/firestore/firestoreServises/firestorePreferencesService';

type Props = {
  preferences: PreferencesType;
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesType>>;
};
export const EditedPreferencesLanguage: FC<Props> = ({ preferences, setPreferences }) => {
  const [loading, setLoading] = useState(false);
  const { userAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [language, setLanguage] = useState(preferences.language);

  const setLanguagePreferences = async () => {
    setLoading(true);
    await firestorePreferencesService.setLanguage(language, userAuth.uid);
    setPreferences({ ...preferences, language });
    setLoading(false);
    setEditedSettings({ settingsBlock: '', settingsItem: '' });
  };

  return (
    <div>
      <LanguageDropdown language={language} setLanguage={setLanguage} />

      <MarginWrapper top={10}>
        <SaveThisButton
          onClick={setLanguagePreferences}
          loading={loading}
          disabled={loading}
        />
      </MarginWrapper>

    </div>
  );
};
