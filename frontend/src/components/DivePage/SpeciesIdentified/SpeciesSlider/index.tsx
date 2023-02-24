import React, { FC, useEffect, useState } from 'react';

import { doc, DocumentReference } from '@firebase/firestore';
import dynamic from 'next/dynamic';
import styles from './speciesSlider.module.scss';
import { SpeciesCard } from '../../../Cards/SpeciesCard';
import { Arrow } from '../../DesktopPhotoBlock/SampleArrow/sampleArrow';
import { SpeciesType } from '../../../../firebase/firestore/models';
import { db } from '../../../../firebase/firestore/firebaseFirestore';
import { notify } from '../../../../utils/notify';
import { firestoreSpeciesServices } from '../../../../firebase/firestore/firestoreServices/firestoreSpeciesServices';

const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
});

type Props = {
  speciesList: Array<SpeciesType>
  species?: Array<{
    specieRef: DocumentReference
  }>
};

export const SpeciesIdentified: FC<Props> = ({ speciesList, species }): JSX.Element => {
  const [speciesForRender, setSpeciesForRender] = useState(speciesList);

  useEffect(() => {
    setSpeciesForRender(speciesList);
  }, [speciesList]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Arrow classNameArr={['nextArrowTop']} type="next" className="" onClick={() => null} />,
    prevArrow: <Arrow classNameArr={['prevArrowTop']} className="" onClick={() => null} />,
    beforeChange: async (curr, next) => {
      if (next > curr && species?.length && speciesForRender.length < species.length) {
        const refs = {};
        species.slice(speciesForRender.length, speciesForRender.length + 1)
          .forEach(({ specieRef }) => {
            // @ts-ignore
            const segments = specieRef?._key?.path?.segments;
            const id = segments[segments.length - 1];
            refs[id] = doc(db, `species/${id}`);
          });
        try {
          const res = await firestoreSpeciesServices.getSpeciesByRefs(refs);
          setSpeciesForRender([...speciesForRender, ...res]);
        } catch (e) {
          notify(e.message);
        }
      }
    },
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          swipeToSlide: true,
          arrows: false,
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div>
      {species?.length < 3
        ? (
          <div className={styles.cardSpecsBlock}>
            { species.map((itm, idx) => (
              <SpeciesCard
                key={speciesForRender[idx]?.id}
                imgSrc={speciesForRender[idx]?.imgSrc}
                speciesName={speciesForRender[idx]?.sname}
                scientificName={speciesForRender[idx]?.category}
              />
            ))}
          </div>
        )
        : (
          <Slider {...settings}>
            {species.map((itm, idx) => (
              <SpeciesCard
                key={speciesForRender[idx]?.id}
                imgSrc={speciesForRender[idx]?.imgSrc}
                speciesName={speciesForRender[idx]?.sname}
                scientificName={speciesForRender[idx]?.category}
                className="smallCard"
              />
            ))}
          </Slider>
        )}
    </div>

  );
};
