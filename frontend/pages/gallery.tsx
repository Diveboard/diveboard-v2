import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { GalleryBlock } from '../src/components/PageBlocks/GalleryBlock';
import { firestoreGalleryService } from '../src/firebase/firestore/firestoreServices/firestoreGalleryService';

const Gallery: InferGetServerSidePropsType<typeof getServerSideProps> = ({ images }) => (
  <GalleryBlock images={images} />
);

export const getServerSideProps: GetServerSideProps = async () => {
  const images = await firestoreGalleryService.getGallery();

  return {
    props: {
      images: JSON.parse(JSON.stringify(images)),
    },
  };
  return { props: {} };
};

export default Gallery;
