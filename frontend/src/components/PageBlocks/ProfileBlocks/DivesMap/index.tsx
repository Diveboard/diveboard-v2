import React, {
  FC, useEffect, useState,
} from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import { DivePoint } from '../../../Point';
import { Button } from '../../../Buttons/Button';
import { getMapOptions } from '../../../../utils/getMapOptions';
import styles from './styles.module.scss';
import { firestoreDivesService } from '../../../../firebase/firestore/firestoreServices/firestoreDivesService';
import { notify } from '../../../../utils/notify';
import { Loader } from '../../../Loader';

type Props = {
  userId: string;
};

export const DivesMap: FC<Props> = ({
  userId,
}) => {
  const [navigate, setNavigate] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [bounds, setBounds] = useState({
    zoom: 3,
    bounds: {
      nw: {
        lat: 74.41514341586065,
        lng: -58.087968750000016,
      },
      se: {
        lat: -23.358434223921506,
        lng: 118.74796874999998,
      },
      sw: {
        lat: -23.358434223921506,
        lng: -58.087968750000016,
      },
      ne: {
        lat: 74.41514341586065,
        lng: 118.74796874999998,
      },
    },
  });
  const [markers, setMarkers] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [mapCoords, setMapCoords] = useState({
    lat: 40.95,
    lng: 30.33,
  });
  const getClusters = (props, markersItems) => {
    const superClusters = supercluster(markersItems, {
      minZoom: 0,
      maxZoom: 16,
      radius: 50,
    });
    return superClusters({ bounds: props.bounds, zoom: props.zoom });
  };
  useEffect(() => {
    const clusrs = getClusters(bounds, markers);
    setClusters(clusrs);
  }, [bounds]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await firestoreDivesService.getSpotsCoordsByUserDives(userId);
        setMarkers(res);
        if (res.length) {
          const clusrs = getClusters(bounds, res);
          setClusters(clusrs);
          setMapCoords({ lng: res[0].lng, lat: res[0].lat });
          setZoom(7);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        notify(e.message);
      }
    })();
  }, [userId]);

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.loader}>
        <Loader loading={isLoading} iconName="big-loader" />
      </div>
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
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={
            {
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
            }
          }
          defaultCenter={mapCoords}
          center={mapCoords}
          defaultZoom={zoom}
          onChange={(e) => setBounds(e)}
          // @ts-ignore
          options={getMapOptions}
          onGoogleApiLoaded={() => setLoading(false)}
        >
          {clusters?.length && clusters.map((point) => (
            <DivePoint
              key={point.id}
              divesCount={point.numPoints}
              lat={point.wy}
              lng={point.wx}
              diveName=""
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};
