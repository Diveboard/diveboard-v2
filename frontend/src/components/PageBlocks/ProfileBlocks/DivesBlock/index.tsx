import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, DocumentReference } from '@firebase/firestore';
import { ButtonGroup } from '../../../ButtonGroup';
import { Title } from '../Title';
import { SearchAnimatedInput } from '../../../Input/SearchAnimatedInput';
import { DiveCard } from '../../../Cards/DiveCard';
import styles from './styles.module.scss';
import { DiveType } from '../../../../firebase/firestore/models';
import { AuthStatusContext } from '../../../../layouts/AuthLayout';
import { firestoreDivesService } from '../../../../firebase/firestore/firestoreServices/firestoreDivesService';
import { Loader } from '../../../Loader';
import { notify } from '../../../../utils/notify';
import { convertTimestampDate } from '../../../../utils/convertTimestampDate';
import { firestoreLogbookService } from '../../../../firebase/firestore/firestoreServices/firestoreLogbookService';
import { db } from '../../../../firebase/firestore/firebaseFirestore';
import { firestoreGeoDataService } from '../../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { SearchDropdownPanel } from '../../../Dropdown/SearchedItems/SearchDropdownPanel';

type Props = {
  divesData: Array<DiveType>;
  userId: string;
  isItOwnProfile: boolean;
  dives: Array< { diveRef: DocumentReference } >;
};

export const DivesBlock = ({
  divesData, userId, isItOwnProfile, dives,
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [diveForRender, setDiveForRender] = useState(divesData);
  const [draftDives, setDraftDives] = useState([]);
  const [allDives, setAllDives] = useState(divesData);
  const [locations, setLocations] = useState([]);
  // const [searchDives, setSearchDives] = useState([]);
  const router = useRouter();

  const { userAuth } = useContext(AuthStatusContext);

  const buttons = [{
    connectedMode: 'all',
    text: 'All dives',
  }];

  useEffect(() => {
    setDiveForRender(divesData);
    setAllDives(divesData);
  }, [divesData]);

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

  const refs = dives.map(({ diveRef }) => {
    // @ts-ignore
    const segments = diveRef?._key?.path?.segments;
    return { diveRef: doc(db, `${segments.slice(segments.length - 4).join('/')}`) };
  });

  const loadMore = async () => {
    try {
      setSortMode(buttons[0].connectedMode);
      setFetching(true);
      const data = await firestoreLogbookService
        .loadDives(refs.slice(diveForRender.length, diveForRender.length + 8), 8);
      setDiveForRender([...diveForRender, ...data]);
      setAllDives([...diveForRender, ...data]);
      setFetching(false);
    } catch (e) {
      setFetching(false);
      notify(e.message);
    }
  };

  const searchHandler = async () => {
    if (searchValue) {
      try {
        setLocations(await firestoreGeoDataService.getLocations(searchValue));
      } catch (e) {
        notify(e.message);
      }
    }
  };
  const searchDivesByLocation = async (val) => {
    if (val) {
      try {
        const res = await firestoreDivesService.getDivesByLocationName(userId, val.name);
        setLocations([]);
        setDiveForRender(res);
        setSortMode('search');
      } catch (e) {
        notify(e.message);
      }
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
        <SearchAnimatedInput value={searchValue} setValue={setSearchValue} onClick={searchHandler}>
          {!!locations?.length && (
          <SearchDropdownPanel
            loading={false}
            onItemClick={searchDivesByLocation}
            items={locations}
          />
          )}
        </SearchAnimatedInput>

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
              imgSrc={dive.pictures[0]?.url || '/images/default-species.svg'}
              tagsNumber={dive.aboutDive?.diveNumber?.toString()}
              date={convertTimestampDate(dive.diveData.date)}
              duration={dive.diveData?.duration}
              deepness={dive.diveData?.maxDepth}
              diversCount={dive.buddies?.length}
              diveUnitSystem={dive.unitSystem}
            />
          ))}
        </div>
      ) : <Loader loading={isLoading} />}

      {dives.length !== diveForRender.length && sortMode !== 'drafts' && sortMode !== 'search' && (
      <span
        className={styles.viewMore}
        onClick={loadMore}
      >
        {isFetching ? <Loader loading={isFetching} /> : 'View More'}
      </span>
      )}
    </div>

  );
};
