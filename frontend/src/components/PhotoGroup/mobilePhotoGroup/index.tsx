import React, { FC, useEffect, useState } from 'react';
import { doc, DocumentReference } from '@firebase/firestore';
import { PhotoCard } from '../../Cards/PhotoCard';
import styles from './styles.module.scss';
import { db } from '../../../firebase/firestore/firebaseFirestore';
import { firestoreGalleryService } from '../../../firebase/firestore/firestoreServices/firestoreGalleryService';
import { notify } from '../../../utils/notify';
import { Loader } from '../../Loader';

type Props = {
  photos: Array<string>
  pictures?: Array<{
    pictureRef: DocumentReference
  }>
};

export const MobilePhotoGroup: FC<Props> = ({ photos, pictures }) => {
  const [photosForRender, setPhotosForRender] = useState(photos);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setPhotosForRender(photos);
  }, [photos]);

  const loadMore = async () => {
    const refs = {};
    setLoading(true);
    pictures.slice(photosForRender.length, photosForRender.length + 8)
      .forEach(({ pictureRef }) => {
        // @ts-ignore
        const segments = pictureRef?._key?.path?.segments;
        const id = segments[segments.length - 1];
        refs[id] = doc(db, `pictures/${id}`);
      });
    try {
      const res = await firestoreGalleryService.getBestPictures(refs);
      setPhotosForRender([...photosForRender, ...res]);
      setLoading(false);
    } catch (e) {
      notify(e.message);
      setLoading(false);
    }
  };

  const photosElements = photosForRender.map((photo) => (
    <div key={photo}>
      <PhotoCard
        imgUrl={photo}
        size="mobileScroll"
        authorName="Author"
      />
    </div>
  ));

  return (
    <div>
      <div className={styles.scrollWrapper}>
        {photosElements}
      </div>
      {pictures.length > photosForRender.length && (
      <div
        className={`${styles.viewMore} ${styles['pt-15']}`}
        onClick={loadMore}
      >
        View More
      </div>
      )}
      <Loader loading={isLoading} />
    </div>

  );
};
