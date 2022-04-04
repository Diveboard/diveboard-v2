import { updateProfile } from 'firebase/auth';
import { auth } from '../auth/firebaseAuth';

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
