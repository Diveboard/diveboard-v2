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


    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'pi_3KOivPJVPt1Jo8AR0OL9pLFj_secret_UYhK5EwG4GJzNjZD1QVdhD56n',
    };

  return (
      <Elements stripe={stripePromise} options={options} >
        <AuthCodeTimer>
          <Component {...pageProps} />
        </AuthCodeTimer>
      </Elements>
  );
}

export default MyApp;
