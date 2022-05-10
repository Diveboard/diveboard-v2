import React, {FC} from 'react';
import styles from './styles.module.scss';
import { Button } from '../../../Buttons/Button';
import { SponsorsBlock } from './SponsorsBlock';

export type Props = {
    planMode: '3/month' | '5/month' | 'custom'
    setPlanMode: React.Dispatch<React.SetStateAction<"3/month" | "5/month" | "custom">>
    contentMode: 'main' | 'plan' | 'success'
    setContentMode: React.Dispatch<React.SetStateAction<"main" | "plan" | "success">>
}
export const MainDonateBlock: FC<Props> = (
    {planMode, contentMode, setPlanMode, setContentMode, children}
) => {

    const handlePlanChange = (plan: '3/month' | '5/month' | 'custom') => {
        setPlanMode(plan)
        if (contentMode === 'main') {
            setContentMode('plan')
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h2 className={styles.title}> Support Diveboard with a donation </h2>
                <p className={styles.text}> Help keep Diveboard kickin’ ! DIveboard is a non-profit and relies on your
                    generous support to keep the platform running.
                </p>
                <p> Donate today, and wear the “patron” badge on your profile! </p>
                <div className={styles.btn_wrapper}>
                    <Button
                        width={340}
                        height={48}
                        borderRadius={30}
                        border="none"
                        marginTop={12}
                        backgroundColor="#FDC90D"
                        onClick={() => {
                            handlePlanChange('3/month')
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
                            handlePlanChange('5/month')
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
                            handlePlanChange('custom')
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
