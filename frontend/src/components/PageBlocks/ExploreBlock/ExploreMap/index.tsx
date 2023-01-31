import React, { FC } from 'react';
import GoogleMapReact, { Maps } from 'google-map-react';
import { useRouter } from 'next/router';
import { getMapOptions } from '../../../../utils/getMapOptions';
import { DivePoint } from '../../../Point';
import styles from './styles.module.scss';

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
  isMobile?: boolean;
  renderInput?: JSX.Element;
  onMapChange: (e: GoogleMapReact.ChangeEventValue) => void;
};

export const ExploreMap: FC<Props> = ({
  coords,
  points,
  zoom,
  isMobile,
  renderInput,
  onMapChange,
}) => {
  const router = useRouter();

  const markers = points.map((point) => (
    <DivePoint
      key={point.id}
      divesCount={point.divesCount}
      lat={point.lat}
      lng={point.lng}
      diveName={point.diveName}
      onClick={() => router.push(`/spot/${point.id}`)}
    />
  ));

  return (
    <div className={styles.mapWrapper}>
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
        center={{ lat: coords.lat - 1, lng: coords.lng }}
        defaultZoom={zoom}
        zoom={zoom}
        options={(maps: Maps) => getMapOptions(maps)}
        onChange={onMapChange}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};
