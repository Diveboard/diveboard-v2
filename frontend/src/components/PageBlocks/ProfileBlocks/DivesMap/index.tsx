import React, { FC, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import DivePoint from '../../../Point';
import styles from './styles.module.scss';
import { Button } from '../../../Buttons/Button';

type Maps = typeof google.maps;

const getMapOptions = (maps: Maps) => ({
  keyboardShortcuts: false,
  streetViewControl: false,
  scaleControl: false,
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
  const [navigate, setNavigate] = useState(false);

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
        <div className={`${styles.mapCover} ${navigate && styles.navigate}`} />
        <div className={styles.buttonWrapper}>
          <Button
            width={188}
            height={52}
            border="none"
            backgroundColor="#FDC90D"
            borderRadius={30}
            onClick={() => { setNavigate(!navigate); }}
          >
            {!navigate ? 'UNLOCK MAP' : 'LOCK MAP'}
          </Button>
        </div>

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
