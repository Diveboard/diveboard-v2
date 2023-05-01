import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { AuthCodeTimer } from '../src/layouts/AuthCodeTimer';
import '../styles/globals.css';
import '../styles/wrappers.css';
import { NetworkStatus } from '../src/layouts/NetworkStatus';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { firestorePublicProfileService } from '../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import { MainLayout } from '../src/layouts/MainLayout';
import 'react-toastify/dist/ReactToastify.css';
import { SpotsLayout } from '../src/layouts/SpotsLayout';

function MyApp({
  Component,
  pageProps,
}): JSX.Element {
  const [user, setUser] = useState(undefined);
  const uid = Cookies.get('__session');

  useEffect(() => {
    (async () => {
      if (uid) {
        setUser(await firestorePublicProfileService.getUserById(uid));
      } else {
        setUser(null);
      }
    })();
  }, []);

  const { pathname } = useRouter();

  return (
    <AuthCodeTimer>
      <NetworkStatus>
        {user !== undefined && (
        <AuthLayout user={user}>
          <MainLayout
            isFilled={pathname === '/'}
            isHideMobileHeader={pathname === '/explore'}
          >
            <SpotsLayout>
              <ToastContainer />
              <Component {...pageProps} />
            </SpotsLayout>
          </MainLayout>
        </AuthLayout>
        )}
      </NetworkStatus>
    </AuthCodeTimer>
  );
}

export default MyApp;
