import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Timestamp } from '@firebase/firestore';
import { ButtonGroup } from '../../../ButtonGroup';
import { Title } from '../Title';
import { SearchAnimatedInput } from '../../../Input/SearchAnimatedInput';
import { DiveCard } from '../../../Cards/DiveCard';
import styles from './styles.module.scss';
import { DiveType } from '../../../../firebase/firestore/models';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';
import { firestoreDivesService } from '../../../../firebase/firestore/firestoreServices/firestoreDivesService';
import { Loader } from '../../../Loader';

type Props = {
  dives: Array<DiveType>;
  userId: string;
  isItOwnProfile: boolean;
};

export const DivesBlock = ({ dives, userId, isItOwnProfile }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [allDataGet, setAllDataGet] = useState(false);

  const [diveForRender, setDiveForRender] = useState(dives);
  const [draftDives, setDraftDives] = useState([]);
  const [allDives, setAllDives] = useState(dives);
  const router = useRouter();

  const { userAuth } = useContext(AuthStatusContext);

  const buttons = [{
    connectedMode: 'all',
    text: 'All dives',
  }];

  useEffect(() => {
    setDiveForRender(dives);
    setAllDives(dives);
  }, [dives]);

  const [sortMode, setSortMode] = useState(buttons[0].connectedMode);

  const sortDives = async (sortT) => {
    setSortMode(sortT);
    if (sortT === 'drafts') {
      if (draftDives.length) {
        setDiveForRender(draftDives);
      } else {
        setLoading(true);
        const newDives = await firestoreDivesService.getDivesByUserId(userId, 8, 'desc', null, true);
        setDiveForRender(newDives);
        setDraftDives(newDives);
        setLoading(false);
      }
    }
    if (sortT === 'all') {
      setDiveForRender(allDives);
    }
  };

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
          onClick={sortDives}
        />
        <SearchAnimatedInput value={searchValue} setValue={setSearchValue} />
      </div>
      {!isLoading ? (
        <div className={styles.cardWrapper}>
          {!!diveForRender?.length && diveForRender.map((dive) => (
            <DiveCard
            // @ts-ignore
              key={dive.id}
              onClick={() => {
                router.push(dive.draft && userId === userAuth.uid ? `/edit-dive/${dive.id}` : `/user/${userId}/dive/${dive.id}`);
              }}
              diveName={dive.aboutDive?.tripName}
              imgSrc={dive.externalImgsUrls[0] || '/TEST_IMG_THEN_DELETE/fish.jpg'}
              tagsNumber={dive.aboutDive?.diveNumber?.toString()}
              // @ts-ignore
              date={new Date(dive.date)}
              diveTime={dive.diveData?.time}
              deepness={dive.diveData?.maxDepth}
              diversCount={dive.buddies?.length}
              diveUnitSystem={dive.unitSystem}
            />
          ))}
        </div>
      ) : <Loader loading={isLoading} />}

      {!allDataGet && sortMode !== 'drafts' && (
      <span
        className={styles.viewMore}
        onClick={async () => {
          setSortMode(buttons[0].connectedMode);
          setFetching(true);
          const last = diveForRender[diveForRender.length - 1].diveData.date;
          // @ts-ignore
          const lastDate = new Timestamp(last.seconds, last.nanoseconds);
          const data = await firestoreDivesService.getDivesByUserId(userId, 8, 'desc', lastDate);
          if (!data.length || data.length !== 8) {
            setAllDataGet(true);
          }
          setDiveForRender([...diveForRender, ...data]);
          setAllDives([...diveForRender, ...data]);
          setFetching(false);
        }}
      >
        {isFetching ? <Loader loading={isFetching} /> : 'View More'}
      </span>
      )}
    </div>

  );
};
