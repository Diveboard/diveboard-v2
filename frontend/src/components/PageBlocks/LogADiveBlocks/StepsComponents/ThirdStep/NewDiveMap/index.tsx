import React, {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
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
import styles from './styles.module.scss';
import {
  firestoreGeoDataService,
} from '../../../../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { Bounds } from '../../../../../../types';
import { notify } from '../../../../../../utils/notify';
import { useDebounce } from '../../../../../../hooks/useDebounce';
import { Loader } from '../../../../../Loader';
import { LogDiveDataContext } from '../../../LogDiveData/logDiveContext';

type Props = {
  location: { lat: number, lng: number };
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
  newPoint: boolean;
  setNewPoint: React.Dispatch<React.SetStateAction<boolean>>;
  setNewPointCoords: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>;
  createdNewSpotId: string;
  boundsCoors?: Bounds;
  newPointCoords?: { lat: number, lng: number };
};

export const LogADiveDiveMap: FC<Props> = ({
  location,
  setLocation,
  zoom,
  setZoom,
  setMarkers,
  newPoint,
  setNewPoint,
  setNewPointCoords,
  createdNewSpotId,
  boundsCoors,
  newPointCoords,
}) => {
  const [region, setRegion] = useState('');
  const [boundsCoords, setBoundsCoords] = useState(null);
  const [clusters, setClusters] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const userLocation = useUserLocation();
  const bounds = useRef<Bounds>();
  const { getCurrentStep } = useContext(LogDiveDataContext);
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

  useEffect(() => {
    if (boundsCoors) {
      bounds.current = boundsCoors;
      const lat = (boundsCoors.sw.lat + boundsCoors.ne.lat) / 2;
      const lng = (boundsCoors.sw.lng + boundsCoors.ne.lng) / 2;
      setLocation({
        lat,
        lng,
      });
    }
  }, [boundsCoors]);

  useEffect(() => {
    if (setNewPositionMarker.current) {
      setNewPositionMarker?.current(newPointCoords || userLocation);
    }
  }, [newPointCoords]);

  useEffect(() => {
    if (setVisible.current) {
      setVisible.current(newPoint);
      setNewPositionMarker.current(location);
    }

    if (!newPoint && bounds.current) {
      (async () => {
        try {
          const markersItems = await firestoreSpotsService
            .getAllSpotsInMapViewport(bounds.current, 1000);
          setMarkers(markersItems);
        } catch (e) {
          notify(e.message);
        }
      })();
    }
  }, [newPoint]);
  const searchRef = useRef(null);
  const [value, setValue] = useState('');

  const getClusters = (props, markersItems) => {
    const superClusters = supercluster(markersItems, {
      minZoom: 0,
      maxZoom: 16,
      radius: 40,
    });
    return superClusters({ bounds: props.bounds, zoom: props.zoom });
  };

  const mapOnChangeHandler = async (e: GoogleMapReact.ChangeEventValue) => {
    try {
      setLoading(true);
      setMarkers([]);
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
        }, 1000);
      setClusters(getClusters(e, markersItems));
      setMarkers(markersItems);
      setLoading(false);
    } catch (ev) {
      setLoading(false);
      notify(ev.message);
    }
  };

  // @ts-ignore
  useDebounce(boundsCoords, mapOnChangeHandler, 1500);

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.searchWrapper}>
        {!newPoint && (
          <>
            <div ref={searchRef} className={styles.searchInputWrapper}>
              <SearchInput
                value={value}
                setValue={setValue}
                setQueryData={setRegion}
                ms={500}
                placeholder="Region"
              />
              <SearchedItems
                value={region}
                searchRef={searchRef}
                setValue={setRegion}
                onSearchHandler={firestoreGeoDataService.getGeonames}
                onSearchedItemClicked={async (item) => {
                  const { coords } = await firestoreGeoDataService
                    .getGeonameById(item.geonameRef);
                  setValue(item.name);
                  setLocation(coords);
                  setRegion('');
                }}
              />
            </div>
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
                  checkGeolocationAccess(() => notify('Site need permission for access to geolocation, check this in browser settings'));
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
        draggable={!isLoading}
        // @ts-ignore
        options={getMapOptions}
        onGoogleApiLoaded={({
          map,
          maps,
        }) => handleApiLoaded(map, maps)}
        onChange={(e) => {
          if (!newPoint && getCurrentStep() === 3) {
            setBoundsCoords(e);
          }
        }}
      >
        {!newPoint && clusters.length && clusters.map((point) => (
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
      <div className={styles.loader}>
        <Loader loading={isLoading} />
      </div>
    </div>
  );
};
