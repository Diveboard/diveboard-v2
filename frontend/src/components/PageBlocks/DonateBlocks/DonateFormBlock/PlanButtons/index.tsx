import React, {FC, useState} from 'react';
import styles from './styles.module.scss';
import { Button } from '../../../../Buttons/Button';
import { Props } from '../../MainDonateBlock';
import {useRouter} from 'next/router';
import pageRouter from '../../../../../routes/pagesRoutes.json'

export const PlanButtons: FC<Props> = ({planMode,setPlanMode, setContentMode,contentMode}) => {
 const router  = useRouter()
    return (
        <div className={styles.btn_wrapper}>
            <Button
                width={130}
                height={52}
                borderRadius={30}
                border="1px solid rgba(0, 3, 69, 0.2)"
                backgroundColor={ planMode === '3/month' ? 'rgba(63, 255, 255, 0.6)' : '#F2F2F2'}

            >
                <span className={styles.btnText}> $3/month  for 12 months </span>
            </Button>
            <Button
                width={130}
                height={52}
                borderRadius={30}
                border="1px solid rgba(0, 3, 69, 0.2)"
                backgroundColor={planMode === '5/month' ? 'rgba(63, 255, 255, 0.6)' : '#F2F2F2'}
            >
                <span className={styles.btnText}> $5/month  for 12 months </span>
            </Button>
            <Button
                width={130}
                height={52}
                borderRadius={30}
                border="1px solid rgba(0, 3, 69, 0.2)"
                backgroundColor={planMode === 'custom' ? 'rgba(63, 255, 255, 0.6)' : '#F2F2F2'}

            >
                <span className={styles.btnText}> Custom Donation</span>
            </Button>
        </div>
    )
}