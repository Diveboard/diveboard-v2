import React, { FC } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Icon } from '../../Icons/Icon';

type Props = {
  link: string;
  label?: string;
  labelColor?: string;
  iconName?: string;
  iconSize?: number;
  fontSize?: number;
  fontWeight?:number;
};

export const LinkedButton: FC<Props> = ({
  link,
  label,
  labelColor,
  iconName,
  iconSize,
  fontSize,
  fontWeight,

}) => (
  <Link href={link}>
    <a className={styles.linkBtn}>
      <Icon iconName={iconName} size={iconSize} />
      {label && (
      <span
        style={{
          color: labelColor,
          fontSize: `${fontSize}px`,
          fontWeight,
        }}
      >
        {label}
      </span>
      )}
    </a>
  </Link>
);
