import React, { FC, useState } from 'react';
import { SettingsGroup } from '../SettingsGroup';
import { NotificationItem } from './NotificationItem';
import { SaveThisButton } from '../SettingsItemContent/EditedContent/SaveThisButton';
import { MarginWrapper } from '../../../MarginWrapper';

export const Notification:FC = () => {
  const [instant, setInstant] = useState(false);
  const [weeklyNotification, setWeeklyNotification] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [newsletters, setNewsletters] = useState(false);
  return (
    <SettingsGroup title="Notifications">
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
        checked={weeklyNotification}
        setChecked={setWeeklyNotification}
      />
      <NotificationItem
        title="Bi-Weekly Digest"
        description="Send me digests every two weeks of what happened on Diveboard."
        checked={weeklyDigest}
        setChecked={setWeeklyDigest}
      />
      <NotificationItem
        title="Newsletter"
        description="Keep me in the loop for more great scuba news. The average periodicity of the newsletter is once every month."
        checked={newsletters}
        setChecked={setNewsletters}
      />
      <SaveThisButton onClick={() => {}} />
    </SettingsGroup>
  );
};
