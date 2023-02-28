import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ProfileBlock } from '../../src/components/PageBlocks/ProfileBlocks';
import { firestoreLogbookService } from '../../src/firebase/firestore/firestoreServices/firestoreLogbookService';

const Logbook: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  dives, species, logbookUser, data, pictures, buddies,
}) => (
  <ProfileBlock
    dives={dives}
    species={species}
    buddies={buddies}
    logbookUser={logbookUser}
    data={data}
    pictures={pictures}
  />
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { userId } = context.query;
    const {
      data,
      logbookUser,
      divesData,
      pictures,
      species,
      buddies,
    } = await firestoreLogbookService.getLogbookData(
      userId as string,
    );

    if (!logbookUser) {
      throw new Error('Logbook is not found');
    }
    return {
      props: {
        dives: divesData,
        species,
        buddies,
        logbookUser,
        data,
        pictures,
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

export default Logbook;
