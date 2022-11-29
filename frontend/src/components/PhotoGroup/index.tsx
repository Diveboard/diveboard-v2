import React, { FC } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { DeskTopPhotoGroup } from './deskTopPhotoGroup';
import { MobilePhotoGroup } from './mobilePhotoGroup';
import { PhotoGroupProps } from './photoGroupProps';

export const PhotoGroup: FC<PhotoGroupProps> = ({ photos }) => {
  const isMobile = useWindowWidth(500, 768);
  return (
    <div>
      { isMobile
        ? <MobilePhotoGroup photos={photos} />
        : <DeskTopPhotoGroup photos={photos} />}
    </div>
  );
};
