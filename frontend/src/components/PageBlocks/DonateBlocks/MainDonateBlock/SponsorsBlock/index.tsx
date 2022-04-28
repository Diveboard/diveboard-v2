import React, { FC } from 'react';
import styles from './styles.module.scss';
import { ProfileBlock } from './ProfileBlock';

export const SponsorsBlock: FC = () => (
    <div className={styles.wrapper}>
        <ProfileBlock/>
        <ProfileBlock/>
        <ProfileBlock/>
        <ProfileBlock/>
    </div>
);
