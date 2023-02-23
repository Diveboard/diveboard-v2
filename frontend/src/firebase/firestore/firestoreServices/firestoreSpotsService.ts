import {
  addDoc, collection, deleteDoc, doc,
  DocumentReference, getDoc, getDocs, limit, query, setDoc, where,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpotType } from '../models';
import { Bounds } from '../../../types';
import { PathEnum } from '../firestorePaths';

export const firestoreSpotsService = {
  updateSpotById: async (spotId: string, data: SpotType) => {
    try {
      const docRef = doc(db, PathEnum.SPOTS, spotId);
      await setDoc(docRef, { ...data }, { merge: true });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpotByRef: async (spotRef: DocumentReference) => {
    try {
      const docSnap = await getDoc(spotRef);
      const data = docSnap.data();
      if (!data) {
        return null;
      }
      return { ...data, ref: docSnap.ref } as any;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpotById: async (spotId: string) => {
    try {
      const docRef = doc(db, PathEnum.SPOTS, spotId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (!data) {
        return null;
      }
      return { ...data, ref: docSnap.ref } as any;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  setNewSpot: async (newSpot: SpotType) => {
    try {
      const res = await addDoc(collection(db, PathEnum.SPOTS), newSpot);
      return res.id;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getAllSpotsInMapViewport: async (bounds: Bounds) => {
    try {
      const docRef = collection(db, PathEnum.SPOTS);
      const q = query(
        docRef,
        where('lat', '<', bounds.ne.lat),
        where('lat', '>', bounds.sw.lat),
        // where('lng', '<', bounds.ne.lng),
        // where('lng', '>', bounds.sw.lng),
        limit(2500),
      );
      const querySnapshot = await getDocs(q);
      const spots = [];
      querySnapshot.forEach((document) => {
        const {
          lat,
          lng,
          name,
          dives,
          stats: { divesLogged },
          locationName,
          regionName,
          countryName,
          zoom,
          averageDepth,
        } = document.data();
        const { id } = document;
        if (lng < bounds.ne.lng && lng > bounds.sw.lng && name) {
          spots.push({
            id,
            name,
            divesLogged,
            dives: dives.length || 1,
            location: {
              region: regionName,
              country: countryName,
              location: locationName,
            },
            averageDepth,
            zoom,
            lat,
            lng,
          });
        }
      });
      return spots;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  deleteSpot: async (id: string) => {
    try {
      await deleteDoc(doc(db, PathEnum.SPOTS, id));
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
