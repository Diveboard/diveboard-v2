import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Guest from '../src/components/PageBlocks/HomePageBlocks/Guest';
import 'react-toastify/dist/ReactToastify.css';
import { firestoreGalleryService } from '../src/firebase/firestore/firestoreServices/firestoreGalleryService';

const Home:
InferGetServerSidePropsType<typeof getServerSideProps> = ({ gallery }) => (
  <Guest gallery={gallery} />
);

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  if (uid) {
    return {
      redirect: {
        destination: `/logbook/${uid}`,
        permanent: false,
      },
    };
  }

  const gallery = await firestoreGalleryService.getGallery('desc', null, 8);

  return {
    props: {
      gallery: JSON.parse(JSON.stringify(gallery)),
    },
  };
};
