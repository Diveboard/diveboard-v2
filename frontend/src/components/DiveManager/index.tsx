import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { Timestamp } from '@firebase/firestore';
import { ButtonGroup } from '../ButtonGroup';
import KebabButton from '../Buttons/KebabButton';
import { Checkbox } from '../CheckBox';
import { SetDropdown } from '../Dropdown/SetDropdown';
import { Icon } from '../Icons/Icon';
import { DiveItem } from './DiveItem';
import { NoDive } from './NoData';
import { Delete } from '../Icons/IconSVGComponents/Delete';
import { EditDive } from '../Icons/IconSVGComponents/Editdive';
import { Export } from '../Icons/IconSVGComponents/Export';
import { Paste } from '../Icons/IconSVGComponents/Paste';
import { Print } from '../Icons/IconSVGComponents/Print';
import { Unpublish } from '../Icons/IconSVGComponents/Unpublish';
import { CopyProperty } from '../Icons/IconSVGComponents/CopyProperty';
import { buttons } from './diveData';
import { PopupCopy } from './Popup/PopupCopy';
import { PopupDelete } from './Popup/PopupDelete';
import { PopupUnpublish } from './Popup/PopupUnpublish';
import { Popup } from './Popup';
import { Backdrop } from '../Backdrop';
import styles from './styles.module.scss';
import { firestoreDivesService } from '../../firebase/firestore/firestoreServices/firestoreDivesService';
import { Loader } from '../Loader';
import { DiveType } from '../../types';
import { notify } from '../../utils/notify';

type Props = {
  userId: string;
  userDives: Array<DiveType>
};

