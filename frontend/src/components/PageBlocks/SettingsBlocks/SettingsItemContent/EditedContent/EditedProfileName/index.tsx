import React, { FC, useContext, useState } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { SaveThisButton } from '../SaveThisButton';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import styles from './styles.module.scss';
import {
  firestorePublicProfileService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { UserSettingsType } from '../../../../../../firebase/firestore/models';
import { notify } from '../../../../../../utils/notify';
import { deleteCache } from '../../../../../../utils/refreshCache';

type Props = {
  userName: string;
  setUserInfo: React.Dispatch<React.SetStateAction<UserSettingsType>>
};

export const EditedProfileName: FC<Props> = ({ userName, setUserInfo }) => {
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [nameValue, setNameValue] = useState(userName);
  const [loading, setLoading] = useState(false);

  const saveUserName = async () => {
    if (!userAuth.uid) {
      notify('You are not authorized');
    }
    try {
      setLoading(true);
      let firstName = nameValue;
      let lastName = '';
      if (nameValue.trim().includes(' ')) {
        firstName = nameValue.substring(0, nameValue.indexOf(' '));
        lastName = nameValue.substring(nameValue.indexOf(' ') + 1);
      }
      setUserAuth({ ...userAuth, firstName, lastName });
      setUserInfo((prev) => ({ ...prev, firstName, lastName }));
      await firestorePublicProfileService.setName(firstName, lastName, userAuth.uid);
      await deleteCache();
      setLoading(false);
      setEditedSettings({ settingsBlock: '', settingsItem: '' });
    } catch (e) {
      notify(e.message);
    }
  };

  return (
    <div>
      <div className={styles.inputWrapper}>
        <Input
          value={nameValue}
          setValue={setNameValue}
          iconName="name-input"
        />
      </div>
      <SaveThisButton
        disabled={nameValue?.length < 3 || loading}
        onClick={saveUserName}
        loading={loading}
      />
    </div>
  );
};
