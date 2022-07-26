import React, { FC } from 'react';

import KebabButton from '../../../Buttons/KebabButton';
import { Icon } from '../../../Icons/Icon';
import { ProfileImage } from '../../../PageBlocks/SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';

import styles from './styles.module.scss';

type Props = {
  avatar: string
  nameAuthor : string
  datePublish: string
  text: string
};

export const CommentItem: FC <Props> = ({
  avatar, nameAuthor, datePublish, text,
}) => {
  const reportButtonHandler = () => {};

  const replyButtonHandler = () => {};

  const likeButtonHandler = () => {};

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.user}>
        <ProfileImage imgSrc={avatar} size={44} />
        <div className={styles.userWrapper}>
          <div className={styles.nameAuthor}>
            {nameAuthor}
          </div>
          <div className={styles.datePublish}>{datePublish}</div>
        </div>
      </div>
      <div className={styles.text}>{text}</div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.buttonsSubwrapper}>
          <KebabButton onClick={reportButtonHandler} className="more">Report</KebabButton>
          <KebabButton onClick={replyButtonHandler} className="more">Reply</KebabButton>
        </div>
        <KebabButton className="more" onClick={likeButtonHandler}>
          <Icon iconName="like-outline" size={16} />
        </KebabButton>
      </div>
    </div>
  );
};
