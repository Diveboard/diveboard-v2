import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ButtonGroup } from '../../../ButtonGroup';
import { Title } from '../Title';
import { SearchAnimatedInput } from '../../../Input/SearchAnimatedInput';
import { DiveCard } from '../../../Cards/DiveCard';
import styles from './styles.module.scss';
import { DiveType } from '../../../../firebase/firestore/models';

type Props = {
  dives: Array<DiveType>;
  userId: string;
};

export const DivesBlock = ({ dives, userId }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isMoreClicked, setShowMoreClicked] = useState(false);
  const [diveForRender, setDiveForRender] = useState(dives?.slice(0, 4));
  const router = useRouter();

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
          buttons={
            buttons
          }
          defaultChecked={buttons[0].connectedMode}
          onClick={() => {}}
        />
        <SearchAnimatedInput value={searchValue} setValue={setSearchValue} />
      </div>
      <div className={styles.cardWrapper}>
        {!!diveForRender?.length && diveForRender.map((dive) => (
          <DiveCard
            // @ts-ignore
            key={dive.id}
            onClick={() => router.push(`/user/${userId}/dive/${dive.id}`)}
            diveName={dive.aboutDive?.tripName}
            imgSrc={dive.externalImgsUrls[0] || '/TEST_IMG_THEN_DELETE/fish.jpg'}
            tagsNumber={dive.aboutDive?.diveNumber?.toString()}
            addedToFavourite={false}
              // @ts-ignore
            date={new Date(dive.date)}
            diveTime={dive.diveData?.time}
            deepness={dive.diveData?.maxDepth}
            diversCount={dive.buddies?.length}
          />
        ))}
      </div>

      <span
        className={styles.viewMore}
        onClick={() => {
          const isClicked = !isMoreClicked;
          setShowMoreClicked(isClicked);
          setDiveForRender(isClicked ? dives : dives?.slice(0, 4));
        }}
      >
        {`View ${isMoreClicked ? 'Less' : 'More'}`}
      </span>

    </div>

  );
};
