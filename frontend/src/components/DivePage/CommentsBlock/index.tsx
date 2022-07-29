import React, { ChangeEvent, FC, useState } from 'react';

import { CommentItem } from './CommentItem';
import { DivePageTitle } from '../DivePageTitle';
import KebabButton from '../../Buttons/KebabButton';
import { Icon } from '../../Icons/Icon';
import { DivePageMobContainer } from '../DivePageMobContainer';

import styles from './styles.module.scss';

type Props = {
  allComments: {
    avatar: string;
    nameAuthor: string;
    datePublish: string;
    text: string;
  }[];
};

export const CommentsBlock: FC<Props> = ({ allComments }) => {
  const [isShow, setShow] = useState(false);
  const [newComment, setNewComment] = useState('');

  const commentButtonHandler = () => { // open text area for new comment
    setShow(true);
  };

  const cancelButtonHandler = () => { // close new comment win
    setShow(false);
    setNewComment('');
  };

  const textareaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const addCommentButtonHandler = () => {
    setShow(false);
    // console.log(newComment);
    setNewComment('');
  };

  return (
    <div className={styles.wrapper}>
      <DivePageMobContainer>
        <DivePageTitle title="comments" />
        <div className={styles.commentWrapper}>
          {allComments.map((itm) => (
            <CommentItem
              key={itm.datePublish}
              avatar={itm.avatar}
              nameAuthor={itm.nameAuthor}
              datePublish={itm.datePublish}
              text={itm.text}
            />
          ))}
        </div>
        {isShow ? (
          <form>
            <textarea
              value={newComment}
              onChange={textareaHandler}
              className={styles.commentArea}
              name="comment"
              placeholder="Write Your Comment"
              rows={7}
            />
            <div className={styles.buttonWrapper}>
              <span className={styles.disagree} onClick={cancelButtonHandler}>
                Cancel
              </span>
              <KebabButton className="popup" thirdClassName="popup__small" onClick={addCommentButtonHandler}>
                Add Comment
              </KebabButton>
            </div>
          </form>
        ) : (
          <KebabButton className="bigYellowButton" onClick={commentButtonHandler}>
            <Icon iconName="comment" size={24} />
            <span>Comment</span>
          </KebabButton>
        )}
      </DivePageMobContainer>

    </div>
  );
};
