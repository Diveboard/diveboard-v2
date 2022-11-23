import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpotType } from '../models';
import { Coords } from '../../../types';
import { firestorePaths } from '../firestorePaths';

export const firestoreSpotsService = {
  getSpotCoordsById: async (spotId: string) => {
    try {
      const docRef = doc(db, firestorePaths.spots.path, spotId);
      const docSnap = await getDoc(docRef);
      const { lat, lng } = docSnap.data();
      return {
        lat,
        lng,
      };
    } catch (e) {
      console.log(e);
      throw new Error('get spot by id error');
    }
  },

  updateSpotById: async (spotId: string, data: { [p: string]: any }) => {
    try {
      const docRef = doc(db, firestorePaths.spots.path, spotId);
      await setDoc(docRef, { ...data }, { merge: true });
      return true;
    } catch (e) {
      console.log(e);
      throw new Error('get spot by id error');
    }
  },

  getSpotById: async (spotId: string) => {
    try {
      const docRef = doc(db, firestorePaths.spots.path, spotId);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (e) {
      console.log(e);
      throw new Error('get spot by id error');
    }
  },

  getSpotNameById: async (spotId: string) => {
    try {
      const docRef = doc(db, firestorePaths.spots.path, spotId);
      const docSnap = await getDoc(docRef);
      const { location } = docSnap.data();
      return `${location.location}, ${location.country}, ${location.region}`;
    } catch (e) {
      console.log(e);
      throw new Error('get spot by id error');
    }
  },

  setNewSpot: async (newSpot: SpotType) => {
    try {
      const res = await addDoc(collection(db, firestorePaths.spots.path), newSpot);
      return res.id;
    } catch (e) {
      throw new Error('set new spot error');
    }
  },

  getAllSpotsInMapViewport: async (bounds: {
    ne: Coords;
    sw: Coords;
  }) => {
    try {
      const docRef = collection(db, firestorePaths.spots.path);
      const q = query(
        docRef,
        where('lat', '>', bounds.sw.lat),
        where('lat', '<', bounds.ne.lat),
      );
      const querySnapshot = await getDocs(q);
      const spots = [];
      querySnapshot.forEach((document) => {
        const {
          lat,
          lng,
          name,
          stats: { divesLogged },
          zoom,
        } = document.data();
        const { id } = document;
        if (lng > bounds.sw.lng && lng < bounds.ne.lng) {
          spots.push({
            id,
            name,
            divesLogged,
            zoom,
            lat,
            lng,
          });
        }
      });
      return spots;
    } catch (e) {
      throw new Error('get spots by bounds error');
    }
  },

  deleteSpot: async (id: string) => {
    try {
      await deleteDoc(doc(db, firestorePaths.spots.path, id));
    } catch (e) {
      throw new Error('delete spot error');
    }
  },
};
