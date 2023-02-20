import {
  collection,
  doc, DocumentReference, getDoc, getDocs, query, setDoc,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SurveyDanType } from '../../../types';
import { PathEnum } from '../firestorePaths';
import { firestoreLogbookService } from './firestoreLogbookService';

export const firestoreSurveyService = {
  getSurveyById: async (userId: string, docRef: DocumentReference) => {
    try {
      const docSnap = await getDoc(docRef);
      return docSnap.data()?.dan;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  addSurvey: async (
    userId: string,
    ref: DocumentReference,
    survey: SurveyDanType,
    saveToDAN: boolean,
  ) => {
    try {
      const surveyRef = doc(collection(db, `${PathEnum.SURVEYS}/${userId}/dan`));
      if (!survey.sent) {
        survey.sent = saveToDAN;
      }
      await setDoc(surveyRef, { dan: { ...survey, diveRef: ref } }, { merge: true });
      if (!survey.sent && saveToDAN) {
        // TODO: sent email
        console.log('SEND EMAIL');
      }
      await firestoreLogbookService.addSurveyToLogbook(userId, surveyRef);

      return surveyRef;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  updateSurvey: async (
    userId: string,
    surveyId: string,
    diveId: string,
    survey: SurveyDanType,
    saveToDAN: boolean,
  ) => {
    try {
      let docRef;
      if (surveyId) {
        docRef = doc(db, `${PathEnum.SURVEYS}/${userId}/dan`, surveyId);
      } else {
        docRef = doc(collection(db, `${PathEnum.SURVEYS}/${userId}/dan`));
      }
      if (!survey.sent) {
        survey.sent = saveToDAN;
      }
      await setDoc(docRef, { dan: { ...survey } }, { merge: true });
      if (!survey.sent && saveToDAN) {
        // TODO: sent email
        console.log('SEND EMAIL');
      }
      await firestoreLogbookService.updateSurveyInLogbook(userId, docRef);
      return docRef;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getUserSurveys: async (userId: string) => {
    try {
      const surveyRef = collection(db, `${PathEnum.SURVEYS}/${userId}/dan`);
      const q = query(
        surveyRef,
      );
      const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((s) => deleteDoc(s.ref));
      return querySnapshot.size;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
