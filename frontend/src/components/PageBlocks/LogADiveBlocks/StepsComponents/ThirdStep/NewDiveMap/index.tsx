import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import GoogleMapReact from 'google-map-react';
import { getMapOptions } from '../../../../../../utils/getMapOptions';
import { DivePoint } from '../../../../../Point';
import { SearchInput } from '../../../../../Input/SearchInput';
import { Button } from '../../../../../Buttons/Button';
import { Icon } from '../../../../../Icons/Icon';
import { SearchPredictions } from '../../../../../Dropdown/SarchPredictions';
import styles from './styles.module.scss';

type Props = {
  location: { lat: number, lng: number };
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>;
  zoom: number;
  points: {
    id: number;
    divesCount: number;
    lat: number;
    lng: number;
    diveName: string;
  }[];
  newPoint: boolean;
  setNewPoint: React.Dispatch<React.SetStateAction<boolean>>;
  setNewPointCoords: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>;
};

export const LogADiveDiveMap: FC<Props> = ({
  location,
  setLocation,
  zoom,
  points,
  newPoint,
  setNewPoint,
  setNewPointCoords,
}) => {
  const [region, setRegion] = useState('');

  const markers = points.map((point) => (
    <DivePoint
      key={point.id}
      divesCount={point.divesCount}
      lat={point.lat}
      lng={point.lng}
      diveName={point.diveName}
    />
  ));

  const setVisible = useRef<(visible: boolean) => void>();

  const handleApiLoaded = (map, maps) => {
    const marker = new maps.Marker({
      position: {
        ...location,
      },
      draggable: true,
      icon: '/appIcons/new-point.png',
      optimized: true,
    });

    const markerHandler = () => {
      setNewPointCoords({
        lat: marker.getPosition()
          .lat(),
        lng: marker.getPosition()
          .lng(),
      });
    };

    marker.addListener('dragend', markerHandler);
    marker.setMap(map);
    marker.setVisible(false);
    setVisible.current = (visible: boolean) => marker.setVisible(visible);
  };

  useEffect(() => {
    if (setVisible.current) {
      setVisible.current(newPoint);
    }
  }, [newPoint]);

  return (
    <div className={styles.mapWrapper}>

      <div className={styles.searchWrapper}>
        {!newPoint && (
          <>

            <SearchInput setQueryData={setRegion} ms={1000} placeholder="Region" />
            <SearchPredictions region={region} setRegion={setRegion} setLocation={setLocation} />

            <Button
              width={71}
              height={48}
              backgroundColor="#FDC90D"
              borderRadius={30}
              border="none"
              onClick={() => {
              }}
            >
              <Icon iconName="aim" />
            </Button>
          </>
        )}
      </div>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={
          {
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
          }
        }
        defaultCenter={location}
        center={location}
        defaultZoom={zoom}
        options={getMapOptions}
        onGoogleApiLoaded={({
          map,
          maps,
        }) => handleApiLoaded(map, maps)}
      >
        {!newPoint && markers}
      </GoogleMapReact>
      {!newPoint && (
        <span
          className={styles.addPoint}
          onClick={() => {
            setNewPoint(true);
          }}
        >
          <Icon iconName="add-point-white" />
        </span>
      )}
    </div>
  );
};
