import '../styles/globals.css';
import React from 'react';
import { AuthCodeTimer } from '../src/layouts/AuthCodeTimer';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <AuthLayout>
      <AuthCodeTimer>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthCodeTimer>
    </AuthLayout>
  );
}

export default MyApp;
