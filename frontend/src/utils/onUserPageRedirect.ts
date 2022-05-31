import Cookies from 'js-cookie';
import pageRoutes from '../routes/pagesRoutes.json';

export const onUserPageRedirect = () => {
  const uid = Cookies.get('__session');
  if (uid) {
    window.location.assign(pageRoutes.mainPageUser);
  } else {
    window.location.assign(pageRoutes.mainPageGuest);
  }
};
