import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import landingLabel from '../../../../../../public/images/landing-label.png';
import styles from './styles.module.scss';
import { Input } from '../../../../Input/CommonInput';
import { Button } from '../../../../Buttons/Button';
import { Icon, imageLoader } from '../../../../Icons/Icon';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';
import { ButtonGroup } from '../../../../ButtonGroup';
import { SearchDropdownPanel } from '../../../../Dropdown/SearchedItems/SearchDropdownPanel';
import { firestoreGeoDataService } from '../../../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { useDebounce } from '../../../../../hooks/useDebounce';
import { useOutsideClick } from '../../../../../hooks/useOutsideClick';
import { notify } from '../../../../../utils/notify';

export const MainBannerBlock = () => {
  const isWidth = useWindowWidth(500, 768);

  const router = useRouter();

  const buttons = [{
    connectedMode: 'spots',
    text: 'Spots',
  },
  {
    connectedMode: 'shops',
    text: 'Shops',
  },
  {
    connectedMode: 'region',
    text: 'Region',
  }];

  const [activeTab, setActiveTab] = useState(buttons[0].connectedMode);

  const [inputRegion, setInputRegion] = useState(null);
  const [isFetch, setIsFetch] = useState(true);
  const [regions, setRegions] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  useDebounce(searchQuery, setInputRegion, 1000);

  const searchRef = useRef(null);

  useOutsideClick(() => setRegions([]), searchRef);

  const fetchRegions = async () => {
    if (inputRegion && isFetch) {
      try {
        const res = await firestoreGeoDataService.getGeonames(inputRegion);
        setRegions(res);
      } catch (e) {
        notify('Something went wrong');
      }
    }
  };

  const search = () => {
    setIsFetch(true);
    fetchRegions();
  };

  useEffect(() => {
    if (inputRegion) {
      fetchRegions();
      setIsFetch(true);
    }
  }, [inputRegion]);

  const clickRegionHandler = async (item) => {
    setRegions([]);
    if (item.id) {
      router.push(`/explore?location=${item.geonameRef.id}&type=${activeTab}`);
    }
    setIsFetch(false);
  };

  return (
    <div className={styles.mainBannerWrapper}>
      <div className={styles.label}>
        <Image
          src={landingLabel}
          layout="fill"
          loader={imageLoader}
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>The Largest Social </h1>
        <h1 style={{ color: '#FDC90D' }} className={styles.title}>
          Scuba Logbook
        </h1>

        <p className={styles.text}>
          Tap into the largest online logbook to find out the perfect
          destination and shop
        </p>

        <div className={styles.inputBlock}>
          <div className={styles.inputWrapper} ref={searchRef}>
            <Input
              value={searchQuery}
              setValue={(val) => {
                setSearchQuery(val);
              }}
              placeholder="Location"
            >
              {!!regions?.length && (
              <SearchDropdownPanel
                loading={false}
                onItemClick={clickRegionHandler}
                items={regions}
              />
              )}
            </Input>
          </div>

          <Button
            width={!isWidth ? 159 : 320}
            height={!isWidth ? 56 : 48}
            borderRadius={30}
            border="none"
            backgroundColor="#FDC90D"
            onClick={search}
          >
            <div className={styles.innerBtnWrapper}>
              <Icon iconName="search" />
              <span className={styles.btnText}>Search</span>
            </div>
          </Button>
        </div>

        <div className={styles.buttonGroup}>
          <ButtonGroup
            onClick={setActiveTab}
            buttons={buttons}
            special
            defaultChecked={activeTab}
          />
        </div>
      </div>
    </div>
  );
};
