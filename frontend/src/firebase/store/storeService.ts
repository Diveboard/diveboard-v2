import {
  ref, uploadBytes, getBlob, getDownloadURL, StorageReference,
} from 'firebase/storage';
import { storage } from './firebaseStore';

export const uploadAvatar = (userUid: string, avatar: File) => {
  const storageRef = ref(storage, `${userUid}/avatar/userAvatar`);
  return uploadBytes(storageRef, avatar);
};

export const getAvatarUrl = async (reference: StorageReference) => {
  const url = await getDownloadURL(reference);
  return url;
};

export const downloadAvatar = async (reference: StorageReference) => {
  const blob = await getBlob(reference);
  return blob;
};
