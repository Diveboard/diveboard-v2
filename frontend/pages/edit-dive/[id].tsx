import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../../src/layouts/MainLayout';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { LogDiveBlock } from '../../src/components/PageBlocks/LogADiveBlocks';
import { LogDiveProvider } from '../../src/components/PageBlocks/LogADiveBlocks/LogDiveData/LogDiveProvider';
import pageRoutes from '../../src/routes/pagesRoutes.json';
import { firestoreDivesService } from '../../src/firebase/firestore/firestoreServices/firestoreDivesService';
import {
  firestorePublicProfileService,
} from '../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';

const Dive: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
  dive,
  diveId,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <LogDiveProvider>
        <LogDiveBlock diveId={diveId} dive={dive} userId={user.uid} />
      </LogDiveProvider>
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;
    const diveId = context.query?.id;

    if (!uid) {
      return {
        redirect: {
          destination: pageRoutes.authPageRout,
          permanent: false,
        },
      };
    }

    // const {
    //   email,
    //   photoURL = '',
    //   displayName = '',
    // } = await firebaseAdmin.auth().getUser(uid);

    const user = await firestorePublicProfileService.getUserById(uid);

    if (!diveId) {
      throw new Error('no dive');
    }

    const dive = await firestoreDivesService.getDiveData(uid, diveId as string);

    if (!dive) {
      throw new Error('no dive');
    }

    return {
      props: {
        user,
        diveId,
        dive: JSON.parse(JSON.stringify(dive)),
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
export default Dive;
