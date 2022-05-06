import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import {SuccessBlock} from '../src/components/PageBlocks/DonateBlocks/SuccessBlock';

const Success: InferGetServerSidePropsType<typeof getServerSideProps> = ({user}) => {

    return (
        <AuthLayout user={user}>
            <MainLayout>
                <SuccessBlock/>
            </MainLayout>
        </AuthLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const uid = context.req.cookies.diveBoardUserId;

    if (!uid) {
        return {
            props: {
                user: null,
            },
        };
    }

    const {
        email, photoURL = '', displayName = '',
    } = await firebaseAdmin.auth().getUser(uid);

    return {
        props: {
            user: {
                uid,
                email,
                photoURL,
                name: displayName,
            },
        },
    };
};

export default Success;
