import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { SpotBlocks } from '../../src/components/PageBlocks/SpotBlocks';
import { MainLayout } from '../../src/layouts/MainLayout';
import { firebaseAdmin } from '../../src/firebase/firebaseAdmin';
import { firestoreSpotsService } from '../../src/firebase/firestore/firestoreServices/firestoreSpotsService';
import { firestoreDivesService } from '../../src/firebase/firestore/firestoreServices/firestoreDivesService';
import { firestoreSpeciesServices } from '../../src/firebase/firestore/firestoreServices/firestoreSpeciesServices';

const Spot: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user, spot, dives, species,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <SpotBlocks spot={spot} dives={dives} species={species} />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  const { spotId } = context.query;
  let spot = null;
  const dives = [];
  let species = [];
  let user = null;

  if (spotId) {
    const data = await firestoreSpotsService.getSpotById(spotId as string);

    if (data) {
      spot = JSON.parse(JSON.stringify(data));
      if (data?.dive?.length) {
        let speciesIds = [];
        for (let i = 0; i < data.dive.length; i++) {
          const dive = data.dive[i];
          // eslint-disable-next-line no-await-in-loop
          const divesData = await firestoreDivesService.getDiveData(dive.userId, dive.diveId);
          if (divesData) {
            speciesIds = [...speciesIds, ...divesData.species];
            dives.push(divesData);
          }
        }
        if (speciesIds.length) {
          species = await firestoreSpeciesServices.getSpeciesByIds(Array.from(new Set(speciesIds)));
        }
      }
    }
  }

  if (uid) {
    const {
      email,
      photoURL = '',
      displayName = '',
    } = await firebaseAdmin.auth()
      .getUser(uid);
    user = {
      uid,
      email,
      photoURL,
      displayName,
    };
  }

  return {
    props: {
      user,
      spot,
      dives: JSON.parse(JSON.stringify(dives)),
      species: JSON.parse(JSON.stringify(species)),
    },
  };
};
export default Spot;
