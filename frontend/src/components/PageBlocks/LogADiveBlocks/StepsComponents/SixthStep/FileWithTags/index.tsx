import React, { FC } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { Icon } from '../../../../../Icons/Icon';
import { useWindowWidth } from '../../../../../../hooks/useWindowWidth';
import styles from './styles.module.scss';

type Props = {
  file: { tags: string, file: File };
  setFile: React.Dispatch<React.SetStateAction<{ tags: string, file: File }[]>>;
};

export const FileWithTags: FC<Props> = ({ file, setFile }) => {
  const isMobile = useWindowWidth(500, 768);
  const setFileHandler = (value: string) => {
    setFile((files) => {
      const newFiles = [...files];
      return newFiles.map((fileItem) => {
        if (fileItem.file.lastModified === file.file.lastModified) {
          return { ...fileItem, tags: value };
        }
        return fileItem;
      });
    });
  };

  return (
    <div className={styles.fileItem}>
      <div className={styles.fileName}>
        <Icon iconName="file" />
        <span>{file.file.name}</span>
      </div>
      <Input
        value={file.tags}
        setValue={(value) => { setFileHandler(value as string); }}
        placeholder="Add tags and description"
        width={isMobile ? 768 : 570}
        height={isMobile ? 46 : 56}
      />
    </div>
  );
};
