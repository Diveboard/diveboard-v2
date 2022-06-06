import React, { FC, useContext, useState } from 'react';
import { SettingsGroup } from '../SettingsGroup';
import { SettingsItem } from '../SettingsItem';
import { ProfileImage } from '../SettingsItemContent/NotEditedContent/ProfileImage';
import { EditedProfileImage } from '../SettingsItemContent/EditedContent/EditedProfileImage';
import { EditedProfileName } from '../SettingsItemContent/EditedContent/EditedProfileName';
import { EditedProfileEmail } from '../SettingsItemContent/EditedContent/EditedProfileEmail';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';
import styles from '../itemContentStyle.module.scss';
import { useNetworkState } from '../../../../hooks/useNetworkState';
import coverStyles from './styles.module.scss';

type Props = {
  title?: boolean
};

export const PersonalInfo: FC<Props> = ({ title = true }) => {
  const {
    userAuth: {
      photoURL,
      name,
      email,
    },
  } = useContext(AuthStatusContext);

  const [isOffline, setIsOffline] = useState(true);
  useNetworkState(setIsOffline);

  return (
    <div className={coverStyles.opacityWrapper}>
      <SettingsGroup title={title && 'Personal Info'}>
        <SettingsItem
          title="Profile Image"
          titleBlock="Personal Info"
          titleMuted
        >
          <ProfileImage imgSrc={photoURL} />
          <EditedProfileImage imgSrc={photoURL} />
        </SettingsItem>

        <SettingsItem
          title="Name"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{name}</span>
          <EditedProfileName />
        </SettingsItem>

        <SettingsItem
          title="Login Email"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{email}</span>
          <EditedProfileEmail />
        </SettingsItem>
      </SettingsGroup>
      <div className={`${coverStyles.opacityCover} ${!isOffline && coverStyles.hidden}`}>
        <span>You can't edit 'Personal info' in offline mode</span>
      </div>
    </div>
  );
};
