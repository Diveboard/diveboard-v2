import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { SettingsGroup } from '../SettingsGroup';
import { NotificationItem } from './NotificationItem';
import { SaveThisButton } from '../SettingsItemContent/EditedContent/SaveThisButton';
import { MarginWrapper } from '../../../MarginWrapper';
import { NotificationsType } from '../../../../firebase/firestore/models';
import {
  firestoreNotificationService,
} from '../../../../firebase/firestore/firestoreServices/firestoreNotificationService';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';
import { EditContext } from '../EditContextWrapper';
import { sameServerData } from '../../../../utils/sameServerData';
import editedStyles from '../editidStyle.module.scss';

type Props = {
  notifications: NotificationsType
  title?: boolean
};

export const Notification: FC<Props> = ({
  notifications,
  title = true,
}) => {
  const [instant, setInstant] = useState(notifications.instant);
  const [
    biWeeklyNotifications,
    setBiWeeklyNotifications,
  ] = useState(notifications.biWeeklyNotifications);
  const [biWeeklyDigest, setBiWeeklyDigest] = useState(notifications.biWeeklyDigest);
  const [newsletters, setNewsletters] = useState(notifications.newsletters);

  const [loading, setLoading] = useState(false);
  const { userAuth } = useContext(AuthStatusContext);
  const { editedSettings } = useContext(EditContext);

  const styles = editedSettings.settingsBlock ? editedStyles.edited : editedStyles.active;

  useEffect(() => {
    (async () => {
      const clientNotifications = await firestoreNotificationService
        .getNotifications(userAuth.uid) as NotificationsType;

      if (!sameServerData(notifications, clientNotifications)) {
        setInstant(clientNotifications.instant);
        setBiWeeklyNotifications(clientNotifications.biWeeklyNotifications);
        setBiWeeklyDigest(clientNotifications.biWeeklyDigest);
        setNewsletters(clientNotifications.newsletters);
      }
    })();
  }, []);

  const setNotifications = async () => {
    setLoading(true);
    const notificationData: NotificationsType = {
      instant,
      biWeeklyNotifications,
      biWeeklyDigest,
      newsletters,
    };
    await firestoreNotificationService.setNotifications(notificationData, userAuth.uid);
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('');
    //   }, 700);
    // });
    setLoading(false);
  };

  return (
    <SettingsGroup title={title && 'Notifications'}>
      <div className={styles}>
        <MarginWrapper top={20} />
        <NotificationItem
          title="Instant Notifications"
          description="Notify me each time someone likes, comments my activities on diveboard."
          checked={instant}
          setChecked={setInstant}
        />
        <NotificationItem
          title="Bi-Weekly Notifications"
          description="Sum up all notifications for the last two weeks. Likes, comments, feedback, everything is there!"
          checked={biWeeklyNotifications}
          setChecked={setBiWeeklyNotifications}
        />
        <NotificationItem
          title="Bi-Weekly Digest"
          description="Send me digests every two weeks of what happened on Diveboard."
          checked={biWeeklyDigest}
          setChecked={setBiWeeklyDigest}
        />
        <NotificationItem
          title="Newsletter"
          description="Keep me in the loop for more great scuba news. The average periodicity of the newsletter is once every month."
          checked={newsletters}
          setChecked={setNewsletters}
        />
        <SaveThisButton onClick={setNotifications} loading={loading} disabled={loading} />
      </div>

    </SettingsGroup>
  );
};
