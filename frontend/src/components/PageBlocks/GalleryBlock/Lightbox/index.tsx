import React, { FC, useRef } from 'react';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';

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
  console.log('test');

  const ref = useRef();

  useOutsideClick(onClose, ref);

  if (!open) return null;

  return (
    <div className={styles.mask}>
      <div>
        <div className={styles.outerWrapper} ref={ref}>
          <div className={styles.headerNav}>
            <a onClick={handlePrevSlide}>
              <Icon iconName="back-button" />
            </a>
            <div className={styles.btnsGroup}>
              <a
                href={image.imgScr}
                download
                target="_blank"
                rel="noreferrer"
              >
                <Icon iconName="download" />
              </a>
              <a
                onClick={() => navigator.share()}
              >
                <Icon iconName="share" />
              </a>
            </div>
          </div>
          <div className={styles.innerWrapper}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src={image.imgScr}
            />
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
