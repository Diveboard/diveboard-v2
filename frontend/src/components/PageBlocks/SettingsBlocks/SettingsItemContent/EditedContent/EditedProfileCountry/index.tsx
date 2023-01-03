import React, { useContext, useState } from 'react';
import { code, name } from 'country-emoji';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import { Input } from '../../../../../Input/CommonInput';
import { SaveThisButton } from '../SaveThisButton';
import {
  firestorePublicProfileService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { SearchedItems } from '../../../../../Dropdown/SearchedItems';
import {
  firestoreGeoDataService,
} from '../../../../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import styles from '../EditedProfileName/styles.module.scss';

export const EditedProfileCountry = () => {
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [country, setCountry] = useState(name(userAuth.country || ''));
  const [loading, setLoading] = useState(false);

  const saveUsersCountry = async () => {
    if (!userAuth.uid) {
      throw new Error('you are not authorized');
    }
    setLoading(true);
    setUserAuth({ ...userAuth, country: code(country) });
    await firestorePublicProfileService.setCountry(code(country), userAuth.uid);
    setLoading(false);
    setEditedSettings({ settingsBlock: '', settingsItem: '' });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.inputWrapper}>
        <Input
          value={country}
          setValue={setCountry}
          placeholder="Country"
          height={48}
          width={720}
        />
        <SearchedItems
          value={country}
          setValue={setCountry}
          onSearchHandler={firestoreGeoDataService.getCountries}
        />
      </div>

      <SaveThisButton
        disabled={country?.length < 3 || loading}
        onClick={saveUsersCountry}
        loading={loading}
      />
    </div>
  );
};
