import React, { FC, useContext, useState } from 'react';
import { RadioButton } from '../../../../../RadioButton';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import { PreferencesType } from '../../../../../../firebase/firestore/models';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import {
  firestorePreferencesService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePreferencesService';

type Props = {
  preferences: PreferencesType;
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesType>>;
};

export const EditedPreferencesUnitSystem: FC<Props> = ({ preferences, setPreferences }) => {
  const [checkedRadio, setCheckedRadio] = useState(preferences.unitSystem);
  const [loading, setLoading] = useState(false);
  const { userAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);

  const setMetricPreferences = () => {
    setLoading(true);
    firestorePreferencesService.setUnitSystem(checkedRadio, userAuth.uid);
    setPreferences({ ...preferences, unitSystem: checkedRadio });
    setLoading(false);
    setEditedSettings({ settingsBlock: '', settingsItem: '' });
  };

  return (
    <div>
      <MarginWrapper display="block" bottom={10}>
        <RadioButton
          name="metric"
          label="Metric System (m, ºC, bar, kg)"
          checked={checkedRadio}
          onCheck={setCheckedRadio}
        />
      </MarginWrapper>

      <MarginWrapper display="block" bottom={10}>
        <RadioButton
          name="imperial"
          label="Imperial System ( in, ºF, pounds)"
          checked={checkedRadio}
          onCheck={setCheckedRadio}
        />
      </MarginWrapper>

      <SaveThisButton
        onClick={setMetricPreferences}
        loading={loading}
        disabled={loading}
      />
    </div>
  );
};
