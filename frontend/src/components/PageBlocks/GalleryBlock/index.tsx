import React, { useContext, useEffect, useState } from 'react';
import { Timestamp } from '@firebase/firestore';
import styles from './styles.module.scss';
import { ButtonGroup } from '../../ButtonGroup';
import { buttons } from '../../DiveManager/diveData';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import { PhotoCard } from '../../Cards/PhotoCard';
import { Lightbox } from './Lightbox';
import { ImageInfo } from '../../../types';
import { firestoreGalleryService } from '../../../firebase/firestore/firestoreServices/firestoreGalleryService';
import { notify } from '../../../utils/notify';
import { Loader } from '../../Loader';
import { firestoreGeoDataService } from '../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { SearchDropdownPanel } from '../../Dropdown/SearchedItems/SearchDropdownPanel';
import { NetworkStatusContext } from '../../../layouts/NetworkStatus';

type Props = {
  images: Array<ImageInfo>
};

export const GalleryBlock = ({ images }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(null);
  const [sortType, setSortType] = useState('recent');
  const [isLoading, setLoading] = useState(false);
  const [fetchedImages, setFetchedImages] = useState(images);
  const [allFethed, setAllFetched] = useState(false);
  const isOffline = useContext(NetworkStatusContext);

  useEffect(() => {
    document.body.style.overflow = 'overlay';
  }, []);

  const filterBySearch = async () => {
    try {
      setLoading(true);
      if (searchQuery) {
        const locs = await firestoreGeoDataService.getLocations(searchQuery);
        setLocations(locs);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
  };

  const loadMoreGallery = async (lastDate?: Timestamp) => {
    try {
      setAllFetched(false);
      setLoading(true);
      const res = await firestoreGalleryService.getGallery(sortType === 'oldest' ? 'asc' : 'desc', lastDate);
      setLoading(false);
      if (res.length < 20) {
        setAllFetched(true);
      }
      setFetchedImages(lastDate ? [...fetchedImages, ...res] : res);
    } catch (e) {
      setLoading(false);
      notify('Something went wrong');
    }
  };

  useEffect(() => {
    if (sortType !== 'search' && !isOffline) {
      loadMoreGallery();
    }
  }, [sortType]);

  const searchHandler = async (val) => {
    try {
      setLoading(true);
      if (val?.name) {
        setSearchQuery(val.name);
        const res = await firestoreGalleryService.getGalleryByLocation(searchQuery);
        setFetchedImages(res);
        setSortType('search');
        setLocations([]);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles['min-height-wrapper']}`}>
      <h1>Gallery</h1>
      <div className={styles.sortBar}>
        <ButtonGroup
          buttons={buttons.slice(0, 2)}
          onClick={setSortType}
          defaultChecked={sortType}
        />
        <SearchAnimatedInput
          value={searchQuery}
          setValue={setSearchQuery}
          onClick={filterBySearch}
        >
          {!!locations?.length && (
          <SearchDropdownPanel
            loading={false}
            onItemClick={searchHandler}
            items={locations}
          />
          )}
        </SearchAnimatedInput>
      </div>
      <div
        className={styles.imageGrid}
      >
        {!!fetchedImages.length && fetchedImages.map((photo, index) => (
          <div
            key={photo.imageId}
            onClick={() => {
              setOpenLightbox(true);
              setImageIndex(index);
            }}
          >
            <PhotoCard
              imgUrl={photo.url}
              authorName={photo.user?.firstName || photo.user?.lastName ? `${photo.user?.firstName || ''} ${photo.user?.lastName || ''}` : 'Author'}
            />
          </div>
        ))}
      </div>
      {(!allFethed && sortType !== 'search') && (
      <div>
        {isLoading
          ? <Loader loading={isLoading} />
          : (
            <div
              className={styles.viewMoreBtn}
              onClick={() => loadMoreGallery(fetchedImages[fetchedImages.length - 1].createdAt)}
            >
              View more
            </div>
          )}
      </div>
      )}
      <Lightbox
        open={openLightbox}
        image={fetchedImages[imageIndex]}
        user={fetchedImages[imageIndex]?.user}
        onClose={() => {
          setOpenLightbox(false);
        }}
        handleNextSlide={() => (imageIndex < fetchedImages.length - 1
          ? setImageIndex((idx) => idx + 1)
          : setOpenLightbox(false))}
        handlePrevSlide={() => (imageIndex > 0
          ? setImageIndex((idx) => idx - 1)
          : setOpenLightbox(false))}
      />
    </div>
  );
};
