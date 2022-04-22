import {
  updateProfile,
} from 'firebase/auth';
import { auth, functions, httpsCallable } from '../auth/firebaseAuth';

export const updateUserAvatar = async (avatarUrl: string) => {
  await updateProfile(auth.currentUser, {
    photoURL: avatarUrl,
  });
};

export const updateUserName = async (name:string) => {
  await updateProfile(auth.currentUser, {
    displayName: name,
  });
};

export const sendCodeOnNewEmail = async (email: string) => {
  const sendCode = httpsCallable(functions, 'resetEmail');

  const resp = await sendCode({
    email,
  });
  return resp.data;
};

export const confirmCodeOfNewEmail = async (email: string, otp:string) => {
  const confirmCode = httpsCallable(functions, 'confirmResetEmail');
  const resp = await confirmCode({
    email,
    otp,
  });
  return resp.data;
};
