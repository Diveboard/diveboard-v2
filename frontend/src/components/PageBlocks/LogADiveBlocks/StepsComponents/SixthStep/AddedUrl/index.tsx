import React, { FC } from 'react';
import { Icon } from '../../../../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  url: string
  setMediaUrl: React.Dispatch<React.SetStateAction<string[]>>
};

export const AddedUrl: FC<Props> = ({ url, setMediaUrl }) => {
  const deleteUrlHandler = async () => {
    setMediaUrl((prevUrls) => prevUrls.filter((item) => item !== url));
  };
  return (
    <span className={styles.urlItem}>
      <span className={styles.urlName}>{url}</span>
      <span onClick={deleteUrlHandler} className={styles.delete}>
        <Icon iconName="close" width={12} height={12} />
      </span>
    </span>
  );
};
