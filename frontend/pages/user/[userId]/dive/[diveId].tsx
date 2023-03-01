import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { DivePageBlock } from '../../../../src/components/DivePage/divePageBlock';
import { firestoreLogbookService } from '../../../../src/firebase/firestore/firestoreServices/firestoreLogbookService';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBlock from '../../../../src/components/ErrorBlock';

const DiveManager: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  dive,
  spot,
  species,
  speciesData,
  buddies,
  buddiesData,
  diveUser,
  pictures,
  comments,
  picturesData,
  error,
}) => {
  if (error) {
    return (
      <ErrorBlock text={error} />
    );
  }
  return (
    <DivePageBlock
      dive={dive}
      user={diveUser}
      spot={spot}
      species={species}
      speciesData={speciesData}
      pictures={pictures}
      picturesData={picturesData}
      buddies={buddies}
      buddiesData={buddiesData}
      comments={comments}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { diveId, userId } = context.query;

    const data = await firestoreLogbookService.getDive(userId as string, diveId as string, true);

    if (!data) {
      throw new Error('Dive is not found');
    }

    return {
      props: {
        ...data,
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

export default DiveManager;
