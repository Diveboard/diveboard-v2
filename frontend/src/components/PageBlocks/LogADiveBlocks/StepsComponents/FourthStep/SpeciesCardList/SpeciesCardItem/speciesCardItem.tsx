import React, { FC, useState } from 'react';

import Image from 'next/image';
import { Icon, imageLoader } from '../../../../../../Icons/Icon';

import styles from './speciesCardItem.module.scss';
import { SpeciesType } from '../../../../../../../firebase/firestore/models';

type Props = {
  species: SpeciesType;
  selectedSpeciesHandler: (speciesId: string) => void;
  check?: boolean
};

export const SpeciesCardItem: FC<Props> = ({
  species: {
    id, sname, cname, imgSrc,
  }, selectedSpeciesHandler, check,
}) => {
  const [isErrorImg, setErrorImg] = useState(false);
  const [isCheck, setCheck] = useState(check);

  const addButtonHandler = () => {
    setCheck(() => !isCheck);
    selectedSpeciesHandler(id);
  };

  const definedSrc = () => {
    if (imgSrc.length === 0 || isErrorImg) {
      return '/images/default-species.svg';
    }
    return imgSrc;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.subwrapper}>
        <div className={styles.imgWrapper}>
          <Image
            src={definedSrc()}
            className={styles.img}
            layout="fill"
            loader={imageLoader}
            alt={sname}
            onError={() => {
              setErrorImg(true);
            }}
          />
        </div>

        <div className={styles.titleWrapper}>
          <div className={styles.title}>{cname[0].name}</div>
          <div className={styles.description}>{sname}</div>
        </div>
      </div>
      <div className={styles.addButton} onClick={addButtonHandler}>
        {isCheck ? (
          <Icon iconName="check" size={40} />
        ) : (
          <Icon iconName="add" size={40} />
        )}
      </div>
    </div>
  );
};
