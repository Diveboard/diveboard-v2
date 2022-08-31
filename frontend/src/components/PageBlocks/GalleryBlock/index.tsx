import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ButtonGroup } from '../../ButtonGroup';
import { buttons } from '../../DiveManager/diveData';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import { PhotoCard } from '../../Cards/PhotoCard';
import { Lightbox } from './Lightbox';

const photos = [
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo2.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo3.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo4.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo2.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo5.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo6.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo2.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo3.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo4.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo5.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo6.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo2.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo3.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo4.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo5.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
  {
    imgScr: '/TEST_IMG_THEN_DELETE/photo6.jpg',
    favorites: 150,
    author: 'Ivan Kudrja',
  },
];

export const GalleryBlock = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openLightbox, setOpenLightbox] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(null);

  useEffect(() => {
    document.body.style.overflow = 'overlay';
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Gallery</h1>
      <div className={styles.sortBar}>
        <ButtonGroup
          buttons={buttons}
          onClick={() => {}}
        />
        <SearchAnimatedInput
          value={searchQuery}
          setValue={setSearchQuery}
        />
      </div>
      <div
        className={styles.imageGrid}
      >
        {photos.map((photo, index) => (
          <div
              /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            onClick={() => {
              setOpenLightbox(true);
              setImageIndex(index);
            }}
          >
            <PhotoCard
              imgSrc={photo.imgScr}
              favourites={photo.favorites}
              authorName={photo.author}
            />
          </div>
        ))}
      </div>
      <Lightbox
        open={openLightbox}
        image={photos[imageIndex]}
        onClose={() => {
          setOpenLightbox(false);
        }}
        handleNextSlide={() => (imageIndex < photos.length - 1
          ? setImageIndex((idx) => idx + 1)
          : setOpenLightbox(false))}
        handlePrevSlide={() => (imageIndex > 0
          ? setImageIndex((idx) => idx - 1)
          : setOpenLightbox(false))}
      />
    </div>
  );
};
