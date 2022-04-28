import React, {FC} from 'react';
import styles from './styles.module.scss';
import { CheckoutForm } from "./CheckoutForm/CheckoutForm.js";
import { PlanButtons } from './PlanButtons';

export type Props = {
    planMode: '3/month' | '5/month' | 'custom'
    setPlanMode: React.Dispatch<React.SetStateAction<"3/month" | "5/month" | "custom">>
}

export const DonateFormBlock: FC<Props> = ({planMode, setPlanMode}) => (
    <div className={styles.wrapper}>
        <div className={styles.title}>
            <h2> Donate Now </h2>
            <p> You help the biggest divers community growth! </p>
        </div>
        <PlanButtons
            planMode={planMode}
            setPlanMode={setPlanMode}
        />
        <CheckoutForm
            planMode={planMode}
            setPlanMode={setPlanMode}
        />
    </div>
);