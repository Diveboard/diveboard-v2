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
  const mockImages = [
    {
      img: 'https://burst.shopifycdn.com/photos/person-holds-a-book-over-a-stack-and-turns-the-page.jpg?width=1200&format=pjpg&exif=0&iptc=0',
      date: null,
      draft: true,
      spot: 'blalba',
    },
    {
      img: 'https://helios-i.mashable.com/imagery/articles/02mlaG4zdU1P0uiPF4NFzHK/hero-image.fill.size_1200x900.v1657640165.jpg',
      date: null,
      draft: true,
      spot: 'blalba',
    },
    {
      img: 'https://cdn.pixabay.com/photo/2018/06/17/20/35/chain-3481377_960_720.jpg',
      date: null,
      draft: true,
      spot: 'blalba',
    },
    {
      img: 'https://cdn.vox-cdn.com/thumbor/M_r5xylDOEVXpor4QkEt1bky63I=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22863764/33433274343_277deba9eb_o.jpg',
      date: null,
      draft: true,
      spot: 'blalba',
    },
    {
      img: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2021/03/artist_s_impression_of_the_james_webb_space_telescope/23231075-5-eng-GB/Artist_s_impression_of_the_James_Webb_Space_Telescope_pillars.jpg',
      date: null,
      draft: true,
      spot: 'blalba',
    },
    {
      img: 'https://cdn.pixabay.com/photo/2022/09/03/10/52/northern-gannets-7429282_960_720.jpg',
      date: null,
      draft: true,
      spot: 'blalba',
    },
    {
      img: 'https://cdn.pixabay.com/photo/2022/08/25/09/35/germany-7409782_960_720.jpg',
      date: null,
      draft: true,
      spot: 'blalba',
    },
    {
      img: 'https://cdn.pixabay.com/photo/2022/10/28/08/25/amethyst-7552587_960_720.jpg',
      date: null,
      draft: true,
      spot: 'blalba',
    },
  ];

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
        {filterBySearch(sortImages(mockImages)).map((photo, index) => (
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
        image={mockImages[imageIndex]}
        user={user}
        onClose={() => {
          setOpenLightbox(false);
        }}
        handleNextSlide={() => (imageIndex < mockImages.length - 1
          ? setImageIndex((idx) => idx + 1)
          : setOpenLightbox(false))}
        handlePrevSlide={() => (imageIndex > 0
          ? setImageIndex((idx) => idx - 1)
          : setOpenLightbox(false))}
      />
    </div>
  );
};
