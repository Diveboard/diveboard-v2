import {
  deleteObject, getDownloadURL, ref, StorageReference, uploadBytes,
} from 'firebase/storage';
import {
  addDoc,
  collection, doc, DocumentReference, getDoc,
  getDocs, limit, orderBy, query, startAfter, Timestamp, where,
} from '@firebase/firestore';
import { storage } from '../../storage/firebaseStorage';
import { db } from '../firebaseFirestore';
import { firestorePublicProfileService } from './firestorePublicProfileService';
import { firestoreSpotsService } from './firestoreSpotsService';
import { PathEnum } from '../firestorePaths';

export const firestoreGalleryService = {
  getBestPictures: async (bestPictures: any) => {
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

  uploadGalleryFile: async (userId: string, image: File) => {
    try {
      const storageRef = ref(storage, `${userId}/gallery/${image.name}`);
      return await uploadBytes(storageRef, image);
    } catch (e) {
      throw new Error('upload avatar error');
    }
  },

  getGalleryFile: async (reference: StorageReference) => {
    try {
      return await getDownloadURL(reference);
    } catch (e) {
      throw new Error('get avatar url error');
    }
  },

  deleteFileFromStorage: async (reference: StorageReference) => {
    try {
      return await deleteObject(reference);
    } catch (e) {
      throw new Error('get avatar url error');
    }
  },

  addImgToGallery: async (imgData: any) => {
    try {
      const { location } = await firestoreSpotsService.getSpotById(imgData.spot);
      const userRef = doc(db, `users/${imgData.user}`);
      return await addDoc(collection(db, 'gallery'), {
        ...imgData, ...location, user: userRef, spot: imgData.spot,
      });
    } catch (e) {
      console.log(e);
      throw new Error('get avatar url error');
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

};
