import React, {
  FC, useMemo, useState,
} from 'react';
import styles from './styles.module.scss';

const getPointCircleWidth = (count: number) => {
  let size;
  if (count > 100) {
    size = 95;
  } if (count < 10) {
    size = 47;
  }
  if (count <= 100 && count >= 10) {
    const coef = 0.48;
    size = coef * count + 48;
  }

  return {
    outerSize: size,
    innerSize: size * 0.8,
    pointSize: size * 0.6,
  };
};

type Props = {
  divesCount: number;
  diveName: string;
  // eslint-disable-next-line react/no-unused-prop-types
  lat?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  lng?:number;
  onClick?:(name: string)=>void
};

export const DivePoint: FC<Props> = ({ divesCount, diveName, onClick }) => {
  const memoizedSizes = useMemo(() => getPointCircleWidth(divesCount), [divesCount]);
  const [showDiveName, setShowDiveName] = useState(false);
  return (
    <>
      <div
        className={styles.outer}
        style={{
          width: `${memoizedSizes.outerSize}px`,
          height: `${memoizedSizes.outerSize}px`,
        }}
        onMouseEnter={() => { setShowDiveName(true); }}
        onMouseLeave={() => { setShowDiveName(false); }}
        onClick={() => { onClick && onClick(diveName); }}
      >
        <div
          className={styles.inner}
          style={{
            width: `${memoizedSizes.innerSize}px`,
            height: `${memoizedSizes.innerSize}px`,
          }}
        >
          <div
            className={styles.point}
            style={{
              width: `${memoizedSizes.pointSize}px`,
              height: `${memoizedSizes.pointSize}px`,
            }}
          >
            <span className={styles.count}>
              {divesCount}
            </span>
          </div>
        </div>
      </div>
      {showDiveName
        && (
        <div className={styles.pointNameWrapper}>
          <span className={styles.pointName}>{diveName}</span>
        </div>
        )}
    </>

  );
};
