import { doc, getDoc, setDoc } from '@firebase/firestore';
import { PreferencesType } from '../models';
import { db } from '../firebaseFirestore';

export const firestorePreferencesService = {
  setDefaultPreferences: async (userId: string) => {
    try {
      const ref = doc(db, 'user-preferences', userId);
      const defaultPreferences: PreferencesType = {
        privacy: { divesPublic: true },
        scientificData: {
          shareData: true,
          shareNotes: false,
        },
        language: 'English',
        unitSystem: 'metric',
      };
      await setDoc(ref, { ...defaultPreferences }, { merge: true });
    } catch (e) {
      throw new Error('set default preferences error');
    }
  },

  setPrivacy: async (divesPublic: boolean, userId: string) => {
    try {
      const ref = doc(db, 'user-preferences', userId);
      await setDoc(ref, { privacy: { divesPublic } }, { merge: true });
    } catch (e) {
      throw new Error('set privacy error');
    }
  },

  setScientificData: async (scientificData: Pick<PreferencesType, 'scientificData'>, userId: string) => {
    try {
      const ref = doc(db, 'user-preferences', userId);
      await setDoc(ref, { ...scientificData }, { merge: true });
    } catch (e) {
      throw new Error('set scientific data error');
    }
  },

  setLanguage: async (language: 'English' | 'Italian' | 'Spanish' | 'German', userId: string) => {
    try {
      const ref = doc(db, 'user-preferences', userId);
      await setDoc(ref, { language }, { merge: true });
    } catch (e) {
      throw new Error('set language error');
    }
  },

  setUnitSystem: async (unitSystem: 'metric' | 'imperial', userId: string) => {
    try {
      const ref = doc(db, 'user-preferences', userId);
      await setDoc(ref, { unitSystem }, { merge: true });
    } catch (e) {
      throw new Error('set unit system error');
    }
  },

  getAllPreferences: async (userId: string) => {
    const docRef = doc(db, 'user-preferences', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  },
};
