import React, { FC } from 'react';
import Image from 'next/image';

type Props = {
  iconName: string;
  size?: number;
  width?: number;
  height?: number;
};

export const Icon: FC<Props> = ({
  size = 24, iconName, height, width,
}) => {
  const w = width || size;
  const h = height || size;
  return (
    <Image
      src={`/assets/icons/${iconName}.svg`}
      width={w}
      height={h}
      alt={`${iconName}-icon`}
    />
  );
};
