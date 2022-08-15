import React, { FC, useEffect, useState } from 'react';
import { Loader } from '../../Loader';
import { getLocation, getPredictions } from '../../../searchPlacesService';
import styles from './styles.module.scss';

type Props = {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>
};

export const SearchPredictions: FC<Props> = ({ region, setRegion, setLocation }) => {
  const [loading, setLoading] = useState(false);
  const [regionPredictions, setRegionPredictions] = useState<{
    description: string;
    place_id: string
  }[]>([]);

  const predictionsComponents = regionPredictions
    .map((item) => {
      if (item.description !== 'no results') {
        return (
          <span
            key={item.place_id}
            className={styles.predictionItem}
            onClick={async () => {
              const CoordsResp = await getLocation(item.place_id);
              setRegion('');
              setRegionPredictions([]);
              setLocation(CoordsResp);
            }}
          >
            {item.description}
          </span>
        );
      }
      return (
        <span
          key={item.place_id}
          className={styles.predictionItem}
        >
          {item.description}
        </span>
      );
    });

  useEffect(() => {
    if (region) {
      (async () => {
        setLoading(true);
        setRegionPredictions([]);
        const res = await getPredictions(region);
        setRegionPredictions(res);
        setLoading(false);
      })();
    } else {
      setRegionPredictions([]);
    }
  }, [region]);

  return (
    <div>
      {(!!regionPredictions.length || loading) && (
        <div className={styles.predictionsWrapper}>
          {loading && (
            <div className={styles.loaderWrapper}>
              <Loader loading={loading} />
            </div>
          )}
          {predictionsComponents}
        </div>
      )}
    </div>
  );
};
