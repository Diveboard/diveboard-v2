import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ProfileBlock } from '../../src/components/PageBlocks/ProfileBlocks';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { MainLayout } from '../../src/layouts/MainLayout';
import { firebaseAdmin } from '../../src/firebase/firebaseAdmin';
import { firestoreDivesService } from '../../src/firebase/firestore/firestoreServices/firestoreDivesService';
import { firestoreSpeciesServices } from '../../src/firebase/firestore/firestoreServices/firestoreSpeciesServices';
import { firestorePublicProfileService } from '../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';

const Logbook: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user, dives, species, buddies, logbookUser,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <ProfileBlock
        logbookUser={logbookUser}
        dives={dives}
        species={species}
        buddies={buddies}
      />
    </MainLayout>
  </AuthLayout>

);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  const { userId } = context.query;

  let user = null;

  if (uid) {
    const data = await firebaseAdmin.auth().getUser(uid);
    user = {
      email: data.email,
      photoURL: data.photoURL,
      displayName: data.displayName,
    };
  }

  const data = await firestoreDivesService.getDivesByUserId(userId as string);

  let dives = [];
  let species = [];
  let buddies = [];

  if (Array.isArray(data) && data.length !== 0) {
    dives = JSON.parse(JSON.stringify(data));

    const speciesIds = data.flatMap((dive) => dive.species);

    if (speciesIds.length) {
      // @ts-ignore
      species = await firestoreSpeciesServices.getSpeciesByIds([...new Set(speciesIds)]);
    }

    const buddiesIds = data.flatMap((dive) => dive.buddies.map((buddy) => buddy.id || buddy));

    if (buddiesIds.length) {
      // @ts-ignore
      const res = [...new Set(buddiesIds)].map((buddy) => {
        if (buddy.name) {
          return buddy;
        }
        return { id: buddy };
      });
      buddies = await firestorePublicProfileService.getUsersInfo(res);
    }
  }

  const logbookUser = await firestorePublicProfileService.getUserById(userId as string);
  return {
    props: {
      user: user ? JSON.parse(JSON.stringify(user)) : null,
      logbookUser: logbookUser ? JSON.parse(JSON.stringify(logbookUser)) : null,
      dives,
      species: JSON.parse(JSON.stringify(species)),
      buddies: JSON.parse(JSON.stringify(buddies)),
    },
  };
};

export default Logbook;
