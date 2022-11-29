import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { GalleryBlock } from '../src/components/PageBlocks/GalleryBlock';
import { firestoreDivesService } from '../src/firebase/firestore/firestoreServices/firestoreDivesService';

const Gallery: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user, images }) => (
  <AuthLayout user={user}>
    <MainLayout>
      <GalleryBlock images={images} user={user} />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  if (!uid) {
    return {
      props: {
        user: null,
      },
    };
  }

  const {
    email, photoURL = '', displayName = '',
  } = await firebaseAdmin.auth().getUser(uid);

  const images = await firestoreDivesService.getImagesInDives(uid);

  return {
    props: {
      user: {
        uid,
        email,
        photoURL,
        name: displayName,
      },
      images: JSON.parse(JSON.stringify(images)),
    },
  };
};

export default Gallery;
