import {
  collection,
  doc, getDoc, getDocs, query, setDoc,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SurveyDanType } from '../../../types';

export const firestoreSurveyService = {
  getSurveyById: async (userId: string, surveyId: string) => {
    try {
      const docRef = doc(db, `test-surveys/${userId}/dan/${surveyId}`);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (e) {
      console.log(e.message);
      throw new Error('get survey by id error');
    }
  },
  addSurvey: async (userId: string, diveId: string, survey: SurveyDanType, saveToDAN: boolean) => {
    try {
      const surveyRef = doc(collection(db, `test-surveys/${userId}/dan`));
      if (!survey.sent) {
        survey.sent = saveToDAN;
      }
      await setDoc(surveyRef, { ...survey, diveId }, { merge: true });
      if (!survey.sent && saveToDAN) {
        // TODO: sent email
        console.log('SEND EMAIL');
      }
      return surveyRef.id;
    } catch (e) {
      console.log(e.message);
      throw new Error('add survey by id error');
    }
  },
  // TODO: Update survey
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
        docRef = doc(db, `test-surveys/${userId}/dan`, surveyId);
      } else {
        docRef = doc(collection(db, `test-surveys/${userId}/dan`));
      }
      if (!survey.sent) {
        survey.sent = saveToDAN;
      }
      await setDoc(docRef, { ...survey, diveId }, { merge: true });
      if (!survey.sent && saveToDAN) {
        // TODO: sent email
        console.log('SEND EMAIL');
      }
      console.log(docRef.id);
      return docRef.id;
    } catch (e) {
      console.log(e.message);
      throw new Error('update survey by id error');
    }
  },

  getUserSurveys: async (userId: string) => {
    try {
      const surveyRef = collection(db, `test-surveys/${userId}/dan`);
      const q = query(
        surveyRef,
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (e) {
      console.log(e.message);
      throw new Error('add survey by id error');
    }
  },
};
