import {
  collection, query, getDocs, orderBy, doc, setDoc, limit,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { firestorePublicProfileService } from './firestorePublicProfileService';

export const firestoreCommentsService = {
  getComments: async (userId: string, diveId: string) => {
    try {
      const comments = [];
      const commentsRef = collection(db, `Test_Dives/${userId}/userDives/${diveId}/comments`);
      const q = query(
        commentsRef,
        orderBy('created_at', 'desc'),
      );
      const commentsSnap = await getDocs(q);
      commentsSnap.forEach((commentDoc) => (
        comments.push(commentDoc.data())
      ));

      for (let i = 0; i < comments.length; i++) {
        if (comments[i].author) {
          const {
            lastName,
            firstName,
            photoUrl,
            // eslint-disable-next-line no-await-in-loop
          } = await firestorePublicProfileService.getUserById(comments[i].author.id);
          comments[i].author = {
            lastName, firstName, photoUrl, userId: comments[i].author.id,
          };
        }
        if (comments[i].replyTo) {
          const {
            lastName,
            firstName,
            photoUrl,
            // eslint-disable-next-line no-await-in-loop
          } = await firestorePublicProfileService.getUserById(comments[i].replyTo.id);
          comments[i].replyTo = {
            lastName,
            firstName,
            photoUrl,
            userId: comments[i].replyTo.id,
          };
        }
      }
      return comments;
    } catch (e) {
      console.log({ e });
      throw new Error('get comments error');
    }
  },

  addComment: async (userId: string, diveId: string, comment) => {
    try {
      const ref = doc(collection(db, `Test_Dives/${userId}/userDives/${diveId}/comments`));
      const authorRef = doc(db, `users/${comment.author}`);
      const replyToRef = comment.replyTo ? doc(db, `users/${comment.replyTo}`) : null;
      await setDoc(ref, { ...comment, author: authorRef, replyTo: replyToRef }, { merge: true });
    } catch (e) {
      console.log({ e });
      throw new Error('add comment error');
    }
  },
};
