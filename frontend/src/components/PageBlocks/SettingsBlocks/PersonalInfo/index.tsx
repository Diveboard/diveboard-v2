import React, {
  FC, useContext, useEffect, useState,
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
import { NetworkStatusContext } from '../../../../layouts/NetworkStatus';
import coverStyles from './styles.module.scss';
import styles from '../itemContentStyle.module.scss';
import { UserSettingsType } from '../../../../firebase/firestore/models';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';
import { sameServerData } from '../../../../utils/sameServerData';
import {
  firestorePublicProfileService,
} from '../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';

type Props = {
  user: UserSettingsType;
  title?: boolean
};

export const PersonalInfo: FC<Props> = ({ user, title = true }) => {
  const isOffline = useContext(NetworkStatusContext);

  const [userInfo, setUserInfo] = useState(user);

  const {
    setUserAuth,
  } = useContext(AuthStatusContext);

  useEffect(() => {
    (async () => {
      const clientInfo = await firestorePublicProfileService
        .getUserById(user.uid);

      if (!sameServerData(clientInfo, user)) {
        setUserInfo(clientInfo);
        setUserAuth(clientInfo);
      }
    })();
  }, []);

  return (
    <div className={coverStyles.opacityWrapper}>
      <SettingsGroup title={title && 'Personal Info'}>
        <SettingsItem
          title="Profile Image"
          titleBlock="Personal Info"
          titleMuted
        >
          <ProfileImage imgSrc={userInfo?.photoUrl} />
          <EditedProfileImage imgSrc={userInfo?.photoUrl} setUserInfo={setUserInfo} />
        </SettingsItem>

        <SettingsItem
          title="Name"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{`${userInfo.firstName || ''} ${userInfo.lastName || ''}`}</span>
          <EditedProfileName userName={`${userInfo.firstName || ''} ${userInfo.lastName || ''}`} setUserInfo={setUserInfo} />
        </SettingsItem>

        <SettingsItem
          title="Login Email"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{userInfo?.email}</span>
          <EditedProfileEmail userEmail={userInfo?.email} setUserInfo={setUserInfo} />
        </SettingsItem>

        <SettingsItem
          title="Country"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{name(userInfo?.country)}</span>
          <EditedProfileCountry userCountry={userInfo?.country} setUserInfo={setUserInfo} />
        </SettingsItem>

        <SettingsItem
          title="About"
          titleBlock="Personal Info"
          titleMuted
        >
          <span className={styles.primaryItemContent}>{userInfo?.about}</span>
          <EditedProfileAbout userAbout={userInfo?.about} setUserInfo={setUserInfo} />
        </SettingsItem>
      </SettingsGroup>
      <div className={`${coverStyles.opacityCover} ${!isOffline && coverStyles.hidden}`}>
        <span>You can't edit 'Personal info' in offline mode</span>
      </div>
    </div>
  );
};
