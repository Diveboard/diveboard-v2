import { doc, getDoc, setDoc } from '@firebase/firestore';
import { PreferencesType, UnitSystem, ShareData } from '../models';
import { db } from '../firebaseFirestore';
import { PathEnum } from '../firestorePaths';

const getPath = (userId: string) => `${PathEnum.USERS}/${userId}`;

export const firestorePreferencesService = {
  setDefaultPreferences: async (userId: string) => {
    try {
      const ref = doc(db, getPath(userId));
      const defaultPreferences: PreferencesType = {
        privacy: { divesPublic: true },
        scientificData: {
          shareData: 'OPEN_SHARE',
          shareNotes: false,
        },
        unitSystem: 'METRIC',
      };
      await setDoc(ref, {
        settings: { preferences: { ...defaultPreferences }, language: 'en' },
      }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  setPrivacy: (divesPublic: boolean, userId: string) => {
    try {
      const ref = doc(db, getPath(userId));
      setDoc(ref, { settings: { preferences: { privacy: { divesPublic } } } }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  setScientificData: (
    scientificData: { shareData: ShareData, shareNotes: boolean },
    userId: string,
  ) => {
    try {
      const ref = doc(db, getPath(userId));
      setDoc(ref, {
        settings: { preferences: { scientificData: { ...scientificData } } },
      }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  setLanguage: (language: string, userId: string) => {
    try {
      const ref = doc(db, getPath(userId));
      setDoc(ref, { settings: { language: language.slice(0, 2).toLowerCase() } }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  setUnitSystem: (unitSystem: UnitSystem, userId: string) => {
    try {
      const ref = doc(db, getPath(userId));
      setDoc(ref, { settings: { preferences: { unitSystem } } }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getUserSettings: async (userId: string) => {
    try {
      const docRef = doc(db, getPath(userId));
      const docSnap = await getDoc(docRef);
      return docSnap.data().settings;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
