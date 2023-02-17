import React, { FC } from 'react';
import GoogleMapReact, { Maps } from 'google-map-react';
import { useRouter } from 'next/router';
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
  setZoom: (zoom: number) => void;
  points: {
    id: string;
    divesCount: number;
    lat: number;
    lng: number;
    name: string;
  }[];
  isMobile?: boolean;
  renderInput?: JSX.Element;
  onMapChange: (e: GoogleMapReact.ChangeEventValue) => void;
  isLoading?: boolean
};

export const ExploreMap: FC<Props> = ({
  coords,
  points,
  zoom,
  isMobile,
  renderInput,
  onMapChange,
  setZoom,
  isLoading = false,
}) => {
  const router = useRouter();
  console.log(points);
  const markers = points.map((point) => (
    <DivePoint
      key={point.id}
      divesCount={point.divesCount}
      lat={point.lat}
      lng={point.lng}
      diveName={point.name}
      onClick={() => router.push(`/spot/${point.id}`)}
    />
  ));

  return (
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
        center={{ lat: coords.lat - 1, lng: coords.lng }}
        defaultZoom={zoom}
        zoom={zoom}
        onZoomAnimationEnd={(zo) => setZoom(zo)}
        options={(maps: Maps) => getMapOptions(maps)}
        onChange={onMapChange}
        onClick={(e) => console.log(e)}
        draggable={!isLoading}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};
