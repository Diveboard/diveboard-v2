import React from 'react';
import { AuthCodeTimer } from '../src/layouts/AuthCodeTimer';
import '../styles/globals.css';

function MyApp({
  Component,
  pageProps,
}): JSX.Element {
  return (
    <AuthCodeTimer>
      <Component {...pageProps} />
    </AuthCodeTimer>
  );
}

export default MyApp;
