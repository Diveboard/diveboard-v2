import React, { useState } from 'react';
import { Title } from '../Title';
import { ButtonGroup } from '../../../ButtonGroup';
import { PhotoGroup } from '../../../PhotoGroup';
import styles from './styles.module.scss';

export const PicturesBlock = () => {
  const [pictureMode, setPictureMode] = useState<'all' | 'favourites'>('all');
  const buttons = [{
    connectedMode: 'all',
    text: 'All pictures',
  },
  {
    connectedMode: 'favourites',
    text: 'Favourites',
  },
  ];

  const photos = [
    {
      imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
      favorites: 150,
      author: 'Ivan Kudrja',
    },
    {
      imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
      favorites: 150,
      author: 'Ivan Kudrja',
    },
    {
      imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
      favorites: 150,
      author: 'Ivan Kudrja',
    },
    {
      imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
      favorites: 150,
      author: 'Ivan Kudrja',
    },
    {
      imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
      favorites: 150,
      author: 'Ivan Kudrja',
    },
    {
      imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
      favorites: 150,
      author: 'Ivan Kudrja',
    },
  ];
  return (
    <div className={styles.picturesWrapper}>
      <Title title="Pictures" />
      <ButtonGroup
        mode={pictureMode}
        setMode={setPictureMode}
        buttons={
          buttons
        }
      />
      <PhotoGroup photos={photos} />
      <span
        className={styles.viewMore}
        onClick={() => {
        }}
      >
        View More Pictures
      </span>
    </div>
  );
};
