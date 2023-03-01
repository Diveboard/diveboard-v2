import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { SpotBlocks } from '../../src/components/PageBlocks/SpotBlocks';
import { firestoreSpotsService } from '../../src/firebase/firestore/firestoreServices/firestoreSpotsService';
import { firestoreDivesService } from '../../src/firebase/firestore/firestoreServices/firestoreDivesService';
import { firestoreSpeciesServices } from '../../src/firebase/firestore/firestoreServices/firestoreSpeciesServices';
import { firestoreGalleryService } from '../../src/firebase/firestore/firestoreServices/firestoreGalleryService';
import ErrorBlock from '../../src/components/ErrorBlock';

const Spot: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  spot, dives, speciesData, species, pictures, picturesData, error,
}) => {
  if (error) {
    return (
      <ErrorBlock text={error} />
    );
  }
  return (
    <SpotBlocks
      spot={spot}
      dives={dives}
      species={species}
      speciesData={speciesData}
      pictures={pictures}
      picturesData={picturesData}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { spotId } = context.query;
    let spot = null;
    let dives = [];
    let speciesData = [];
    let species = [];
    let pictures = [];
    let picturesData = [];

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

    return {
      props: {
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
      props: {
        error: e.message,
      },
    };
  }
};
export default Spot;
