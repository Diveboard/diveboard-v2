import React, {FC} from 'react';
import styles from './styles.module.scss';
import { CheckoutForm } from "./CheckoutForm/CheckoutForm.js";
import { PlanButtons } from './PlanButtons';
import { Props } from '../MainDonateBlock';


export const DonateFormBlock: FC<Props> = ({planMode, setPlanMode,setContentMode,contentMode}) => (
    <div className={styles.wrapper}>
        <div className={styles.title}>
            <h2> Donate Now </h2>
            <p> You help the biggest divers community growth! </p>
        </div>
        <PlanButtons
            planMode={planMode}
            setPlanMode={setPlanMode}
            //TODO DELETE BELOW MODE
            contentMode={contentMode}
            setContentMode={setContentMode}
        />
        <CheckoutForm
            planMode={planMode}
            setPlanMode={setPlanMode}
            contentMode={contentMode}
            setContentMode={setContentMode}
        />
    </div>
);