const DiveManager = ({ userId, userDives }: Props) => {
  const [checkboxItem, setCheckboxItem] = useState(false);

  const [isChangeSelectAll, setChangeSelectAll] = useState(false);
  const [isShowSettings, setShowSettings] = useState(false);
  const [isShowPopupCopy, setShowPopupCopy] = useState(false);
  const [isShowPopupUnpublish, setShowPopupUnpublish] = useState(false);
  const [isShowPopupDelete, setShowPopupDelete] = useState(false);

  const [isBackdrop, setBackdrop] = useState(false);

  const [copiestData, setCopiestData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);

  const [error, setError] = useState('');
  const [dives, setDives] = useState([]);
  const [recentDives, setRecentDives] = useState([]);
  const [oldestDives, setOldestDives] = useState([]);
  const [draftDives, setDraftDives] = useState([]);

  const [sortType, setSortType] = useState('recent');

  const router = useRouter();

  const dropdownButton = useRef(null); // button block
  const dropdownKebab = useRef(null); // kebab block

  const titleCopy = 'Select Properties to Copy';
  const titleUnpublish = 'This Dive will not be visible for other users and will be saved as a draft';
  const titleDeleted = 'This dive will be deleted';

  const fetchDives = async () => {
    try {
      if (userId) {
        setLoading(true);
        const data = await firestoreDivesService.getDivesByUserId(userId, 7, sortType === 'recent' ? 'desc' : 'asc', null, sortType === 'drafts');
        if (!Array.isArray(data) || data.length === 0) {
          setError('No dives');
        } else {
          const newDives = data.map((item) => ({ dive: item, checked: false }));
          if (sortType === 'recent') {
            setRecentDives(newDives);
          }
          if (sortType === 'oldest') {
            setOldestDives(newDives);
          }
          if (sortType === 'drafts') {
            setDraftDives(newDives);
          }
          setDives(newDives);
        }
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
  };
  const dropdownList = [
    {
      id: 1,
      title: 'Print',
      svgItem: <Print />,
      onClick: () => {
        setBackdrop(false);
      },
    },
    {
      id: 2,
      title: 'Export',
      svgItem: <Export />,
      onClick: () => {
        setBackdrop(false);
      },
    },
    {
      id: 3,
      title: 'Edit Dive',
      svgItem: <EditDive />,
      onClick: () => {
        document.body.style.overflow = 'unset';
        const diveForEdit = dives.filter((i) => i.checked);
        if (diveForEdit.length !== 1) {
          notify('Choose one item for edit');
        } else {
          router.push(`edit-dive/${diveForEdit[0].dive.id}#1`);
        }
      },
    },
    {
      id: 4,
      title: 'Copy Property',
      svgItem: <CopyProperty />,
      onClick: () => {
        setShowPopupCopy(true);
        setBackdrop(true);
      },
    },
    {
      id: 5,
      title: 'Paste properties',
      svgItem: <Paste />,
      onClick: async () => {
        try {
          await firestoreDivesService.updateDiveProperties(
            userId,
            copiestData.dive,
            dives.filter((i) => i.checked).map((item) => item.dive.id),
            copiestData.values,
          );
          notify('Successfully saved');
          await fetchDives();
        } catch (e) {
          notify('Something went wrong');
        }
      },
    },
    {
      id: 6,
      title: 'Unpublish',
      svgItem: <Unpublish />,
      onClick: () => {
        setShowPopupUnpublish(true);
        setBackdrop(true);
      },
    },
    {
      id: 7,
      title: 'Delete',
      svgItem: <Delete />,
      onClick: () => {
        setShowPopupDelete(true);
        setBackdrop(true);
      },
    },
  ];

  const kebabButtonHandler = () => {
    setShowSettings(() => !isShowSettings);
  };

  const hideDropdown = (status: boolean) => {
    setShowSettings(status);
  };

  // close all popup window
  const closePopup = () => {
    document.body.style.overflow = 'unset';
    setBackdrop(false);
    setShowPopupCopy(false);
    setShowPopupUnpublish(false);
    setShowPopupDelete(false);
  };

  const changeSelectAllHandler = () => {
    // if click another checkbox
    setCheckboxItem(() => !checkboxItem);
    setChangeSelectAll(false); // checkbox "Select All" was`t click
  };

  const checkboxHandler = () => {
    // if click checkbox "Select All"
    setCheckboxItem(() => !checkboxItem);
    setChangeSelectAll(true); // checkbox "Select All" was click
  };

  const copyButtonHandler = (values) => {
    const divesForCopy = dives.filter((i) => i.checked);
    if (divesForCopy.length !== 1) {
      notify('Choose one dive');
    } else {
      const selectedDive = divesForCopy[0].dive;
      setCopiestData({ dive: selectedDive, values });
    }
    closePopup();
  };

  const deleteButtonHandler = async () => {
    document.body.style.overflow = 'unset';
    const divesIds = dives.filter((i) => i.checked).map((item) => item.dive.id);
    try {
      if (divesIds.length >= 1) {
        await firestoreDivesService.deleteDives(userId, divesIds);
        closePopup();
        notify('Successfully deleted');
        await fetchDives();
      } else {
        notify('Choose at least one dive');
      }
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
  };

  const unpublishButtonHandler = async () => {
    try {
      const diveIds = [...dives].filter((item) => item.checked).map((i) => i.dive.id);
      if (diveIds.length >= 1) {
        await firestoreDivesService.unpublishDives(userId, diveIds);
        const data = await firestoreDivesService.getDivesByUserId(userId, 7, 'asc', null, true);
        closePopup();
        const newDraftDives = data.map((item) => ({ dive: item, checked: false }));
        setDraftDives(newDraftDives);
        await fetchDives();
        notify('Successfully unpublished');
      } else {
        notify('Choose at least one dive');
      }
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
  };

  // const backdropHandler = (val: boolean) => {
  //   setBackdrop(val);
  // };

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setBackdrop(false);
        closePopup();
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  useEffect(() => {
    if (!Array.isArray(userDives) || userDives.length === 0) {
      setError('No dives');
    } else {
      const newDives = userDives.map((item) => ({ dive: item, checked: false }));
      setDives(newDives);
      setRecentDives(newDives);
    }
    setLoading(false);
  }, [userId]);

  const fetchMoreDives = async () => {
    try {
      setFetching(true);
      const last = dives[dives.length - 1].dive.diveData.date;
      const lastDate = new Timestamp(last.seconds, last.nanoseconds);
      const data = await firestoreDivesService.getDivesByUserId(userId, 7, sortType === 'recent' ? 'desc' : 'asc', lastDate);
      const newDives = data.map((item) => ({ dive: item, checked: false }));
      setDives([...dives, ...newDives]);
      if (sortType === 'recent') {
        setRecentDives([...dives, ...newDives]);
      } else {
        setOldestDives([...dives, ...newDives]);
      }
      setFetching(false);
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
  };

  const sortDives = async (sortT) => {
    setSortType(sortT);
    if (sortT === 'recent') {
      setDives(recentDives);
    }
    if (sortT === 'oldest') {
      if (oldestDives.length) {
        setDives(oldestDives);
      } else {
        try {
          setLoading(true);
          const data = await firestoreDivesService.getDivesByUserId(userId, 7, 'asc');
          const newDives = data.map((item) => ({ dive: item, checked: false }));
          setDives(newDives);
          setOldestDives(newDives);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          notify(e.message);
        }
      }
    }
    if (sortT === 'drafts') {
      if (draftDives.length) {
        setDives(draftDives);
      } else {
        try {
          setLoading(true);
          const data = await firestoreDivesService.getDivesByUserId(userId, 7, 'asc', null, true);
          const newDives = data.map((item) => ({ dive: item, checked: false }));
          setDives(newDives);
          setDraftDives(newDives);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          notify(e.message);
        }
      }
    }
  };

  const renderDives = dives.map((itm) => (
    <DiveItem
      key={itm.dive.id}
      itm={itm.dive}
      checked={itm.checked}
      onClick={() => router.push(itm.dive.draft ? `/edit-dive/${itm.dive.id}` : `/user/${userId}/dive/${itm.dive.id}`)}
      setChecked={(val) => {
        const newDives = dives.map((i) => {
          if (i.dive.id === itm.dive.id) {
            i.checked = val;
          }
          return i;
        });
        setDives(newDives);
      }}
      isSelectAll={checkboxItem}
      changeIsSelectAll={changeSelectAllHandler}
      isChange={isChangeSelectAll}
    />
  ));

  return (
    <section className={`${styles.wrapper} ${styles['min-height-wrapper']}`}>
      <div className={styles.subheader}>
        <div className={styles.title}>Dive Manager</div>
        <div ref={dropdownKebab}>
          <KebabButton className="no__border" onClick={kebabButtonHandler}>
            <Icon iconName="kebab" width={24} height={24} />
          </KebabButton>
        </div>
      </div>

      {isShowPopupCopy && (
      <Popup closePopup={closePopup} title={titleCopy}>
        <PopupCopy copyButtonHandler={copyButtonHandler} />
      </Popup>
      )}
      {isShowPopupUnpublish && (
      <Popup closePopup={closePopup} title={titleUnpublish}>
        <PopupUnpublish
          unpublishButtonHandler={unpublishButtonHandler}
          popupTextHandler={closePopup}
        />
      </Popup>
      )}
      {isShowPopupDelete && (
      <Popup closePopup={closePopup} title={titleDeleted}>
        <PopupDelete
          deleteButtonHandler={deleteButtonHandler}
          popupTextHandler={closePopup}
        />
      </Popup>
      )}
      {error ? (
        <NoDive />
      ) : (
        <>
          <div className={styles.wrapper__buttons}>
            <ButtonGroup
              buttons={buttons}
              onClick={sortDives}
              defaultChecked={sortType}
            />

            <div ref={dropdownButton}>
              <KebabButton className="kebab" onClick={kebabButtonHandler}>
                Settings
                <Icon iconName="kebab" width={16} height={16} />
              </KebabButton>
            </div>
            {isShowSettings && (
            <SetDropdown
              dropdownList={dropdownList}
              dropdownButtons={[dropdownButton, dropdownKebab]}
              hideDropdown={hideDropdown}
            />
            )}
            <div className={styles.checkbox__mobile}>
              <Checkbox name="name" className="column" checked={checkboxItem} onChecked={checkboxHandler}>
                Select All
              </Checkbox>
            </div>
          </div>
          <div className={styles.checkbox}>
            <Checkbox name="name" className="column" checked={checkboxItem} onChecked={checkboxHandler}>
              Select All
            </Checkbox>
          </div>
          { isLoading ? <Loader loading={isLoading} />
            : (
              <>
                <div className={styles.divelist}>{renderDives}</div>
                {!!dives?.length && dives.length >= 7 && sortType !== 'drafts' && (
                  <div
                    className={styles.viewMore}
                    onClick={fetchMoreDives}
                  >
                    {isFetching ? <Loader loading={isFetching} /> : 'View More'}
                  </div>
                )}
              </>
            ) }
        </>
      )}
      {isBackdrop && <Backdrop />}
    </section>
  );
};

export default DiveManager;
