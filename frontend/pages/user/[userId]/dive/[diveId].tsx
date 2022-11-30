import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../../../../src/layouts/MainLayout';
import { AuthLayout } from '../../../../src/layouts/AuthLayout';
import { firebaseAdmin } from '../../../../src/firebase/firebaseAdmin';
import { DivePageBlock } from '../../../../src/components/DivePage/divePageBlock';
import { firestoreDivesService } from '../../../../src/firebase/firestore/firestoreServices/firestoreDivesService';
import { firestoreSpotsService } from '../../../../src/firebase/firestore/firestoreServices/firestoreSpotsService';
import { firestoreSpeciesServices } from '../../../../src/firebase/firestore/firestoreServices/firestoreSpeciesServices';
import {
  firestorePublicProfileService,
} from '../../../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';

const DiveManager: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
  dive,
  spot,
  species,
  buddies,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <DivePageBlock dive={dive} user={user} spot={spot} species={species} buddies={buddies} />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  const { diveId, userId } = context.query;

  if (!uid) {
    return {
      props: {
        user: null,
      },
    };
  }

  const {
    email,
    photoURL = '',
    displayName = '',
  } = await firebaseAdmin.auth().getUser(uid);

  const data = await firestoreDivesService.getDiveData(userId as string, diveId as string);
  let spot = null;
  let species = [];
  let buddies = [];

  if (data?.spotId) {
    spot = await firestoreSpotsService.getSpotById(data.spotId);
  }

  if (data?.species.length) {
    species = await firestoreSpeciesServices.getSpeciesByIds(data.species);
  }
  if (data?.buddies.length) {
    buddies = await firestorePublicProfileService.getUsersInfo(data.buddies);
  }
  return {
    props: {
      user: {
        uid,
        email,
        photoURL,
        name: displayName,
      },
      dive: data ? JSON.parse(JSON.stringify(data)) : null,
      spot: spot ? JSON.parse(JSON.stringify(spot)) : null,
      species: JSON.parse(JSON.stringify(species)),
      buddies: JSON.parse(JSON.stringify(buddies)),
    },
  };
};

export default DiveManager;
