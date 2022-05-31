import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Loader } from '../src/components/Loader';
import { Icon } from '../src/components/Icons/Icon';
import { precachePages } from '../src/utils/pwaPrecachePages';
import pageRoutes from '../src/routes/pagesRoutes.json';

const Home
: NextPage = () => {
  const pages = ['/profile', '/settings'];
  const router = useRouter();
  const [cached, setCashed] = useState(true);

  useEffect(() => {
    const isCached = localStorage
      .getItem('diveBoardInstalledCache');

    setCashed(!!isCached);

    if (!isCached) {
      precachePages(pages);
      localStorage.setItem('diveBoardInstalledCache', 'true');
    } else {
      const uid = Cookies.get('__session');
      if (uid) {
        router.push(pageRoutes.mainPageUser);
      } else {
        router.push(pageRoutes.mainPageGuest);
      }
    }
  }, []);

  if (cached) {
    return null;
  }

  return (
    <div style={{
      height: '80Vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
    >
      <Icon iconName="diveboard-logo" size={100} />
      <h1 style={{
        textAlign: 'center',
        color: '#000345',
      }}
      >
        Wait for caching data...
      </h1>
      <Loader loading />
    </div>
  );
};

export default Home;
