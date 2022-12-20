import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import pageRoutes from '../src/routes/pagesRoutes.json';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const uid = Cookies.get('__session');
    if (uid) {
      router.push(`${pageRoutes.mainPageUser}/${uid}`);
    } else {
      router.push(pageRoutes.mainPageGuest);
    }
  }, []);

  return <div />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (!uid) {
    return {
      redirect: {
        destination: pageRoutes.mainPageGuest,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: `${pageRoutes.mainPageUser}/${uid}`,
      permanent: false,
    },
  };
};
