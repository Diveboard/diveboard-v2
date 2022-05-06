import {
  auth,
  functions,
  httpsCallable,
  signInWithCustomToken,
  signOut,
} from './firebaseAuth';

export const sendCodeOnEmail = async (email: string) => {
  try {
    const sendCode = httpsCallable(functions, 'authStart');
    const resp = await sendCode({
      email,
    }) as { data: { newUser: boolean; expiresAfter:number } };
    return resp.data;
  } catch (e) {
    throw new Error('send code on email error');
  }
};

export const getTokenAuth = async (email: string, otp: string) => {
  try {
    const getToken = httpsCallable(functions, 'logIn');
    const resp = await getToken({
      email,
      otp,
    }) as { data: { token: string } };
    return resp.data.token;
  } catch (e) {
    throw new Error('get token error');
  }
};

export const getAuthorizedUserWithToken = async (token: string) => {
  try {
    const resp = await signInWithCustomToken(auth, token);
    return resp.user;
  } catch (e) {
    throw new Error('authorized with custom token error');
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    throw new Error('log out error');
  }
};
