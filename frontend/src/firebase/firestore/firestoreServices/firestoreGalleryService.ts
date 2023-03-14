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
  getBestPictures: async (bestPictures: { [key: string]: DocumentReference }, length?: number) => {
    try {
      const picsIds = Object.keys(bestPictures);
      const size = length || picsIds.length;
      const picsPromises = [];

      const pics = [];
      for (let i = 0; i < size; i++) {
        const docRef = doc(db, `${PathEnum.PICTURES}/${picsIds[i]}`);
        picsPromises.push(getDoc(docRef));
      }
      await Promise.all(picsPromises)
        .then((values) => values.forEach((value) => {
          const pic = value.data();
          if (pic?.url) {
            pics.push(pic.url);
          }
        }));
      return pics;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getPicById: async (id: string, idx: number = -1) => {
    try {
      const docRef = doc(db, `${PathEnum.PICTURES}/${id}`);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      return { ...data, idx };
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getMediaUrls: async (pictures: { [key: string]: DocumentReference }) => {
    try {
      const picsIds = Object.keys(pictures);
      const picturesPromises = [];
      for (let i = 0; i < picsIds.length; i++) {
        const docRef = doc(db, `${PathEnum.PICTURES}/${picsIds[i]}`);
        picturesPromises.push(getDoc(docRef));
      }
      return await Promise.all(picturesPromises)
        .then((values) => values.map((value) => {
          const data = value.data();
          return {
            url: data.url, ref: value.ref, id: value.id, createdAt: data.createdAt,
          };
        }));
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

  deleteImageById: async (id: string, reference?: string) => {
    try {
      const imgRef = doc(db, `${PathEnum.PICTURES}/${id}`);
      if (reference && reference.includes('https://firebasestorage')) {
        const pathReference = ref(storage, reference);
        if (pathReference) {
          await deleteObject(pathReference);
        }
      }
      return await deleteDoc(imgRef);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  addImgToGallery: async (imgData: any) => {
    try {
      const spotData = imgData.spot ? await firestoreSpotsService.getSpotByRef(imgData.spot) : null;
      const userRef = doc(db, `${PathEnum.USERS}/${imgData.user}`);
      delete imgData.user;
      const res = await addDoc(collection(db, PathEnum.PICTURES), {
        ...imgData,
        locationName: spotData ? spotData.locationName : null,
        regionName: spotData ? spotData.regionName : null,
        countryName: spotData ? spotData.countryName : null,
        spotRef: spotData ? spotData.ref : null,
        userRef,
      });
      return [res.id, res];
    } catch (e) {
      throw new Error(e.message);
    }
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

      const promises = [];

      querySnapshot.forEach((img) => {
        const data = img.data();
        if (data) {
          promises.push(firestorePublicProfileService.getUserByRef(data.userRef));
          gallery.push({ ...img.data(), imageId: img.id });
        }
      });
      return await Promise.all(promises).then((values) => values.map((user, idx) => {
        if (user) {
          gallery[idx].user = {
            lastName: user.lastName || '',
            firstName: user.firstName || '',
            photoUrl: user.photoUrl || null,
            userId: user.uid,
          };
        }
        return gallery[idx];
      }));
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getGallery: async (sort: 'asc' | 'desc' = 'desc', lastDate: Timestamp = null, size = 80) => {
    try {
      const gallery = [];
      const usersPromises = [];
      const usersIds = {};
      const docRef = collection(db, PathEnum.PICTURES);
      const first = query(
        docRef,
        orderBy('createdAt', sort),
        limit(size),
      );

      const next = query(
        docRef,
        orderBy('createdAt', sort),
        startAfter(lastDate),
        limit(size),
      );

      const q = lastDate ? next : first;

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((img) => {
        const data = img.data();
        gallery.push({ ...data, imageId: img.id });
        if (data.userRef?.id) {
          if (usersIds[data.userRef.id] === undefined) {
            usersIds[data.userRef.id] = {};
            usersPromises.push(firestorePublicProfileService.getUserByRef(data.userRef));
          }
        }
      });
      await Promise.all(usersPromises)
        .then((values) => values
          .forEach((value) => {
            usersIds[value.uid] = {
              lastName: value.lastName,
              firstName: value.firstName || value.nickname,
              photoUrl: value.photoUrl,
              userId: value.uid,
            };
          }));
      return gallery.map((pic) => ({
        ...pic,
        user: usersIds[pic.userRef.id],
      }));
    } catch (e) {
      throw new Error(e.message);
    }
  },

};
