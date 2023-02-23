import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { ProfileBlock } from '../../src/components/PageBlocks/ProfileBlocks';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { MainLayout } from '../../src/layouts/MainLayout';
import { firestorePublicProfileService } from '../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import { firestoreLogbookService } from '../../src/firebase/firestore/firestoreServices/firestoreLogbookService';
import 'react-toastify/dist/ReactToastify.css';

const Logbook: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user, dives, species, logbookUser, data, pictures, buddies,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <ToastContainer />
      <ProfileBlock
        user={user}
        dives={dives}
        species={species}
        buddies={buddies}
        logbookUser={logbookUser}
        data={data}
        pictures={pictures}
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
        user,
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
