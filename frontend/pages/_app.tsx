import React from 'react';
import { AuthCodeTimer } from '../src/layouts/AuthCodeTimer';
import '../styles/globals.css';
import { NetworkStatus } from '../src/layouts/NetworkStatus';

function MyApp({
  Component,
  pageProps,
}): JSX.Element {
  return (
    <AuthCodeTimer>
      <NetworkStatus>
        <Component {...pageProps} />
      </NetworkStatus>
    </AuthCodeTimer>
  );
}

export default MyApp;
