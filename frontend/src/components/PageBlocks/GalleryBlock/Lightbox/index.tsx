import React, { FC, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import { ProfileImage } from '../../SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';
import { ImageInfo, UserType } from '../../../../types';
import { month } from '../../../../utils/date';

type Props = {
  image: ImageInfo;
  open: boolean;
  onClose: () => void;
  handleNextSlide: () => void;
  handlePrevSlide: () => void;
  user: UserType;
};

export const Lightbox: FC<Props> = ({
  image,
  open,
  onClose,
  handleNextSlide,
  handlePrevSlide,
  user,
}) => {
  const ref = useRef();

  useOutsideClick(onClose, ref);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'overlay';
    };
  }, [open]);

  if (!open) return null;

  const convertDate = (dateStr: Date) => {
    const date = new Date(dateStr);
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div
      className={styles.mask}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        <div className={styles.outerWrapper} ref={ref}>
          <div className={styles.headerNav}>
            <a onClick={handlePrevSlide}>
              <Icon iconName="back-button" size={30} />
            </a>
            <div className={styles.btnsGroup}>
              <a
                href={image.img}
                download
                target="_blank"
                rel="noreferrer"
              >
                <Icon iconName="download" size={30} />
              </a>
              <a
                onClick={() => navigator?.share()}
              >
                <Icon iconName="share" size={30} />
              </a>
            </div>
          </div>
          <div className={styles.innerWrapper}>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              className={styles.img}
              src={image.img}
              alt="image"
            />
            <div className={styles.imgData}>
              <div className={styles.avatar}>
                <ProfileImage
                  imgSrc={user.photoURL || '/appIcons/no-photo.svg'}
                  size={44}
                />
                <span className={styles.authorName}>{user.name}</span>
              </div>
              <div className={styles.imgDataText}>
                <span className={styles.date}>
                  {convertDate(image.date)}
                </span>
                <span className={styles.place}>{image.spot}</span>
                {/* <span className={styles.camera}>Camera: NIKON D800E</span> */}
              </div>
            </div>
          </div>
          <div className={styles.footerNav}>
            <a onClick={handleNextSlide}>
              <span>Next</span>
              <Icon iconName="arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
