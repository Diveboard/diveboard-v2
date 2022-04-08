import React, { useState } from 'react';
import { Checkbox } from '../../../../../CheckBox';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import styles from './styles.module.scss';

export const EditedPreferencesScientificData = () => {
  const [shareData, setShareData] = useState(true);
  const [shareDiveNotes, setShareDiveNotes] = useState(false);

  return (
    <div>
      <MarginWrapper bottom={10} display="block">
        <Checkbox name="share-data" onChecked={setShareData} checked={shareData}>
          <span className={styles.label}>
            I want to share my data and have my name
            be mentioned as author
          </span>
        </Checkbox>
      </MarginWrapper>

      <MarginWrapper bottom={10} display="block">
        <Checkbox name="share-notes" onChecked={setShareDiveNotes} checked={shareDiveNotes}>
          <span className={styles.label}> Share your dive notes </span>
        </Checkbox>
      </MarginWrapper>

      <SaveThisButton onClick={() => {}} />
    </div>
  );
};
