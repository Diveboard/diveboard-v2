import React, { FC } from 'react';

import { useRouter } from 'next/router';
import KebabButton from '../../../Buttons/KebabButton';
import { ProfileImage } from '../../../PageBlocks/SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';

import styles from './styles.module.scss';
import { UserCommentType } from '../../../../firebase/firestore/models';

type Props = {
  author: UserCommentType;
  replyTo: UserCommentType;
  datePublish: string;
  text: string;
  replyButtonHandler: (replyTo: UserCommentType) => void;
};

export const CommentItem: FC <Props> = ({
  author, replyTo, datePublish, text, replyButtonHandler,
}) => {
  const reportButtonHandler = () => {};

  const router = useRouter();

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.user} onClick={() => author?.userId && router.push(`/logbook/${author.userId}`)}>
        <ProfileImage imgSrc={author?.photoUrl} size={44} />
        <div className={styles.userWrapper}>
          <div className={styles.nameAuthor}>
            {`${author?.firstName || ''} ${author?.lastName || ''}`}
          </div>
          <div className={styles.datePublish}>{datePublish}</div>
        </div>
      </div>
      <div className={styles.text}>
        {replyTo && (
        <span className={styles.replyTo}>
          {`@${replyTo.firstName} ${replyTo.lastName} `}
        </span>
        )}
        {text}
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.buttonsSubwrapper}>
          <KebabButton onClick={reportButtonHandler} className="more">Report</KebabButton>
          <KebabButton onClick={() => replyButtonHandler(author)} className="more">Reply</KebabButton>
        </div>
        {/* <KebabButton className="more" onClick={likeButtonHandler}> */}
        {/*  <Icon iconName="like-outline" size={16} /> */}
        {/* </KebabButton> */}
      </div>
    </div>
  );
};
