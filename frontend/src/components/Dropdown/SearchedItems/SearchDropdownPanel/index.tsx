import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Loader } from '../../../Loader';

type Props = {
  loading: boolean;
  items: string[];
  onItemClick: (itemName: string) => void;
};

export const SearchDropdownPanel: FC<Props> = ({
  loading,
  items,
  onItemClick,
}) => {
  const itemsComponents = items.map((item) => {
    if (item === 'no results') {
      return (
        <span
          key={item}
          className={styles.predictionItem}
        >
          {item}
        </span>
      );
    }
    return (
      <span
        key={item}
        className={styles.predictionItem}
        onClick={() => {
          onItemClick(item);
        }}
      >
        {item}
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

export default SearchDropdownPanel;
