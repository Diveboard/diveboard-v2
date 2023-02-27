import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import DiveManagerBlock from '../src/components/DiveManager';
import { firestoreDivesService } from '../src/firebase/firestore/firestoreServices/firestoreDivesService';
import pageRoutes from '../src/routes/pagesRoutes.json';

const DiveManager: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  dives,
}) => (
  <DiveManagerBlock userDives={dives} />
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (!uid) {
    return {
      redirect: {
        destination: pageRoutes.mainPageRoute,
        permanent: false,
      },
    };
  }

  const data = await firestoreDivesService.getDivesByUserId(uid, 7);

  let dives = [];

  if (Array.isArray(data) && data.length !== 0) {
    dives = JSON.parse(JSON.stringify(data));
  }

  return {
    props: {
      dives,
    },
  };
};

export default DiveManager;
