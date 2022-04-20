import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import pageRoutes from '../src/routes/pagesRoutes.json';

const Home
: NextPage = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <></>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.diveBoardUserId;

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
      destination: pageRoutes.mainPageUser,
      permanent: false,
    },
  };
};

export default Home;
