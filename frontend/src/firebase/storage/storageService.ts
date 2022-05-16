import {
  ref, uploadBytes, getBlob, getDownloadURL, StorageReference,
} from 'firebase/storage';
import { storage } from './firebaseStorage';

export const uploadAvatar = (userUid: string, avatar: File) => {
  try {
    const storageRef = ref(storage, `${userUid}/avatar/userAvatar`);
    return uploadBytes(storageRef, avatar);
  } catch (e) {
    throw new Error('upload avatar error');
  }
};

export const getAvatarUrl = async (reference: StorageReference) => {
  try {
    return await getDownloadURL(reference);
  } catch (e) {
    throw new Error('get avatar url error');
  }
};

export const downloadAvatar = async (reference: StorageReference) => {
  try {
    return await getBlob(reference);
  } catch (e) {
    throw new Error('download avatar error');
  }
};
