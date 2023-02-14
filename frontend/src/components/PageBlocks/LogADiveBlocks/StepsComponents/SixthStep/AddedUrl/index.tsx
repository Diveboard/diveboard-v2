import React, { FC } from 'react';
import { Icon } from '../../../../../Icons/Icon';
import styles from './styles.module.scss';
import { MediaUrls } from '../../../../../../firebase/firestore/models';

type Props = {
  mediaUrl: MediaUrls
  deleteUrlHandler: (url: MediaUrls) => void
};

export const AddedUrl: FC<Props> = ({ mediaUrl, deleteUrlHandler }) => (
  <span className={styles.urlItem}>
    <span className={styles.urlName}>{mediaUrl.url}</span>
    <span onClick={() => deleteUrlHandler(mediaUrl)} className={styles.delete}>
      <Icon iconName="close" width={12} height={12} />
    </span>
  </span>
);
