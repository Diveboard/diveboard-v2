import React, { FC, useContext, useState } from 'react';
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
import { UserSettingsType } from '../../../../../../firebase/firestore/models';
import { notify } from '../../../../../../utils/notify';
import { deleteCache } from '../../../../../../utils/refreshCache';

type Props = {
  userCountry: string;
  setUserInfo: React.Dispatch<React.SetStateAction<UserSettingsType>>
};

export const EditedProfileCountry: FC<Props> = ({ userCountry, setUserInfo }) => {
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [country, setCountry] = useState(name(userCountry || ''));
  const [loading, setLoading] = useState(false);

  const saveUsersCountry = async () => {
    if (!userAuth.uid) {
      notify('You are not authorized');
    }
    try {
      setLoading(true);
      setUserAuth({ ...userAuth, country: code(country) });
      await firestorePublicProfileService.setCountry(code(country), userAuth.uid);
      setUserInfo((prev) => ({ ...prev, country: code(country) }));

      setLoading(false);
      await deleteCache();
      setEditedSettings({ settingsBlock: '', settingsItem: '' });
    } catch (e) {
      notify('Something went wrong');
    }
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
