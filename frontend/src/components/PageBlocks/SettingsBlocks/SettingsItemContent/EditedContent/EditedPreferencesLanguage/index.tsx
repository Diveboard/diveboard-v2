import React, { FC, useContext, useState } from 'react';
import { Dropdown } from '../../../../../Dropdown/Dropdawn';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import {
  firestorePreferencesService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePreferencesService';
import { notify } from '../../../../../../utils/notify';
import { deleteCache } from '../../../../../../utils/refreshCache';

type Props = {
  lang: string;
  setLang: (l: string) => void;
};
export const EditedPreferencesLanguage: FC<Props> = ({
  lang,
  setLang,
}) => {
  const [loading, setLoading] = useState(false);
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [language, setLanguage] = useState(lang);
  const setLanguagePreferences = async () => {
    try {
      setLoading(true);
      await firestorePreferencesService.setLanguage(language, userAuth.uid);
      setUserAuth({
        ...userAuth,
        settings: { ...userAuth.settings, language: language.toLowerCase().slice(0, 2) },
      });
      setLang(language);
      setLoading(false);
      await deleteCache();
      setEditedSettings({
        settingsBlock: '',
        settingsItem: '',
      });
    } catch (e) {
      notify('Something went wrong');
    }
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
