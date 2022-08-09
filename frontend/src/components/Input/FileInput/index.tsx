import React, { FC, HTMLAttributes } from 'react';
import styles from './styles.module.scss';

const FileInput: FC<HTMLAttributes<Omit<HTMLInputElement, 'className'>> & { customClassName?: string }> = ({ customClassName = '', ...rest }) => (
  <input
    className={`${styles.fileInput} + ${customClassName}`}
    type="file"
    {...rest}
  />
);

export default FileInput;
