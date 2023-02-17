import React from 'react';
import { SampleNextArrow, SamplePrevArrow } from '../../../Icons/IconSVGComponents/SampleNextArrows';

import styles from './sampleArrow.module.scss';

type Props = {
  className: string;
  onClick: () => void;
  classNameArr: string[];
  type?: string;
};

export const Arrow = ({
  className, onClick, classNameArr, type,
}: Props) => (
  <div className={`${className}  ${classNameArr.map((itm: string) => styles[itm]).join(' ')}`} onClick={onClick}>
    {type ? <SampleNextArrow /> : <SamplePrevArrow />}
  </div>
);
