import Router from 'next/router';
import { useState, useEffect } from 'react';

function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  }, [Router]);

  return isLoading;
}

export default useLoading;
