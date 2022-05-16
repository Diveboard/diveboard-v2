import React, { FC } from 'react';
import GoogleMapReact from 'google-map-react';
import DivePoint from '../../../Point';
import styles from './styles.module.scss';

type Maps = typeof google.maps;

const getMapOptions = (maps: Maps) => ({
  keyboardShortcuts: false,
  streetViewControl: false,
  scaleControl: true,
  fullscreenControl: false,
  mapTypeId: maps.MapTypeId.SATELLITE,
  zoomControl: false,
  clickableIcons: true,
  disableDefaultUI: true,
});

type Props = {
  coords: {
    lat: number;
    lng: number;
  };
  zoom: number;
  points: {
    id: number;
    divesCount: number;
    lat: number;
    lng: number;
    diveName: string;
  }[];
};

export const DivesMap: FC<Props> = ({
  coords,
  zoom,
  points,
}) => {
  const handleApiLoaded = (map, maps) => {
    console.log({ maps });
  };

  const markers = points.map((point) => (
    <DivePoint
      key={point.id}
      divesCount={point.divesCount}
      lat={point.lat}
      lng={point.lng}
      diveName={point.diveName}
    />
  ));

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={
            {
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
            }
          }
          defaultCenter={coords}
          center={coords}
          defaultZoom={zoom}
          options={getMapOptions}
          onGoogleApiLoaded={({
            map,
            maps,
          }) => handleApiLoaded(map, maps)}
        >
          {markers}
        </GoogleMapReact>
      </div>
    </div>
  );
};
