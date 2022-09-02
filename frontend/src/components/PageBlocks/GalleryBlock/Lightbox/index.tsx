import React, { FC, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import { ProfileImage } from '../../SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';

type ImageType = {
  imgScr: string,
  favorites: number,
  author: string,
};

type Props = {
  image: ImageType;
  open: boolean;
  onClose: () => void;
  handleNextSlide: () => void;
  handlePrevSlide: () => void;
};

export const Lightbox: FC<Props> = ({
  image,
  open,
  onClose,
  handleNextSlide,
  handlePrevSlide,
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
                href={image.imgScr}
                download
                target="_blank"
                rel="noreferrer"
              >
                <Icon iconName="download" size={30} />
              </a>
              <a
                onClick={() => navigator.share()}
              >
                <Icon iconName="share" size={30} />
              </a>
            </div>
          </div>
          <div className={styles.innerWrapper}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src={image.imgScr}
            />
            <div className={styles.imgData}>
              <div className={styles.avatar}>
                <ProfileImage
                  imgSrc="/TEST_IMG_THEN_DELETE/photo3.jpg"
                  size={44}
                />
                <span className={styles.authorName}>Alex Ksso</span>
              </div>
              <div className={styles.imgDataText}>
                <span className={styles.date}>September 15, 2021</span>
                <span className={styles.place}>Philippines, Bohol Sea, Dap Dap</span>
                <span className={styles.camera}>Camera: NIKON D800E</span>
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
