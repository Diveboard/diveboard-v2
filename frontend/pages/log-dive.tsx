import React from 'react';
import { GetServerSideProps } from 'next';
import { LogDiveBlock } from '../src/components/PageBlocks/LogADiveBlocks';

import { LogDiveProvider } from '../src/components/PageBlocks/LogADiveBlocks/LogDiveData/LogDiveProvider';
import pageRoutes from '../src/routes/pagesRoutes.json';

const LogDive = () => (
  <LogDiveProvider>
    <LogDiveBlock />
  </LogDiveProvider>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (!uid) {
    return {
      redirect: {
        destination: pageRoutes.authPageRout,
        permanent: false,
      },
    };
  }
  return { props: {} };
};
export default LogDive;
