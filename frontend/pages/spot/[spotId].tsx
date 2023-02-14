import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { SpotBlocks } from '../../src/components/PageBlocks/SpotBlocks';
import { MainLayout } from '../../src/layouts/MainLayout';
import { firestoreSpotsService } from '../../src/firebase/firestore/firestoreServices/firestoreSpotsService';
import { firestoreDivesService } from '../../src/firebase/firestore/firestoreServices/firestoreDivesService';
import { firestoreSpeciesServices } from '../../src/firebase/firestore/firestoreServices/firestoreSpeciesServices';
import {
  firestorePublicProfileService,
} from '../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import { firestoreGalleryService } from '../../src/firebase/firestore/firestoreServices/firestoreGalleryService';
import 'react-toastify/dist/ReactToastify.css';

const Spot: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user, spot, dives, species, pictures,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <ToastContainer />
      <SpotBlocks spot={spot} dives={dives} species={species} pictures={pictures} />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  const { spotId } = context.query;
  let spot = null;
  let dives = [];
  let species = [];
  let pictures = [];
  let user = null;

  if (spotId) {
    const data = await firestoreSpotsService.getSpotById(spotId as string);

    if (data) {
      spot = JSON.parse(JSON.stringify(data));
      if (data.bestPictures) {
        pictures = await firestoreGalleryService.getBestPictures(data.bestPictures);
      }
      if (data.species) {
        species = await firestoreSpeciesServices.getSpeciesByRefs(data.species);
      }
      if (data.dives) {
        dives = await firestoreDivesService.getDivesByRefs(data.dives, 4);
      }
      // if (data?.dive?.length) {
      //   let speciesIds = [];
      //   for (let i = 0; i < data.dive.length; i++) {
      //     const dive = data.dive[i];
      //     // eslint-disable-next-line no-await-in-loop
      //     const divesData = await firestoreDivesService.getDiveData(dive.userId, dive.diveId);
      //     if (divesData) {
      //       speciesIds = [...speciesIds, ...divesData.species];
      //       dives.push(divesData);
      //     }
      //   }
      //   if (speciesIds.length) {
      //     species = await firestoreSpeciesServices
      //     .getSpeciesByIds(Array.from(new Set(speciesIds)));
      //   }
      // }
    }
  }

  if (uid) {
    user = await firestorePublicProfileService.getUserById(uid);
  }

  return {
    props: {
      user,
      spot,
      pictures: JSON.parse(JSON.stringify(pictures)),
      dives: JSON.parse(JSON.stringify(dives)),
      species: JSON.parse(JSON.stringify(species)),
    },
  };
};
export default Spot;
