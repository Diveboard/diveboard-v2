import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ButtonGroup } from '../../ButtonGroup';
import { buttons } from '../../DiveManager/diveData';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import { PhotoCard } from '../../Cards/PhotoCard';
import { Lightbox } from './Lightbox';
import { ImageInfo, UserType } from '../../../types';

type Props = {
  user: UserType,
  images: Array<ImageInfo>
};

export const GalleryBlock = ({ images, user }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openLightbox, setOpenLightbox] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(null);
  const [sortType, setSortType] = useState('recent');
  useEffect(() => {
    document.body.style.overflow = 'overlay';
  }, []);

  const filterBySearch = (gallery: Array<ImageInfo>) => {
    if (searchQuery) {
      return gallery.filter((img) => img.spot.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return gallery;
  };

  const sortImages = (gallery: Array<ImageInfo>) => {
    if (sortType === 'recent') {
      return gallery.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    if (sortType === 'oldest') {
      return gallery.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    }
    if (sortType === 'drafts') {
      return gallery.filter((img) => img.draft);
    }
    return gallery;
  };

  return (
    <div className={`${styles.wrapper} ${styles['min-height-wrapper']}`}>
      <h1>Gallery</h1>
      <div className={styles.sortBar}>
        <ButtonGroup
          buttons={buttons}
          onClick={(val) => setSortType(val)}
          defaultChecked={sortType}
        />
        <SearchAnimatedInput
          value={searchQuery}
          setValue={setSearchQuery}
        />
      </div>
      <div
        className={styles.imageGrid}
      >
        {filterBySearch(sortImages(images)).map((photo, index) => (
          <div
              /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            onClick={() => {
              setOpenLightbox(true);
              setImageIndex(index);
            }}
          >
            <PhotoCard
              imgSrc={photo}
              favourites={0}
              authorName={user.name}
            />
          </div>
        ))}
      </div>
      <Lightbox
        open={openLightbox}
        image={images[imageIndex]}
        user={user}
        onClose={() => {
          setOpenLightbox(false);
        }}
        handleNextSlide={() => (imageIndex < images.length - 1
          ? setImageIndex((idx) => idx + 1)
          : setOpenLightbox(false))}
        handlePrevSlide={() => (imageIndex > 0
          ? setImageIndex((idx) => idx - 1)
          : setOpenLightbox(false))}
      />
    </div>
  );
};
