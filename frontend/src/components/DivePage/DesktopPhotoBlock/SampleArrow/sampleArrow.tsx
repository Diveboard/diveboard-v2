import React, { MouseEventHandler } from 'react';
import { SampleNextArrow, SamplePrevArrow } from '../../../Icons/IconSVGComponents/SampleNextArrows';

import styles from './sampleArrow.module.scss';

// eslint-disable-next-line max-len
export const Arrow = (props: { className: string; onClick: MouseEventHandler<HTMLDivElement>; classNameArr: string[]; type?: string; }) => {
  const {
    className, onClick, classNameArr, type,
  } = props;

  return (
    <div className={`${className}  ${classNameArr.map((itm: string) => styles[itm]).join(' ')}`} onClick={onClick}>
      {type ? <SampleNextArrow /> : <SamplePrevArrow />}
    </div>
  );
};
