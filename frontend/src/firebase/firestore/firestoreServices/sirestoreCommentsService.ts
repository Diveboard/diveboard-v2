import {
  collection, query, getDocs,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';

export const firestoreCommentsService = {

  // setComments: (comment: string, userId: string, diveId: string) => {
  //   // try {
  //   //   const ref = doc(db, 'notifications', userId);
  //   //   setDoc(ref, { ...notifications }, { merge: true });
  //   // } catch (e) {
  //   //   throw new Error('set  comments error');
  //   // }
  // },

  getComments: async (userId: string, diveId: string) => {
    try {
      const q = query((collection(db, `comments/${userId}/${diveId}`)));
      const querySnapshot = await getDocs(q);
      console.log({ querySnapshot });

      querySnapshot.forEach((docc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(docc.id, ' => ', docc.data());
      });
    } catch (e) {
      console.log({ e });
      throw new Error('get comments error');
    }
  },
};
