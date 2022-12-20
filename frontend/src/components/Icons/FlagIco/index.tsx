import React, { FC } from 'react';
import { hasFlag } from 'country-flag-icons';
import styles from './styles.module.scss';

type Props = {
  country: string;
  size?: number;
};

export const FlagIco: FC<Props> = ({
  country,
  size = 30,
}) => {
  const url = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`;
  return (
    <div>
      {hasFlag(country)
        ? (
          <div
            style={
            {
              backgroundImage: `url(${url})`,
              width: `${size}px`,
              height: `${size}px`,
            }
          }
            className={styles.flag}
          />
        ) : (
          <span>
            {' '}
          </span>
        )}

    </div>
  );
};
// <img src={url} width={50} height={70} className={styles.flag} alt="flag" />
