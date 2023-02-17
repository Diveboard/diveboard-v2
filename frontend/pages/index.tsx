import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import Guest from '../src/components/PageBlocks/HomePageBlocks/Guest';
import 'react-toastify/dist/ReactToastify.css';
import { firestoreGalleryService } from '../src/firebase/firestore/firestoreServices/firestoreGalleryService';

const Home:
InferGetServerSidePropsType<typeof getServerSideProps> = ({ user, gallery }) => (
  <AuthLayout user={user}>
    <MainLayout isFilled>
      <ToastContainer />
      <Guest gallery={gallery} />
    </MainLayout>
  </AuthLayout>
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
  console.log(gallery)
  return {
    props: {
      user: null,
      gallery: JSON.parse(JSON.stringify(gallery)),
    },
  };
};
