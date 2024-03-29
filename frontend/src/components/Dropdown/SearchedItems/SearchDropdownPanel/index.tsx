import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Loader } from '../../../Loader';
import { SearchedLocationType } from '../../../../types';

type Props = {
  loading: boolean;
  items: SearchedLocationType[];
  onItemClick: (itemName: SearchedLocationType) => void;
};

export const SearchDropdownPanel: FC<Props> = ({
  loading,
  items,
  onItemClick,
}) => {
  const itemsComponents = items.map((item) => {
    if (item.name === 'no results') {
      return (
        <span
          key={item.id}
          className={styles.predictionItem}
        >
          {item.name}
        </span>
      );
    }
    return (
      <span
        key={item.id}
        className={styles.predictionItem}
        onClick={() => {
          onItemClick(item);
        }}
      >
        {item.name}
      </span>
    );
  });

  return (
    <div>
      {(!!items.length || loading) && (
        <div className={styles.predictionsWrapper}>
          {loading && (
            <div className={styles.loaderWrapper}>
              <Loader loading={loading} />
            </div>
          )}
          {itemsComponents}
        </div>
      )}
    </div>
  );
};
