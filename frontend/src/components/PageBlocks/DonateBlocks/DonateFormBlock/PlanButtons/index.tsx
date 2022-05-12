import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Button } from '../../../../Buttons/Button';
import { Props } from '../../MainDonateBlock';

export const PlanButtons: FC<Props> = ({ planMode,setPlanMode }) => {


    const handlePlanChange = (plan: '3/month' | '5/month' | 'custom') => {
        setPlanMode(plan)
    }
    return (
        <div className={styles.btn_wrapper}>
            <Button
                width={130}
                height={52}
                borderRadius={30}
                color={'#000345'}
                border="1px solid rgba(0, 3, 69, 0.2)"
                backgroundColor={ planMode === '3/month' ? 'rgba(63, 255, 255, 0.6)' : '#ffffff'}

            >
                <span className={styles.btnText}> $3/month  for 12 months </span>
            </Button>
            <Button
                width={130}
                height={52}
                borderRadius={30}
                border="1px solid rgba(0, 3, 69, 0.2)"
                color={'#000345'}
                backgroundColor={planMode === '5/month' ? 'rgba(63, 255, 255, 0.6)' : '#ffffff'}
            >
                <span className={styles.btnText}> $5/month  for 12 months </span>
            </Button>
            <Button
                width={130}
                height={52}
                borderRadius={30}
                border="1px solid rgba(0, 3, 69, 0.2)"
                color={'#000345'}
                backgroundColor={planMode === 'custom' ? 'rgba(63, 255, 255, 0.6)' : '#ffffff'}
                onClick={() => {
                    handlePlanChange('custom')
                }}
            >
                <span className={styles.btnText}> Custom Donation</span>
            </Button>
        </div>
    )
}