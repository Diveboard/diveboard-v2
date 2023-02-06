import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { ProfileBlock } from '../../src/components/PageBlocks/ProfileBlocks';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { MainLayout } from '../../src/layouts/MainLayout';
import { firestorePublicProfileService } from '../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import { firestoreLogbookService } from '../../src/firebase/firestore/firestoreServices/firestoreLogbookService';

const Logbook: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user, dives, species, buddies, logbookUser, surveysNumber,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <ToastContainer />
      <ProfileBlock
        user={user}
        logbookUser={logbookUser}
        dives={dives}
        species={species}
        buddies={buddies}
        surveysNumber={surveysNumber}
      />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;
    const { userId } = context.query;

    let user = null;

    if (uid) {
      user = await firestorePublicProfileService.getUserById(uid);
    }

    const data = await firestoreLogbookService.getLogbookData(userId as string);

    return {
      props: {
        user,
        ...data,
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
