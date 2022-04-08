import React, { useState } from 'react';
import { Checkbox } from '../../../../../CheckBox';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import styles from './styles.module.scss';

export const EditedPreferencesPrivacy = () => {
  const [makePublic, setMakePublic] = useState(true);
  const [shareDives, setShareDives] = useState(false);

  return (
    <div>
      <MarginWrapper bottom={10} display="block">
        <Checkbox name="make-public" onChecked={setMakePublic} checked={makePublic}>
          <span className={styles.label}>
            Make your dives public when complete
          </span>
        </Checkbox>
      </MarginWrapper>

      <MarginWrapper bottom={10} display="block">
        <Checkbox name="share-dives" onChecked={setShareDives} checked={shareDives}>
          <span className={styles.label}> Share your dive notes </span>
        </Checkbox>
      </MarginWrapper>

      <SaveThisButton onClick={() => {}} />
    </div>
  );
};
