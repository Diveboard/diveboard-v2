import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Button } from '../../../Buttons/Button';
import pagesRouts from '../../../../routes/pagesRouts.json';
import { SponsorsBlock } from '../SponsorsBlock';
import { useRouter } from 'next/router';

export const MainDonateBlock: FC = () => {
    const router = useRouter()
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h2 className={styles.title}> Support Diveboard with a donation </h2>
                <p className={styles.text}> Help keep Diveboard kickin’ ! DIveboard is a non-profit and relies on your
                    generous support to keep the platform running.
                <p> Donate today, and wear the “patron” badge on your profile! </p>
                 </p>
                <div className={styles.btn_wrapper}>
                    <Button
                        width={340}
                        height={48}
                        borderRadius={30}
                        border="none"
                        marginTop={12}
                        backgroundColor="#FDC90D"
                        onClick={() => {
                            router.push(pagesRouts.donateFormPageRoute);
                        }}
                    >
                        <span className={styles.btnText}> $3 per month for 12 months </span>
                    </Button>
                    <Button
                        width={340}
                        height={48}
                        borderRadius={30}
                        border="none"
                        marginTop={12}
                        backgroundColor="#FDC90D"
                        onClick={() => {
                            router.push(pagesRouts.donateFormPageRoute);
                        }}
                    >
                        <span className={styles.btnText}> $5 per month for 12 months </span>
                    </Button>
                    <Button
                        width={340}
                        height={48}
                        borderRadius={30}
                        border="none"
                        marginTop={12}
                        backgroundColor="#FDC90D"
                        onClick={() => {
                            router.push(pagesRouts.donateFormPageRoute);
                        }}
                    >
                        <span className={styles.btnText}> Custom Donation</span>
                    </Button>
                </div>
                <h2 className={styles.title}> Our Sponsors </h2>
                <SponsorsBlock/>
            </div>
        </div>
    )
};
