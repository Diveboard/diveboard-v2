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
  user, spot, dives, speciesData, species, pictures, picturesData,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <ToastContainer />
      <SpotBlocks
        spot={spot}
        dives={dives}
        species={species}
        speciesData={speciesData}
        pictures={pictures}
        picturesData={picturesData}
      />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;
    const { spotId } = context.query;
    let spot = null;
    let dives = [];
    let speciesData = [];
    let species = [];
    let pictures = [];
    let picturesData = [];
    let user = null;

    if (spotId) {
      const data = await firestoreSpotsService.getSpotById(spotId as string);
      if (!data) {
        throw new Error('Spot is not found');
      }
      spot = JSON.parse(JSON.stringify(data));
      if (data.bestPictures) {
        pictures = data.bestPictures;
        picturesData = await firestoreGalleryService.getBestPictures(data.bestPictures, 5);
      }
      if (data.species) {
        species = data.species;
        speciesData = await firestoreSpeciesServices.getSpeciesByRefs(data.species, 4);
      }
      if (data.dives) {
        dives = await firestoreDivesService.getDivesByRefs(data.dives, 4);
      }
    }

    if (uid) {
      user = await firestorePublicProfileService.getUserById(uid);
    }

    return {
      props: {
        user,
        spot,
        picturesData: JSON.parse(JSON.stringify(picturesData)),
        dives: JSON.parse(JSON.stringify(dives)),
        speciesData: JSON.parse(JSON.stringify(speciesData)),
        species: JSON.parse(JSON.stringify(
          Object.values(species).map((p) => ({ specieRef: p })),
        )),
        pictures: JSON.parse(JSON.stringify(
          Object.values(pictures).map((p) => ({ pictureRef: p })),
        )),
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
export default Spot;
