import React from 'react';
import { Title } from '../Title';
import { ButtonGroup } from '../../../ButtonGroup';
import { PhotoGroup } from '../../../PhotoGroup';
import styles from './styles.module.scss';

export const PicturesBlock = () => {
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
  return (
    <div className={styles.picturesWrapper}>
      <Title title="Pictures" />
      <ButtonGroup
        defaultChecked="all"
        buttons={
          buttons
        }
        onClick={() => {}}
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
