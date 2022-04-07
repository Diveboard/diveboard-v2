import React from 'react';
import { LanguageDropdown } from '../../../../../Dropdown/languageDropdawn';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';

export const EditedPreferencesLanguage = () => (
  <div>
    <LanguageDropdown currentItem="English" />

    <MarginWrapper top={10}>
      <SaveThisButton onClick={() => {}} />
    </MarginWrapper>

  </div>
);
