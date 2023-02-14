import {
  deleteObject, getDownloadURL, ref, StorageReference, uploadBytes,
} from 'firebase/storage';
import {
  addDoc,
  collection, deleteDoc, doc, DocumentReference, getDoc,
  getDocs, limit, orderBy, query, startAfter, Timestamp, where,
} from '@firebase/firestore';
import { storage } from '../../storage/firebaseStorage';
import { db } from '../firebaseFirestore';
import { firestorePublicProfileService } from './firestorePublicProfileService';
import { firestoreSpotsService } from './firestoreSpotsService';
import { PathEnum } from '../firestorePaths';

export const firestoreGalleryService = {
  getBestPictures: async (bestPictures: { [key: string]: DocumentReference }) => {
    try {
      const picsIds = Object.keys(bestPictures);
      const pics = [];
      for (let i = 0; i < picsIds.length; i++) {
        const docRef = doc(db, `${PathEnum.PICTURES}/${picsIds[i]}`);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data) {
          pics.push(data.url);
        }
      }
      return pics;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getMediaUrls: async (pictures: { [key: string]: DocumentReference }) => {
    try {
      const picsIds = Object.keys(pictures);
      const pics = [];
      for (let i = 0; i < picsIds.length; i++) {
        const docRef = doc(db, `${PathEnum.PICTURES}/${picsIds[i]}`);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data) {
          pics.push({ url: data.url, ref: docSnap.ref, id: docSnap.id });
        }
      }
      return pics;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  uploadGalleryFile: async (userId: string, image: File) => {
    try {
      const storageRef = ref(storage, `${userId}/gallery/${image.name}`);
      return await uploadBytes(storageRef, image);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getGalleryFile: async (reference: StorageReference) => {
    try {
      return await getDownloadURL(reference);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  deleteFileFromStorage: async (reference: StorageReference) => {
    try {
      return await deleteObject(reference);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  deleteImageById: async (id: string, reference: string) => {
    try {
      const imgRef = doc(db, `${PathEnum.PICTURES}/${id}`);
      const pathReference = ref(storage, reference);
      if (pathReference) {
        await deleteObject(pathReference);
      }
      return await deleteDoc(imgRef);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  addImgToGallery: async (imgData: any) => {
    try {
      const spotData = imgData.spot ? await firestoreSpotsService.getSpotById(imgData.spot) : null;
      const userRef = doc(db, `${PathEnum.USERS}/${imgData.user}`);
      const res = await addDoc(collection(db, PathEnum.PICTURES), {
        ...imgData,
        locationName: spotData ? spotData.location.location : null,
        regionName: spotData ? spotData.location.region : null,
        countryName: spotData ? spotData.location.country : null,
        spotRef: spotData ? spotData.ref : null,
        userRef,
      });
      return [res.id, res];
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getImageByRef: async (reference: DocumentReference) => {
    const docSnap = await getDoc(reference);
    return docSnap.data();
  },

  getGalleryByLocation: async (searchName: string) => {
    try {
      const upperGeonames = searchName.trim()
        .charAt(0)
        .toUpperCase() + searchName.slice(1);
      const gallery = [];
      const docRef = collection(db, PathEnum.PICTURES);
      const q = query(
        docRef,
        where('locationName', '>=', upperGeonames),
        limit(150),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((img) => gallery.push({ ...img.data(), imageId: img.id }));
      for (let i = 0; i < gallery.length; i++) {
        if (gallery[i].user) {
          const {
            lastName,
            firstName,
            photoUrl,
            // eslint-disable-next-line no-await-in-loop
          } = await firestorePublicProfileService.getUserById(gallery[i].user.id);
          gallery[i].user = {
            lastName,
            firstName,
            photoUrl,
            userId: gallery[i].user.id,
          };
        }
      }
      return gallery;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getGallery: async (sort: 'asc' | 'desc' = 'desc', lastDate: Timestamp = null) => {
    try {
      const gallery = [];
      const docRef = collection(db, PathEnum.PICTURES);
      const first = query(
        docRef,
        orderBy('createdAt', sort),
        limit(80),
      );

      const next = query(
        docRef,
        orderBy('createdAt', sort),
        startAfter(lastDate),
        limit(150),
      );

      const q = lastDate ? next : first;

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((img) => gallery.push({ ...img.data(), imageId: img.id }));
      for (let i = 0; i < gallery.length; i++) {
        if (gallery[i].user) {
          const {
            lastName,
            firstName,
            photoUrl,
            // eslint-disable-next-line no-await-in-loop
          } = await firestorePublicProfileService.getUserByRef(gallery[i].userRef);
          gallery[i].user = {
            lastName,
            firstName,
            photoUrl,
            userId: gallery[i].user.id,
          };
        }
      }
      return gallery;
    } catch (e) {
      throw new Error(e.message);
    }
  },

};
