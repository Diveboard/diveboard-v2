import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { LogDiveBlock } from '../../src/components/PageBlocks/LogADiveBlocks';
import { LogDiveProvider } from '../../src/components/PageBlocks/LogADiveBlocks/LogDiveData/LogDiveProvider';
import pageRoutes from '../../src/routes/pagesRoutes.json';
import { firestoreDivesService } from '../../src/firebase/firestore/firestoreServices/firestoreDivesService';
import { firestoreGalleryService } from '../../src/firebase/firestore/firestoreServices/firestoreGalleryService';
import { firestoreSpeciesServices } from '../../src/firebase/firestore/firestoreServices/firestoreSpeciesServices';

const Dive: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  dive,
  diveId,
  mediaUrls,
  species,
}) => (
  <LogDiveProvider>
    <LogDiveBlock
      diveId={diveId}
      dive={dive}
      mediaUrls={mediaUrls}
      species={species}
    />
  </LogDiveProvider>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;
    const diveId = context.query?.id;

    if (!uid) {
      return {
        redirect: {
          destination: pageRoutes.authPageRout,
          permanent: false,
        },
      };
    }

    if (!diveId) {
      throw new Error('no dive');
    }

    const dive = await firestoreDivesService.getDiveData(uid, diveId as string, true);
    let mediaUrls;
    if (dive?.pictures) {
      mediaUrls = await firestoreGalleryService.getMediaUrls(dive.pictures);
    }
    let species;
    if (dive?.species) {
      species = await firestoreSpeciesServices.getSpeciesByRefs(dive?.species);
    }
    if (!dive) {
      throw new Error('no dive');
    }
    return {
      props: {
        diveId,
        dive: JSON.parse(JSON.stringify(dive)),
        mediaUrls: JSON.parse(JSON.stringify(mediaUrls)),
        species: JSON.parse(JSON.stringify(species)),
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/_error',
        permanent: false,
      },
    };
  }
};
export default Dive;
