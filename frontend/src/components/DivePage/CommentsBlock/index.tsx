import React, {
  ChangeEvent, FC, useContext, useEffect, useRef, useState,
} from 'react';

import { useRouter } from 'next/router';
import { Timestamp } from '@firebase/firestore';
import { CommentItem } from './CommentItem';
import { DivePageTitle } from '../DivePageTitle';
import KebabButton from '../../Buttons/KebabButton';
import { Icon } from '../../Icons/Icon';
import { DivePageMobContainer } from '../DivePageMobContainer';

import styles from './styles.module.scss';
import { CommentType, UserCommentType } from '../../../firebase/firestore/models';
import { convertTimestampDate } from '../../../utils/convertTimestampDate';
import { parseDate } from '../../../utils/parseDate';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import { notify } from '../../../utils/notify';
import { firestoreCommentsService } from '../../../firebase/firestore/firestoreServices/firestoreCommentsService';
import { deleteCache } from '../../../utils/refreshCache';
import { Loader } from '../../Loader';

type Props = {
  comments: Array<CommentType>
};

export const CommentsBlock: FC<Props> = ({ comments }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [fetchedComments, setFetchedComments] = useState(comments);
  const [replyTo, setReplyTo] = useState<UserCommentType>(null);
  const [replyToWidth, setReplyToWidth] = useState(0);

  const router = useRouter();

  const { userId, diveId } = router.query;

  const { userAuth } = useContext(AuthStatusContext);

  const replyBlockRef = useRef(null);

  const commentButtonHandler = () => { // open text area for new comment
    if (!userAuth?.uid) {
      notify('Login before write comment');
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    if (replyBlockRef?.current?.clientWidth) {
      setReplyToWidth(replyBlockRef.current.clientWidth);
    }
  }, [replyBlockRef?.current?.clientWidth, replyTo]);

  const cancelButtonHandler = () => { // close new comment win
    setShow(false);
    setNewComment('');
    setReplyTo(null);
  };

  const textareaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const addCommentButtonHandler = async () => {
    try {
      setShow(false);
      setLoading(true);
      const diveComment = {
        author: userAuth.uid,
        replyTo: replyTo?.userId || null,
        comment: newComment,
        createdAt: Timestamp.fromDate(new Date()),
      };
      await firestoreCommentsService.addComment(userId as string, diveId as string, diveComment);
      await deleteCache();
      setFetchedComments([{
        ...diveComment,
        replyTo,
        author: {
          userId: userAuth.uid,
          lastName: userAuth.lastName,
          firstName: userAuth.firstName,
          photoUrl: userAuth.photoUrl,
        },
      }, ...fetchedComments]);
      setNewComment('');
      setReplyTo(null);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notify(e);
    }
  };

  const replyButtonHandler = (replyUser: UserCommentType) => {
    if (!userAuth?.uid) {
      notify('Login before write comment');
    } else {
      setShow(true);
      setReplyTo(replyUser);
    }
  };

  return (
    <div className={styles.wrapper}>
      <DivePageMobContainer>
        <DivePageTitle title="comments" />
        <div className={styles.commentWrapper}>
          {!!fetchedComments?.length && fetchedComments.map((itm) => (
            <CommentItem
              key={itm.createdAt.nanoseconds}
              author={itm.author}
              replyTo={itm.replyTo}
              datePublish={parseDate(convertTimestampDate(itm.createdAt))}
              text={itm.comment}
              replyButtonHandler={replyButtonHandler}
            />
          ))}
        </div>
        {isLoading && <Loader loading={isLoading} /> }
        {isShow ? (
          <form className={styles.form}>
            {replyTo && (
            <div
              ref={replyBlockRef}
              className={styles.replyTo}
            >
              {`@${replyTo.firstName} ${replyTo.lastName} `}
            </div>
            ) }
            <textarea
              style={{ paddingLeft: (replyTo && replyToWidth) ? `${replyToWidth + 30}px` : '20px' }}
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
