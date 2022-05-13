import React, { useState } from 'react';
import { ButtonGroup } from '../../../ButtonGroup';
import styles from './styles.module.scss';
import { Title } from '../Title';
import { SearchAnimatedInput } from '../../../Input/SearchAnimatedInput';
import { DiveCard } from '../../../Cards/DiveCard';

export const DivesBlock = () => {
  const [diveMode, setDiveMode] = useState<'all' | 'favourite' | 'drafts'>('all');
  const [searchValue, setSearchValue] = useState('');

  const buttons = [{
    connectedMode: 'all',
    text: 'All dives',
  },
  {
    connectedMode: 'favourite',
    text: 'Favourite',
  },
  {
    connectedMode: 'drafts',
    text: 'Drafts',
  }];

  return (
    <div className={styles.divesWrapper}>
      <Title title="Dives" />
      <div className={styles.filtersWrapper}>
        <ButtonGroup
          mode={diveMode}
          setMode={setDiveMode}
          buttons={
            buttons
          }
        />
        <SearchAnimatedInput value={searchValue} setValue={setSearchValue} />
      </div>
      <div className={styles.cardWrapper}>
        <DiveCard
          diveName="France Saint Florent Premier Août"
          imgSrc="/TEST_IMG_THEN_DELETE/fish.jpg"
          tagsNumber="131"
          addedToFavourite={false}
          date={new Date('11.04.2001')}
          diveTime={50}
          deepness={10}
          diversCount={2}
        />

        <DiveCard
          diveName="France Saint Florent Premier Août"
          imgSrc="/TEST_IMG_THEN_DELETE/photo8.jpg"
          tagsNumber="131"
          addedToFavourite={false}
          date={new Date('11.04.2001')}
          diveTime={50}
          deepness={10}
          diversCount={2}
        />

        <DiveCard
          diveName="France Saint Florent Premier Août"
          imgSrc="/TEST_IMG_THEN_DELETE/photo7.jpg"
          tagsNumber="131"
          addedToFavourite={false}
          date={new Date('11.04.2001')}
          diveTime={50}
          deepness={10}
          diversCount={2}
        />

        <DiveCard
          diveName="France Saint Florent Premier Août"
          imgSrc="/TEST_IMG_THEN_DELETE/photo6.jpg"
          tagsNumber="131"
          addedToFavourite={false}
          date={new Date('11.04.2001')}
          diveTime={50}
          deepness={10}
          diversCount={2}
        />
      </div>

      <span className={styles.viewMore} onClick={() => {}}>View More</span>

    </div>

  );
};
