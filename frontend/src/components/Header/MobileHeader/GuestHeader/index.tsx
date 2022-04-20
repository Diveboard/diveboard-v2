import React, { FC } from 'react';

import { LogoMobile } from '../../../Icons/Logo/MobileLogo';
import { MarginWrapper } from '../../../MarginWrapper';
import { LinkedButton } from '../../../Buttons/LinkedButton';
import styles from './styles.module.scss';

export const MobileGuestHeader: FC = () => (
  <header className={styles.header}>
    <LogoMobile />
    <MarginWrapper right={15}>

      <LinkedButton
        link="/auth"
        iconName="signup-ico"
        label="Sign Up"
        iconSize={20}
        fontSize={16}
        fontWeight={400}
      />

    </MarginWrapper>
  </header>
);
