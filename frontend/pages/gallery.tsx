import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { GalleryBlock } from '../src/components/PageBlocks/GalleryBlock';
import { firestoreGalleryService } from '../src/firebase/firestore/firestoreServices/firestoreGalleryService';
import { firestorePublicProfileService } from '../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import 'react-toastify/dist/ReactToastify.css';

const Gallery: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user, images }) => (
  <AuthLayout user={user}>
    <MainLayout>
      <ToastContainer />
      <GalleryBlock images={images} />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  if (!uid) {
    return {
      props: {
        user: null,
        images: [],
      },
    };
  }

  const user = await firestorePublicProfileService.getUserById(uid);

  const images = await firestoreGalleryService.getGallery();

  return {
    props: {
      user,
      images: JSON.parse(JSON.stringify(images)),
    },
  };
};

export default Gallery;
