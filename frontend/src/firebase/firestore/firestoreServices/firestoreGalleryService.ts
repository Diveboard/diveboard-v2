import {
  deleteObject, getDownloadURL, ref, StorageReference, uploadBytes,
} from 'firebase/storage';
import { storage } from '../../storage/firebaseStorage';

export const firestoreGalleryService = {
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

};
