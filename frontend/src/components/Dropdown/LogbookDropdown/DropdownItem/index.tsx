import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { MarginWrapper } from '../../../MarginWrapper';

import styles from './style.module.scss';

type Props = {
  title: string;
  link: string;
};

export const LogbookDropdownItem: FC<Props> = ({ title, link, children }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        if (link === '/log-dive' && router.pathname === '/log-dive') {
          router.push('/log-dive?isNew=true');
        } else {
          router.push(link);
        }
      }}
    >
      <a className={styles.item}>
        {children}
        <MarginWrapper left={8}>
          <span className={styles.title}>{title}</span>
        </MarginWrapper>
      </a>
    </div>
  );
};
