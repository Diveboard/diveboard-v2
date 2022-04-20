import {
  auth,
  browserLocalPersistence,
  browserSessionPersistence,
  functions,
  httpsCallable,
  setPersistence,
  signInWithCustomToken,
  signOut,
} from './firebaseAuth';

export const sendCodeOnEmail = async (email: string) => {
  const sendCode = httpsCallable(functions, 'authStart');
  const resp = await sendCode({
    email,
  }) as { data: { newUser: boolean; expiresAfter:number } };
  return resp.data;
};

export const getTokenAuth = async (email: string, otp: string) => {
  const getToken = httpsCallable(functions, 'logIn');
  const resp = await getToken({
    email,
    otp,
  }) as { data: { token: string } };
  return resp.data.token;
};

export const setAuthKeepLogged = async (keepLogged: boolean) => {
  if (keepLogged) {
    await setPersistence(auth, browserLocalPersistence);
  } else {
    await setPersistence(auth, browserSessionPersistence);
  }
};

export const getAuthorizedUserWithToken = async (token: string) => {
  const resp = await signInWithCustomToken(auth, token);
  return resp.user;
};

export const logOut = async () => {
  await signOut(auth);
};
