import React, { FC, useContext, useState } from 'react';
import { Dropdown } from '../../../../../Dropdown/Dropdawn';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import {
  firestorePreferencesService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePreferencesService';

type Props = {
  lang: string;
  setLang: (l: string) => void;
};
export const EditedPreferencesLanguage: FC<Props> = ({
  lang,
  setLang,
}) => {
  const [loading, setLoading] = useState(false);
  const { userAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [language, setLanguage] = useState(lang);

  const setLanguagePreferences = () => {
    setLoading(true);
    firestorePreferencesService.setLanguage(language, userAuth.uid);
    setLang(language);
    setLoading(false);
    setEditedSettings({
      settingsBlock: '',
      settingsItem: '',
    });
  };

  return (
    <div>
      <Dropdown
        item={language}
        setItem={setLanguage}
        allItems={['English', 'Italian', 'Spanish', 'German']}
        width={196}
      />

      <MarginWrapper top={10} display="block">
        <SaveThisButton
          onClick={setLanguagePreferences}
          loading={loading}
          disabled={loading}
        />
      </MarginWrapper>

    </div>
  );
};
