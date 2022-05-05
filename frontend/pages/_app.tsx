import React from 'react';
import { AuthCodeTimer } from '../src/layouts/AuthCodeTimer';
import '../styles/globals.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(`pk_test_51KNveCJVPt1Jo8ARiYglcGj6dhsCvtjujbQrtHt2EvFBX1bPqKzekQMXiWDWRZrpvl33kAAZP90FfDWvgN7baUAY00CxguoMGX`);

function MyApp({
  Component,
  pageProps,
}): JSX.Element {


    // const options = {
    //     clientSecret: 'pi_3KOivPJVPt1Jo8AR0OL9pLFj_secret_UYhK5EwG4GJzNjZD1QVdhD56n',
    // };

  return (
      <Elements stripe={stripePromise} >
        <AuthCodeTimer>
          <Component {...pageProps} />
        </AuthCodeTimer>
      </Elements>
  );
}

export default MyApp;
