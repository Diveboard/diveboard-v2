import React, { useContext, useEffect, useState } from 'react';
import { SettingsBlock } from '../src/components/PageBlocks/SettingsBlocks';
import { PersonalInfo } from '../src/components/PageBlocks/SettingsBlocks/PersonalInfo';
import { Preferences } from '../src/components/PageBlocks/SettingsBlocks/Preferences';
import { EditContextWrapper } from '../src/components/PageBlocks/SettingsBlocks/EditContextWrapper';
import { Notification } from '../src/components/PageBlocks/SettingsBlocks/Notifications';
import { AuthStatusContext } from '../src/layouts/AuthLayout';

const Settings = () => {
  const { userAuth } = useContext(AuthStatusContext);
  console.log('here', { userAuth });
  const [uid, setUid] = useState('');

  useEffect(() => {
    if (userAuth) {
      setUid(userAuth.uid);
    }
  }, [userAuth]);

  return (
    <SettingsBlock>
      <EditContextWrapper>
        <PersonalInfo />
        <Preferences userUid={uid} />
        <Notification />
      </EditContextWrapper>
    </SettingsBlock>
  );
};

export default Settings;
