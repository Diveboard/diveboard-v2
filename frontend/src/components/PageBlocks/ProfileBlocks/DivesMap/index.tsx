import React, {
  FC, useEffect, useState,
} from 'react';
import GoogleMapReact from 'google-map-react';
import { useRouter } from 'next/router';
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
  const [markers, setMarkers] = useState([]);
  const [mapCoords, seMapCoords] = useState({
    lat: 40.95,
    lng: 30.33,
  });
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await firestoreDivesService.getSpotsCoordsByUserDives(userId);
        if (res.length) {
          const points = res.map((point, idx) => (
            <DivePoint
                // eslint-disable-next-line react/no-array-index-key
              key={point.id + idx}
              lat={point.lat}
              lng={point.lng}
              diveName={point.name}
              onClick={() => router.push(`/spot/${point.id}`)}
            />
          ));
          setMarkers(points);
          seMapCoords({ lng: res[0].lng, lat: res[0].lat });
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
          // @ts-ignore
          options={getMapOptions}
          onGoogleApiLoaded={() => setLoading(false)}
        >
          {!isLoading && markers}
        </GoogleMapReact>
      </div>
    </div>
  );
};
