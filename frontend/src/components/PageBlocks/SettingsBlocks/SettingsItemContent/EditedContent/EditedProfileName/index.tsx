import React, { FC, useContext, useState } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { SaveThisButton } from '../SaveThisButton';
import { updateUserName } from '../../../../../../firebase/user/userService';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import styles from './styles.module.scss';
import {
  firestorePublicProfileService,
} from '../../../../../../firebase/firestore/firestoreServises/firestorePublicProfileService';

export const EditedProfileName: FC = () => {
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [nameValue, setNameValue] = useState(userAuth.name);

  const saveUserName = async () => {
    if (!userAuth.uid) {
      throw new Error('you are not authorized');
    }

    await updateUserName(nameValue);
    setUserAuth({ ...userAuth, name: nameValue });
    await firestorePublicProfileService.setName(nameValue, userAuth.uid);
    setEditedSettings({ settingsBlock: '', settingsItem: '' });
  };

  return (
    <div>
      <div className={styles.inputWrapper}>
        <Input value={nameValue} setValue={setNameValue} iconName="name-input" padding="11px 16px 11px 54px" />
      </div>
      <SaveThisButton disabled={nameValue?.length < 3} onClick={saveUserName} />
    </div>
  );
};
