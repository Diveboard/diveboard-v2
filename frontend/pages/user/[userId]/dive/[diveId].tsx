import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from '../../../../src/layouts/MainLayout';
import { AuthLayout } from '../../../../src/layouts/AuthLayout';
import { DivePageBlock } from '../../../../src/components/DivePage/divePageBlock';
import {
  firestorePublicProfileService,
} from '../../../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import { firestoreLogbookService } from '../../../../src/firebase/firestore/firestoreServices/firestoreLogbookService';
import 'react-toastify/dist/ReactToastify.css';

const DiveManager: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
  dive,
  spot,
  species,
  buddies,
  diveUser,
  pictures,
  comments,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <ToastContainer />
      <DivePageBlock
        dive={dive}
        user={diveUser}
        spot={spot}
        species={species}
        pictures={pictures}
        buddies={buddies}
        comments={comments}
      />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;
    const { diveId, userId } = context.query;
    let user = null;
    if (uid) {
      user = await firestorePublicProfileService.getUserById(uid);
    }

    const data = await firestoreLogbookService.getDive(userId as string, diveId as string, true);

    if (!data) {
      throw new Error('Dive is not found');
    }

    return {
      props: {
        user: user ? JSON.parse(JSON.stringify(user)) : null,
        ...data,
      },
    };
  } catch (e) {
    return {
      props: {
        user: null,
      },
    };
  }
};

export default DiveManager;
