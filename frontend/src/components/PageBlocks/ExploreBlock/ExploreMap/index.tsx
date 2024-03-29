import React, { FC } from 'react';
import GoogleMapReact, { Maps } from 'google-map-react';
import { getMapOptions } from '../../../../utils/getMapOptions';
import { DivePoint } from '../../../Point';
import styles from './styles.module.scss';
import { Loader } from '../../../Loader';

type Props = {
  coords: {
    lat: number;
    lng: number;
  };
  zoom: number;
  isMobile?: boolean;
  renderInput?: JSX.Element;
  onMapChange: (e: GoogleMapReact.ChangeEventValue) => void;
  isLoading?: boolean;
  clusters: Array<any>
};

export const ExploreMap: FC<Props> = ({
  coords,
  zoom,
  isMobile,
  renderInput,
  onMapChange,
  isLoading = false,
  clusters,
}) => (
  <div className={styles.mapWrapper}>
    <div className={styles.loader}>
      <Loader loading={isLoading} iconName="big-loader" />
    </div>
    {isMobile && (
      <div className={styles.inputWrapper} id="mapInput">
        {renderInput}
      </div>
    )}
    <GoogleMapReact
        // @ts-ignore
      id="map"
      yesIWantToUseGoogleMapApiInternals
      bootstrapURLKeys={
          {
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
          }
        }
      defaultCenter={coords}
      center={{ lat: coords.lat, lng: coords.lng }}
      defaultZoom={zoom}
      zoom={zoom}
      options={(maps: Maps) => getMapOptions(maps)}
      onChange={onMapChange}
      draggable={!isLoading}
    >
      {clusters.length && clusters.map((point) => (
        <DivePoint
          key={point.id}
          divesCount={point.numPoints}
          lat={point.wy}
          lng={point.wx}
          diveName=""
          onClick={() => {}}
        />
      ))}
    </GoogleMapReact>
  </div>
);
