import { doc, getDoc, setDoc } from '@firebase/firestore';
import { PreferencesType, UnitSystem, ShareData } from '../models';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';

// const preferencesSegment = firestorePaths.users; //.settings.preferences.segment;
const getPath = (userId: string) => `${firestorePaths.users.path}/${userId}`; // ${firestorePaths.users.settings.segment}`;

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
      throw new Error('set default preferences error');
    }
  },

  setPrivacy: (divesPublic: boolean, userId: string) => {
    try {
      const ref = doc(db, getPath(userId));
      setDoc(ref, { settings: { preferences: { privacy: { divesPublic } } } }, { merge: true });
    } catch (e) {
      throw new Error('set privacy error');
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
      throw new Error('set scientific data error');
    }
  },

  setLanguage: (language: string, userId: string) => {
    try {
      const ref = doc(db, getPath(userId));
      setDoc(ref, { settings: { language: language.slice(0, 2).toLowerCase() } }, { merge: true });
    } catch (e) {
      throw new Error('set language error');
    }
  },

  setUnitSystem: (unitSystem: UnitSystem, userId: string) => {
    try {
      const ref = doc(db, getPath(userId));
      setDoc(ref, { settings: { preferences: { unitSystem } } }, { merge: true });
    } catch (e) {
      throw new Error('set unit system error');
    }
  },

  getUserSettings: async (userId: string) => {
    const docRef = doc(db, getPath(userId));
    const docSnap = await getDoc(docRef);
    return docSnap.data().settings;
  },
};
