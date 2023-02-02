import React, { FC } from 'react';
import { LogoMobile } from '../../../Icons/Logo/MobileLogo';
import { MarginWrapper } from '../../../MarginWrapper';
import { LinkedButton } from '../../../Buttons/LinkedButton';
import { Burger } from '../../../Dropdown/Burger';
import styles from './styles.module.scss';
import pagesRoutes from '../../../../routes/pagesRoutes.json';

export const MobileUserHeader: FC = () => (
  <header className={styles.header}>
    <LogoMobile />

    <div className={styles.rightGroup}>
      <MarginWrapper right={20}>
        <LinkedButton
          link={pagesRoutes.communityPageRout}
          iconName="community-small"
        />
      </MarginWrapper>
      <Burger />
    </div>

  </header>
);
