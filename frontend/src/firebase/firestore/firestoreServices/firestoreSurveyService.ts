import {
  collection,
  doc, DocumentReference, getDoc, setDoc,
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
      if (!survey.sent && saveToDAN) {
        await firestoreLogbookService.addSurveyToLogbook(userId, surveyRef);
        // TODO: sent email
        console.log('SEND EMAIL');
      }
      if (!survey.sent) {
        survey.sent = saveToDAN;
      }
      await setDoc(surveyRef, { dan: { ...survey, diveRef: ref } }, { merge: true });
      return surveyRef;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  updateSurvey: async (
    userId: string,
    surveyRef: DocumentReference,
    diveId: string,
    survey: SurveyDanType,
    saveToDAN: boolean,
  ) => {
    try {
      let docRef;
      if (surveyRef) {
        docRef = surveyRef;
      } else {
        docRef = doc(collection(db, `${PathEnum.SURVEYS}/${userId}/dan`));
      }
      if (!survey.sent && saveToDAN) {
        await firestoreLogbookService.addSurveyToLogbook(userId, surveyRef);
        // TODO: sent email
        console.log('SEND EMAIL');
      }
      if (!survey.sent) {
        survey.sent = saveToDAN;
      }
      await setDoc(docRef, { dan: { ...survey } }, { merge: true });
      return docRef;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
