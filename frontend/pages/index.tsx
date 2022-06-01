import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import pageRoutes from '../src/routes/pagesRoutes.json';

const Home
: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const uid = Cookies.get('__session');
    if (uid) {
      router.push(pageRoutes.mainPageUser);
    } else {
      router.push(pageRoutes.mainPageGuest);
    }
  }, []);

  return null;
};

export default Home;
