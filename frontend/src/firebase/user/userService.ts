import {
  updateProfile,
} from 'firebase/auth';
import { auth, functions, httpsCallable } from '../auth/firebaseAuth';

export const updateUserAvatar = async (avatarUrl: string) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: avatarUrl,
    });
  } catch (e) {
    throw new Error('update user avatar error');
  }
};

export const updateUserName = async (name:string) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  } catch (e) {
    throw new Error('update user name error');
  }
};

export const sendCodeOnNewEmail = async (email: string) => {
  try {
    const sendCode = httpsCallable(functions, 'resetEmail');

    const resp = await sendCode({
      email,
    });
    return resp.data;
  } catch (e) {
    throw new Error('send code on email error');
  }
};

export const confirmCodeOfNewEmail = async (email: string, otp:string) => {
  try {
    const confirmCode = httpsCallable(functions, 'confirmResetEmail');
    const resp = await confirmCode({
      email,
      otp,
    });
    return resp.data;
  } catch (e) {
    throw new Error('confirm code of new email error');
  }
};
