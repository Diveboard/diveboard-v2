import Cookies from 'js-cookie';

export const setCookiesLogin = (isKeepLogged: boolean, uid: string) => {
  Cookies.set(
    '__session',
    uid,
    { expires: isKeepLogged ? 14 : 1, secure: true, sameSite: 'strict' },
  );
};
