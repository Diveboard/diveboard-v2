import '../styles/globals.css';
import React from 'react';
import Amplify from 'aws-amplify';
import awsExports from '../src/aws-exports';

Amplify.configure(awsExports);

function MyApp({ Component, pageProps }): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
