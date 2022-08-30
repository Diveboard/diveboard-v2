import React, { useState } from 'react';
import styles from './styles.module.scss';
import { ButtonGroup } from '../../ButtonGroup';
import { buttons } from '../../DiveManager/diveData';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import { PhotoCard } from '../../Cards/PhotoCard';

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
          <PhotoCard
              /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            imgSrc={photo.imgScr}
            favourites={photo.favorites}
            authorName={photo.author}
          />
        ))}
      </div>
    </div>
  );
};
