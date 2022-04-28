import React, { useState } from 'react';
import { MainDonateBlock } from '../src/components/PageBlocks/DonateBlocks/MainDonateBlock';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';

// import * as admin from 'firebase-admin';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { DonateFormBlock } from '../src/components/PageBlocks/DonateBlocks/DonateFormBlock';
// admin.initializeApp();

const Donate: InferGetServerSidePropsType<typeof getServerSideProps> = ({user}) => {
    const [planMode, setPlanMode] = useState<'3/month' | '5/month' | 'custom'>();
    const [contentMode, setContentMode] = useState<'main' | 'plan' | 'success'>('main');

    return (
        <AuthLayout user={user}>
            <MainLayout>
                {contentMode === 'main' && <MainDonateBlock
                    planMode={planMode}
                    contentMode={contentMode}
                    setContentMode={setContentMode}
                    setPlanMode={setPlanMode}/>
                }
                {contentMode === 'plan' && <DonateFormBlock
                    planMode={planMode}
                    setPlanMode={setPlanMode}
                />}
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

export default Donate;
