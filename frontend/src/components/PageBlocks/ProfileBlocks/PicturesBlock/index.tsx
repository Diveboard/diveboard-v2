import React from 'react';
import { Title } from '../Title';
import { ButtonGroup } from '../../../ButtonGroup';
import styles from './styles.module.scss';
import { DesktopPhotoBlock } from '../../../DivePage/DesktopPhotoBlock';

type Props = {
  pictures: Array<string>
};

export const PicturesBlock = ({ pictures }: Props) => {
  const buttons = [{
    connectedMode: 'all',
    text: 'All pictures',
  }];

  // const photos = [
  //   {
  //     imgScr: '/TEST_IMG_THEN_DELETE/photo2.jpg',
  //     favorites: 150,
  //     author: 'Ivan Kudrja',
  //   },
  //   {
  //     imgScr: '/TEST_IMG_THEN_DELETE/photo3.jpg',
  //     favorites: 150,
  //     author: 'Ivan Kudrja',
  //   },
  //   {
  //     imgScr: '/TEST_IMG_THEN_DELETE/photo4.jpg',
  //     favorites: 150,
  //     author: 'Ivan Kudrja',
  //   },
  //   {
  //     imgScr: '/TEST_IMG_THEN_DELETE/shark.jpg',
  //     favorites: 150,
  //     author: 'Ivan Kudrja',
  //   },
  //   {
  //     imgScr: '/TEST_IMG_THEN_DELETE/photo5.jpg',
  //     favorites: 150,
  //     author: 'Ivan Kudrja',
  //   },
  //   {
  //     imgScr: '/TEST_IMG_THEN_DELETE/photo6.jpg',
  //     favorites: 150,
  //     author: 'Ivan Kudrja',
  //   },
  // ];

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
      <div className={styles.imagesContainer}>
        <DesktopPhotoBlock photos={pictures} />
      </div>

      {/* <PhotoGroup photos={pictures.slice(0, 6)} /> */}
      {/* <span */}
      {/*  className={styles.viewMore} */}
      {/*  onClick={() => { */}
      {/*  }} */}
      {/* > */}
      {/*  View More Pictures */}
      {/* </span> */}
    </div>
  );
};
