import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import GoogleMapReact from 'google-map-react';
import { getMapOptions } from '../../../../../../utils/getMapOptions';
import { DivePoint } from '../../../../../Point';
import { SearchInput } from '../../../../../Input/SearchInput';
import { Button } from '../../../../../Buttons/Button';
import { Icon } from '../../../../../Icons/Icon';
import { useUserLocation } from '../../../../../../hooks/useUserLocation';
import { checkGeolocationAccess } from '../../../../../../utils/checkGeolocationAccess';
import { SearchedItems } from '../../../../../Dropdown/SearchedItems';
import { MarkerType } from '../../../types/commonTypes';
import {
  firestoreSpotsService,
} from '../../../../../../firebase/firestore/firestoreServices/firestoreSpotsService';
import { Coords } from '../../../../../../types';
import styles from './styles.module.scss';
import {
  firestoreGeoDataService,
} from '../../../../../../firebase/firestore/firestoreServices/firestoreGeoDataService';

type Props = {
  location: { lat: number, lng: number };
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  markers: MarkerType[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
  newPoint: boolean;
  setNewPoint: React.Dispatch<React.SetStateAction<boolean>>;
  setNewPointCoords: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>;
  createdNewSpotId: string;
  setChosenPointId: (res: string) => void;
  setButton:React.Dispatch<React.SetStateAction<string>>;
  disableError?: () => void;
};

export const LogADiveDiveMap: FC<Props> = ({
  location,
  setLocation,
  zoom,
  setZoom,
  markers,
  setMarkers,
  newPoint,
  setNewPoint,
  setNewPointCoords,
  createdNewSpotId,
  setChosenPointId,
  setButton,
  disableError,
}) => {
  const [region, setRegion] = useState('');
  const userLocation = useUserLocation();
  const bounds = useRef<{
    ne: Coords;
    sw: Coords;
  }>();

  const markersComponents = markers.map((point) => (
    <DivePoint
      key={point.id}
      divesCount={point.divesLogged}
      lat={point.lat}
      lng={point.lng}
      diveName={point.name}
      onClick={(name) => {
        const spotId = markers.find((item) => item.name === name);
        setChosenPointId(spotId.id);
        setButton(name);
        disableError();
      }}
    />
  ));

  const setVisible = useRef<(visible: boolean) => void>();
  const setNewPositionMarker = useRef<(coords: {
    lat: number,
    lng: number,
  }) => void>();

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
    setNewPositionMarker.current = (coords) => {
      marker.setPosition(coords);
    };
  };

  const mapOnChangeHandler = async (e: GoogleMapReact.ChangeEventValue) => {
    setZoom(e.zoom);
    setLocation({
      lat: e.center.lat,
      lng: e.center.lng,
    });
    bounds.current = {
      ne: e.bounds.ne,
      sw: e.bounds.sw,
    };
    const markersItems = await firestoreSpotsService
      .getAllSpotsInMapViewport({
        ne: e.bounds.ne,
        sw: e.bounds.sw,
      });
    setMarkers(markersItems);
  };

  useEffect(() => {
    if (userLocation) setLocation(userLocation);
  }, [userLocation]);

  useEffect(() => {
    if (setVisible.current) {
      setVisible.current(newPoint);
      setNewPositionMarker.current(location);
    }

    if (!newPoint && bounds.current) {
      (async () => {
        const markersItems = await firestoreSpotsService
          .getAllSpotsInMapViewport(bounds.current);
        setMarkers(markersItems);
      })();
    }
  }, [newPoint]);

  return (
    <div className={styles.mapWrapper}>

      <div className={styles.searchWrapper}>
        {!newPoint && (
          <>

            <SearchInput setQueryData={setRegion} ms={500} placeholder="Region" />
            <SearchedItems
              value={region}
              setValue={setRegion}
              onSearchHandler={firestoreGeoDataService.getGeonamesPredictions}
              onSearchedItemClicked={async (item) => {
                const coords = await firestoreGeoDataService
                  .getGeonamesCoordsById(item.id as string);
                setLocation(coords);
                setRegion('');
              }}
            />
            <Button
              width={71}
              height={48}
              backgroundColor="#FDC90D"
              borderRadius={30}
              border="none"
              onClick={() => {
                if (userLocation) {
                  setLocation(userLocation);
                } else {
                  checkGeolocationAccess();
                }
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
        defaultCenter={userLocation}
        center={location}
        defaultZoom={zoom}
        // @ts-ignore
        options={getMapOptions}
        onGoogleApiLoaded={({
          map,
          maps,
        }) => handleApiLoaded(map, maps)}
        onChange={mapOnChangeHandler}
      >
        {!newPoint && markersComponents}
      </GoogleMapReact>
      {!newPoint && (
        <span
          className={styles.addPoint}
          onClick={async () => {
            if (createdNewSpotId) {
              await firestoreSpotsService.deleteSpot(createdNewSpotId);
            }
            setNewPoint(true);
          }}
        >
          <Icon iconName="add-point-white" />
        </span>
      )}
    </div>
  );
};
