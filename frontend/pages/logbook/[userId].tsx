import React, { useContext } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ProfileBlock } from '../../src/components/PageBlocks/ProfileBlocks';
import { firestoreLogbookService } from '../../src/firebase/firestore/firestoreServices/firestoreLogbookService';
import {
  firestorePublicProfileService,
} from '../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import { AuthStatusContext } from '../../src/layouts/AuthLayout';
import ErrorBlock from '../../src/components/ErrorBlock';

const Logbook: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  dives, species, logbookUser, data, pictures, buddies, error,
}) => {
  const { userAuth } = useContext(AuthStatusContext);

  if (error) {
    return (
      <ErrorBlock text={error} />
    );
  }
  return (
    <ProfileBlock
      dives={dives}
      species={species}
      buddies={buddies}
      logbookUser={logbookUser === 'OWN_PROFILE' ? userAuth : logbookUser}
      data={data}
      pictures={pictures}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;
    const { userId } = context.query;
    let logbookUser;
    if (uid === userId) {
      logbookUser = 'OWN_PROFILE';
    } else {
      logbookUser = await firestorePublicProfileService.getUserById(userId as string);
    }
    if (!logbookUser) {
      throw new Error('Logbook is not found');
    }

    const {
      data,
      divesData,
      pictures,
      species,
      buddies,
    } = await firestoreLogbookService.getLogbookData(
      userId as string,
    );

    return {
      props: {
        logbookUser: JSON.parse(JSON.stringify(logbookUser)),
        dives: divesData,
        species,
        buddies,
        data,
        pictures,
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

export default Logbook;
