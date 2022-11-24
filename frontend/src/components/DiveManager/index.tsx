import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
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

type Props = {
  userId: string;
};
const DiveManager = ({ userId }: Props) => {
  const [checkboxItem, setCheckboxItem] = useState(false);
  const [isChangeSelectAll, setChangeSelectAll] = useState(false);
  const [isShowSettings, setShowSettings] = useState(false);
  const [isShowPopupCopy, setShowPopupCopy] = useState(false);
  const [isShowPopupUnpublish, setShowPopupUnpublish] = useState(false);
  const [isShowPopupDelete, setShowPopupDelete] = useState(false);
  const dropdownButton = useRef(null); // button block
  const dropdownKebab = useRef(null); // kebab block
  const [isBackdrop, setBackdrop] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dives, setDives] = useState([]);
  const [sortType, setSortType] = useState('recent');

  const router = useRouter();

  const titleCopy = 'Select Properties to Copy';
  const titleUnpublish = 'This Dive will not be visible for other users and will be saved as a draft';
  const titleDeleted = 'This dive will be deleted';

  const dropdownList = [
    {
      id: 1,
      title: 'Print',
      svgItem: <Print />,
      onClick: () => {}, // TODO change
    },
    {
      id: 2,
      title: 'Export',
      svgItem: <Export />,
      onClick: () => {}, // TODO change
    },
    {
      id: 3,
      title: 'Edit Dive',
      svgItem: <EditDive />,
      onClick: () => {
        document.body.style.overflow = 'unset';
        const diveForEdit = dives.filter((i) => i.checked);
        if (diveForEdit.length !== 1) {
          // eslint-disable-next-line no-alert
          alert('Choose one item for edit');
        } else {
          router.push(`/dive/${diveForEdit[0].dive.id}`);
        }
      },
    },
    {
      id: 4,
      title: 'Copy Property',
      svgItem: <CopyProperty />,
      onClick: setShowPopupCopy,
    },
    {
      id: 5,
      title: 'Paste properties',
      svgItem: <Paste />,
      onClick: () => {}, // TODO change
    },
    {
      id: 6,
      title: 'Unpublish',
      svgItem: <Unpublish />,
      onClick: setShowPopupUnpublish,
    },
    {
      id: 7,
      title: 'Delete',
      svgItem: <Delete />,
      onClick: setShowPopupDelete,
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

  const copyButtonHandler = () => {
    closePopup();
  };

  const fetchDives = async () => {
    if (userId) {
      setLoading(true);
      const data = await firestoreDivesService.getDivesByUserId(userId);
      if (!Array.isArray(data) || data.length === 0) {
        setError('No dives');
      } else {
        setDives(data.map((item) => ({ dive: item, checked: false })));
      }
      setLoading(false);
    }
  };

  const deleteButtonHandler = async () => {
    document.body.style.overflow = 'unset';
    const divesIds = dives.filter((i) => i.checked).map((item) => item.dive.id);
    if (divesIds.length >= 1) {
      await firestoreDivesService.deleteDives(userId, divesIds);
      closePopup();
      await fetchDives();
    } else {
      // eslint-disable-next-line no-alert
      alert('Choose at least one dive');
    }
  };

  const unpublishButtonHandler = async () => {
    const diveIds = dives.filter((item) => item.checked).map((i) => i.dive.id);
    if (diveIds.length >= 1) {
      await firestoreDivesService.unpublishDives(userId, diveIds);
      closePopup();
      await fetchDives();
    } else {
      // eslint-disable-next-line no-alert
      alert('Choose at least one dive');
    }
  };

  const backdropHandler = (val: boolean) => {
    setBackdrop(val);
  };

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        backdropHandler(false);
        closePopup();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  useEffect(() => {
    fetchDives();
  }, [userId]);

  const sortDives = (divesData) => {
    if (sortType === 'recent') {
      // @ts-ignore
      return divesData.sort((a, b) => new Date(b.dive.date) - new Date(a.dive.date));
    }
    if (sortType === 'oldest') {
      // @ts-ignore
      return divesData.sort((a, b) => new Date(a.dive.date) - new Date(b.dive.date));
    }
    if (sortType === 'drafts') {
      return divesData.filter((dive) => dive.dive.draft);
    }
    return divesData;
  };

  const renderDives = sortDives(dives).map((itm) => (
    <DiveItem
      key={itm.dive.id}
      itm={itm.dive}
      checked={itm.checked}
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
    <section className={styles.wrapper}>
      <div className={styles.subheader}>
        <div className={styles.title}>Dive Manager</div>
        <div ref={dropdownKebab}>
          <KebabButton className="no__border" onClick={kebabButtonHandler}>
            <Icon iconName="kebab" width={24} height={24} />
          </KebabButton>
        </div>
      </div>
      { isLoading ? <Loader loading={isLoading} />
        : (
          <>
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
                    onClick={(val) => setSortType(val)}
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
                    showBackdrop={backdropHandler}
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
                <div className={styles.divelist}>{renderDives}</div>
              </>
            )}
          </>
        ) }
      {isBackdrop && <Backdrop />}
    </section>
  );
};

export default DiveManager;
