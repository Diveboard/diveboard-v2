import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { AuthCodeTimer } from '../src/layouts/AuthCodeTimer';
import '../styles/globals.css';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY}`);

function MyApp({
  Component,
  pageProps,
}): JSX.Element {
  return (
    <Elements stripe={stripePromise}>
      <AuthCodeTimer>
        <Component {...pageProps} />
      </AuthCodeTimer>
    </Elements>
  );
}

export default MyApp;
