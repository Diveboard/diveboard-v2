import React, { FC, useContext, useState } from 'react';
import { RadioButton } from '../../../../../RadioButton';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';
import { PreferencesType, UnitSystem } from '../../../../../../firebase/firestore/models';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import {
  firestorePreferencesService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePreferencesService';
import { notify } from '../../../../../../utils/notify';

type Props = {
  preferences: PreferencesType;
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesType>>;
};

export const EditedPreferencesUnitSystem: FC<Props> = ({ preferences, setPreferences }) => {
  const [checkedRadio, setCheckedRadio] = useState<UnitSystem>(preferences.unitSystem);
  const [loading, setLoading] = useState(false);
  const { userAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);

  const setMetricPreferences = () => {
    try {
      setLoading(true);
      firestorePreferencesService.setUnitSystem(checkedRadio as UnitSystem, userAuth.uid);
      setPreferences({ ...preferences, unitSystem: checkedRadio });
      setLoading(false);
      setEditedSettings({ settingsBlock: '', settingsItem: '' });
    } catch (e) {
      notify('Something went wrong');
    }
  };

  return (
    <div>
      <MarginWrapper display="block" bottom={10}>
        <RadioButton
          name="METRIC"
          label="Metric System (m, ºC, bar, kg)"
          checked={checkedRadio}
          onCheck={setCheckedRadio}
        />
      </MarginWrapper>

      <MarginWrapper display="block" bottom={10}>
        <RadioButton
          name="IMPERIAL"
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
