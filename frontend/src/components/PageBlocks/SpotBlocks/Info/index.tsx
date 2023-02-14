import React, { useContext } from 'react';
import { SpeciesMobile } from '../../../DivePage/SpeciesIdentified/SpeciesMobile';
import { SpeciesIdentified } from '../../../DivePage/SpeciesIdentified/SpeciesSlider';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { Icon } from '../../../Icons/Icon';
import styles from './styles.module.scss';
import { InfoItem } from './infoItem';
import { SpeciesType } from '../../../../firebase/firestore/models';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';
import {
  convertCalToFar,
  convertMetersToFeet,
} from '../../../../utils/unitSystemConverter';
import { Coords } from '../../../../types';

type Props = {
  location: {
    country: string;
    region: string;
    location: string;
  },
  stats: any;
  divesCount: number;
  coords: Coords;
  species: Array<SpeciesType>
};

export const Info = ({
  location, species, coords, stats, divesCount,
}: Props) => {
  const isMobile = useWindowWidth(200, 769);
  const speciesBlock = isMobile
    ? <SpeciesMobile speciesList={species} />
    : <SpeciesIdentified speciesList={species} />;

  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const convertTempSystem = (value: number): string => {
    if (!userAuth) {
      return `${value.toFixed(2)} ºC`;
    }
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (userUnitSystem === 'IMPERIAL') {
      return `${convertCalToFar(value).toFixed(2)} ºF`;
    }
    return `${value.toFixed(2)} ºC`;
  };

  const convertDepth = (value): string => {
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (!userAuth) {
      return `${value.toFixed(2)} m`;
    }
    if (userUnitSystem === 'IMPERIAL') {
      return `${convertMetersToFeet(value).toFixed(2)} ft`;
    }
    return `${value.toFixed(2)} m`;
  };

  return (
    <div className={styles.info}>
      {isMobile === false && <h2>Info</h2>}
      <div className={styles.itemsWrapper}>
        <div className={styles.item}>
          <div className={styles.header}>
            <Icon iconName="stats" size={24} />
            <span>Stats</span>
          </div>

          {stats.averageDepth?.depth && <InfoItem name="Average depth:" value={convertDepth(stats.averageDepth.depth)} /> }
          {stats.visibility && <InfoItem name="Visibility:" value={stats.visibility.toLowerCase()} /> }
          {stats.averageCurrent && <InfoItem name="Average current:" value={stats.averageCurrent.toLowerCase()} /> }
          {stats.averageTemperatureOnSurface?.temperature && (
          <InfoItem
            name="Average temperature on surface:"
            value={convertTempSystem(stats.averageTemperatureOnSurface.temperature)}
          />
          )}
          {stats.averageTemperatureOnBottom?.temperature && (
          <InfoItem
            name="Average temperature on bottom:"
            value={convertTempSystem(stats.averageTemperatureOnBottom.temperature)}
          />
          )}
          {!!stats.divers && <InfoItem name="Dives Logged:" value={stats.divers} />}
          {!!divesCount && <InfoItem name="Divers:" value={divesCount.toString()} /> }

        </div>

        <div className={styles.item}>
          <div className={styles.header}>
            <Icon iconName="loc" size={24} />
            <span>Location</span>
          </div>
          <InfoItem name="Country:" country={location.country} value={location.country} />
          <InfoItem name="Region:" value={location.region} />
          <InfoItem name="Location:" value={location.location} />
          {coords && <InfoItem name="Coordinates:" value={`${coords.lat}°; ${coords.lng}°`} /> }
        </div>

        { !!species?.length && (
        <div className={styles.item}>
          <div className={styles.header}>
            <Icon iconName="species-octopus" size={24} />
            <span>Species</span>
          </div>
          <div className={styles.speciesWrapper}>
            {speciesBlock}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
