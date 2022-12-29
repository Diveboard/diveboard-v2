import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ButtonGroup } from '../../../ButtonGroup';
import { Title } from '../Title';
import { SearchAnimatedInput } from '../../../Input/SearchAnimatedInput';
import { DiveCard } from '../../../Cards/DiveCard';
import styles from './styles.module.scss';
import { DiveType } from '../../../../firebase/firestore/models';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

type Props = {
  dives: Array<DiveType>;
  userId: string;
  isItOwnProfile: boolean;
};

export const DivesBlock = ({ dives, userId, isItOwnProfile }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isMoreClicked, setShowMoreClicked] = useState(false);
  const isMobile = useWindowWidth(500, 769);
  const [diveForRender, setDiveForRender] = useState(isMobile ? dives : dives?.slice(0, 4));
  const router = useRouter();

  const buttons = [{
    connectedMode: 'all',
    text: 'All dives',
  },
  {
    connectedMode: 'favourite',
    text: 'Favourite',
  },
  ];

  useEffect(() => {
    setShowMoreClicked(false);
    setDiveForRender(isMobile ? dives : dives?.slice(0, 4));
  }, [dives]);

  const [sortMode, setSortMode] = useState(buttons[0].connectedMode);

  useEffect(() => {
    if (sortMode === 'drafts') {
      setShowMoreClicked(false);
      setDiveForRender(dives.filter((dive) => dive.draft));
    }
    if (sortMode === 'all') {
      setDiveForRender((isMobile || isMoreClicked) ? dives : dives?.slice(0, 4));
    }
  }, [sortMode, isMobile]);

  return (
    <div className={styles.divesWrapper}>
      <Title title="Dives" />
      <div className={styles.filtersWrapper}>
        <ButtonGroup
          buttons={isItOwnProfile ? [...buttons, {
            connectedMode: 'drafts',
            text: 'Drafts',
          }] : buttons}
          defaultChecked={sortMode}
          onClick={(item) => setSortMode(item)}
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
            diveUnitSystem={dive.unitSystem}
          />
        ))}
      </div>

      {!isMobile && dives.length > 4 && (
      <span
        className={styles.viewMore}
        onClick={() => {
          const isClicked = !isMoreClicked;
          setShowMoreClicked(isClicked);
          setSortMode(buttons[0].connectedMode);
          setDiveForRender(isClicked ? dives : dives?.slice(0, 4));
        }}
      >
        {`View ${isMoreClicked ? 'Less' : 'More'}`}
      </span>
      )}
    </div>

  );
};
