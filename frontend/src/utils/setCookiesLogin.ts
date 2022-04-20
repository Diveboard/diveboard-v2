import Cookies from 'js-cookie';

export const setCookiesLogin = (isKeepLogged: boolean, uid: string) => {
  if (isKeepLogged) {
    Cookies.set(
      'diveBoardUserId',
      uid,
      { expires: 14, secure: true, sameSite: 'strict' },
    );
  } else {
    Cookies.set(
      'diveBoardUserId',
      uid,
      { expires: 1, secure: true, sameSite: 'strict' },
    );
  }
};
