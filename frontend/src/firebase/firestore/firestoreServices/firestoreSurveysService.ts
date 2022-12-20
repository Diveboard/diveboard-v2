import { addDoc, collection } from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';
import { SurveyDataDANType } from '../models';

type SurveysTypes = 'DAN';

export const firestoreSurveysService = {
  setSurveyData: async (surveyType: SurveysTypes, data: SurveyDataDANType) => {
    try {
      const res = await addDoc(collection(db, `${firestorePaths.surveys.path}/${surveyType}`), data);
      return res.id;
    } catch (e) {
      throw new Error('set new survey error');
    }
  },
};
