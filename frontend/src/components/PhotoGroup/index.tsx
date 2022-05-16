import React, { FC } from 'react';
import { PhotoGroupProps } from './photoGroupProps';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { DeskTopPhotoGroup } from './deskTopPhotoGroup';
import { MobilePhotoGroup } from './mobilePhotoGroup';

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
