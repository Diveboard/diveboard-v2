import React, { FC } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Icon } from '../../Icons/Icon';

type Props = {
  link: string;
  label?: string;
  labelColor?: string;
  iconName?: string;
};

export const LinkedButton: FC<Props> = ({
  link,
  label,
  labelColor,
  iconName,
}) => (
  <Link href={link}>
    <a className={styles.linkBtn}>
      <Icon iconName={iconName} />
      {label && (
      <span
        style={{
          color: labelColor,
        }}
      >
        {label}
      </span>
      )}
    </a>
  </Link>
);
