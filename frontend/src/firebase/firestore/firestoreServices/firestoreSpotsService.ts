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
      return { ...data, ref: docSnap.ref, id: docSnap.id } as any;
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

  getAllSpotsInMapViewport: async (bounds: Bounds, limitNumber: number) => {
    try {
      const docRef = collection(db, PathEnum.SPOTS);
      const q = query(
        docRef,
        // where('lat', '<', bounds.ne.lat),
        // where('lat', '>', bounds.sw.lat),
        where('lng', '<', bounds.ne.lng),
        where('lng', '>', bounds.sw.lng),
        limit(limitNumber),
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
          bestPictures,
        } = document.data();
        const { id } = document;
        if (lat < bounds.ne.lat && lat > bounds.sw.lat && name) {
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
            bestPictures,
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
