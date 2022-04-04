import React, { FC, useContext, useState } from 'react';
import { Input } from '../../../../../Input';
import { SaveThisButton } from '../SaveThisButton';
import { updateUserName } from '../../../../../../firebase/user/userService';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import styles from './styles.module.scss';

export const EditedProfileName: FC = () => {
  const { userAuth, setUserAuth } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const [value, setValue] = useState(userAuth.name);

  const saveUserName = async () => {
    await updateUserName(value);
    setUserAuth({ ...userAuth, name: value });
    setEditedSettings({ settingsBlock: '', settingsItem: '' });
  };

  return (
    <div>
      <div className={styles.inputWrapper}>
        <Input value={value} setValue={setValue} iconName="name-input" />
      </div>
      <SaveThisButton disabled={value.length < 3} onClick={saveUserName} />
    </div>
  );
};
