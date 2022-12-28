import React, {
  FC, useContext,
} from 'react';
import { name } from 'country-emoji';
import { SettingsGroup } from '../SettingsGroup';
import { SettingsItem } from '../SettingsItem';
import { ProfileImage } from '../SettingsItemContent/NotEditedContent/ProfileImage';
import { EditedProfileImage } from '../SettingsItemContent/EditedContent/EditedProfileImage';
import { EditedProfileName } from '../SettingsItemContent/EditedContent/EditedProfileName';
import { EditedProfileEmail } from '../SettingsItemContent/EditedContent/EditedProfileEmail';
import { EditedProfileCountry } from '../SettingsItemContent/EditedContent/EditedProfileCountry';
import { EditedProfileAbout } from '../SettingsItemContent/EditedContent/EditedProfileAbout';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';
import { NetworkStatusContext } from '../../../../layouts/NetworkStatus';
import coverStyles from './styles.module.scss';
import styles from '../itemContentStyle.module.scss';

type Props = {
  title?: boolean
};

export const PersonalInfo: FC<Props> = ({ title = true }) => {
  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const isOffline = useContext(NetworkStatusContext);

  return (
    <div className={coverStyles.opacityWrapper}>
      <SettingsGroup title={title && 'Personal Info'}>
        <SettingsItem
          title="Profile Image"
          titleBlock="Personal Info"
          titleMuted
        >
          <ProfileImage imgSrc={userAuth?.photoUrl} />
          <EditedProfileImage imgSrc={userAuth?.photoUrl} />
        </SettingsItem>

        <SettingsItem
          title="Name"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{`${userAuth.firstName || ''} ${userAuth.lastName || ''}`}</span>
          <EditedProfileName />
        </SettingsItem>

        <SettingsItem
          title="Login Email"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{userAuth?.email}</span>
          <EditedProfileEmail />
        </SettingsItem>

        <SettingsItem
          title="Country"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{name(userAuth?.country)}</span>
          <EditedProfileCountry />
        </SettingsItem>

        <SettingsItem
          title="About"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{userAuth?.about}</span>
          <EditedProfileAbout />
        </SettingsItem>
      </SettingsGroup>
      <div className={`${coverStyles.opacityCover} ${!isOffline && coverStyles.hidden}`}>
        <span>You can't edit 'Personal info' in offline mode</span>
      </div>
    </div>
  );
};
