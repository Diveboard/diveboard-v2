import React, { FC, useEffect, useState } from 'react';
import { Loader } from '../../Loader';
import { getLocation, getPredictions } from '../../../searchPlacesService';
import styles from './styles.module.scss';

type Props = {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>
  setLocation?: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>
  noMap?: boolean;
};

export const SearchPredictions: FC<Props> = ({
  region, setRegion, setLocation, noMap,
}) => {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [regionPredictions, setRegionPredictions] = useState<{
    description: string;
    place_id: string
  }[]>([]);

  const handleClick = async (item) => {
    if (noMap) {
      setRegion(item.description);
      setRegionPredictions([]);
      setClicked(true);
    } else {
      setRegion('');
      setRegionPredictions([]);
      if (setLocation) {
        const CoordsResp = await getLocation(item.place_id);
        setLocation(CoordsResp);
      }
    }
  };

  const predictionsComponents = regionPredictions
    .map((item) => {
      if (item.description !== 'no results') {
        return (
          <span
            key={item.place_id}
            className={styles.predictionItem}
            onClick={() => handleClick(item)}
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
    if (region && !clicked) {
      (async () => {
        setLoading(true);
        setRegionPredictions([]);
        const res = await getPredictions(region);
        setRegionPredictions(res);
        setLoading(false);
      })();
    } else {
      setRegionPredictions([]);
      setClicked(false);
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
