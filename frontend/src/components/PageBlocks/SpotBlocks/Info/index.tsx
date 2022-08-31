import React from 'react';
import { SpeciesMobile } from '../../../DivePage/SpeciesIdentified/SpeciesMobile';
import { speciesList } from '../../../DivePage/DIVE_PAGE_DUMMY_DATA';
import { SpeciesIdentified } from '../../../DivePage/SpeciesIdentified/SpeciesSlider';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { Icon } from '../../../Icons/Icon';
import styles from './styles.module.scss';
import { InfoItem } from './infoItem';

export const Info = () => {
  const isMobile = useWindowWidth(200, 769);
  const speciesBlock = isMobile
    ? <SpeciesMobile speciesList={speciesList} />
    : <SpeciesIdentified speciesList={speciesList} />;

  return (
    <div className={styles.info}>
      {!isMobile && <h2>Info</h2>}
      <div className={styles.itemsWrapper}>
        <div className={styles.item}>
          <div className={styles.header}>
            <Icon iconName="stats" size={24} />
            <span>Stats</span>
          </div>

          <InfoItem name="Average depth:" value="11 m" />
          <InfoItem name="Visibility:" value="good" />
          <InfoItem name="Average current:" value="light" />
          <InfoItem name="Average temperature on surface:" value="26ºC" />
          <InfoItem name="Average temperature on bottom:" value="34ºC" />
          <InfoItem name="Dives Logged:" value="60" />
          <InfoItem name="Divers:" value="20" />

        </div>

        <div className={styles.item}>
          <div className={styles.header}>
            <Icon iconName="loc" size={24} />
            <span>Location</span>
          </div>
          <InfoItem name="Country:" country="Egypt" value="Egypt" />
          <InfoItem name="Region:" value="Red Sea" />
          <InfoItem name="Location:" value="Ras Mohammed" />
          <InfoItem name="Coordinates:" value="27.8133° ; 33.9208°" />
        </div>

        <div className={styles.item}>
          <div className={styles.header}>
            <Icon iconName="species-octopus" size={24} />
            <span>Species</span>
          </div>
          <div className={styles.speciesWrapper}>
            {speciesBlock}
          </div>

        </div>
      </div>

    </div>
  );
};
