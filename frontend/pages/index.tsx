import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    router.push('/main/home-guest');
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
