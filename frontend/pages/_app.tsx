import React from 'react';
import { AuthCodeTimer } from '../src/layouts/AuthCodeTimer';
import '../styles/globals.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.STRIPE_TEST_PUBLISHABLE_KEY}`);

function MyApp({
  Component,
  pageProps,
}): JSX.Element {


  return (
      <Elements stripe={stripePromise} >
        <AuthCodeTimer>
          <Component {...pageProps} />
        </AuthCodeTimer>
      </Elements>
  );
}

export default MyApp;
