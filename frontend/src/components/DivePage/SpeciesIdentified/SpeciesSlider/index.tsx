import React, { FC } from 'react';

import Slider from 'react-slick';
import { SpeciesCard } from '../../../Cards/SpeciesCard';
import { Arrow } from '../../DesktopPhotoBlock/SampleArrow/sampleArrow';
import { SpeciesType } from '../../../../firebase/firestore/models';

type Props = {
  speciesList: Array<SpeciesType>
};

export const SpeciesIdentified: FC<Props> = ({ speciesList }): JSX.Element => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Arrow classNameArr={['nextArrowTop']} type="next" className="" onClick={() => null} />,
    prevArrow: <Arrow classNameArr={['prevArrowTop']} className="" onClick={() => null} />,
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
    <Slider {...settings}>
      { speciesList.map((itm) => (
        <SpeciesCard
          key={itm.id}
          imgSrc={itm.imgSrc}
          speciesName={itm.sname}
          scientificName={itm.category}
          className="smallCard"
        />
      ))}
    </Slider>
  );
};
