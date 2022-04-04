import {
  auth,
  browserLocalPersistence,
  browserSessionPersistence,
  functions,
  httpsCallable,
  setPersistence,
  signInWithCustomToken,
} from './firebaseAuth';

const sendCodeOnEmail = async (email: string) => {
  const sendCode = httpsCallable(functions, 'authStart');
  const resp = await sendCode({
    email,
  }) as { data: { newUser: boolean } };
  return resp.data.newUser;
};

const getTokenAuth = async (email: string, otp: string) => {
  const getToken = httpsCallable(functions, 'logIn');
  const resp = await getToken({
    email,
    otp,
  }) as { data: { token: string } };
  return resp.data.token;
};

const setAuthKeepLogged = async (keepLogged: boolean) => {
  if (keepLogged) {
    await setPersistence(auth, browserLocalPersistence);
  } else {
    await setPersistence(auth, browserSessionPersistence);
  }
};

const getAuthorizedUserWithToken = async (token: string) => {
  const resp = await signInWithCustomToken(auth, token);
  return resp.user;
};

export {
  sendCodeOnEmail,
  getTokenAuth,
  setAuthKeepLogged,
  getAuthorizedUserWithToken,
};
