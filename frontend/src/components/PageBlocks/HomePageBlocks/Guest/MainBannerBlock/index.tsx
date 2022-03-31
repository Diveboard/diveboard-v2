import React, { useState } from 'react';
import Image from 'next/image';
import landingLabel from '../../../../../../public/assets/images/landing-label.png';
import styles from './styles.module.scss';
import { Input } from '../../../../Input';
import { Button } from '../../../../Buttons/Button';
import { Icon } from '../../../../Icons/Icon';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';

export const MainBannerBlock = () => {
  const isWidth = useWindowWidth(500, 768);
  const [inputValue, setInputValue] = useState('');
  const [filters, setFilters] = useState<'spots' | 'shops' | 'regions'>(
    'spots',
  );

  const search = () => {};
  return (
    <div className={styles.mainBannerWrapper}>
      <div className={styles.label}>
        <Image src={landingLabel} />
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
          <div className={styles.inputWrapper}>
            <Input
              padding={!isWidth ? '16px' : '12px 16px'}
              value={inputValue}
              setValue={setInputValue}
              placeholder="location"
              showIcon={false}
            />
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
          <Button
            width={83}
            height={36}
            borderRadius={30}
            border={
              filters === 'spots' ? 'none' : '1px solid rgba(0, 3, 69, 0.2)'
            }
            backgroundColor={
              filters === 'spots' ? 'rgba(63, 255, 255, 0.6)' : 'transparent'
            }
            onClick={() => {
              setFilters('spots');
            }}
          >
            <span className={styles.filledBtnText}>Spots</span>
          </Button>

          <Button
            width={83}
            height={36}
            borderRadius={30}
            border={
              filters === 'shops' ? 'none' : '1px solid rgba(0, 3, 69, 0.2)'
            }
            backgroundColor={
              filters === 'shops' ? 'rgba(63, 255, 255, 0.6)' : 'transparent'
            }
            onClick={() => {
              setFilters('shops');
            }}
          >
            <span className={styles.filledBtnText}>Shops</span>
          </Button>

          <Button
            width={83}
            height={36}
            borderRadius={30}
            border={
              filters === 'regions' ? 'none' : '1px solid rgba(0, 3, 69, 0.2)'
            }
            backgroundColor={
              filters === 'regions' ? 'rgba(63, 255, 255, 0.6)' : 'transparent'
            }
            onClick={() => {
              setFilters('regions');
            }}
          >
            <span className={styles.filledBtnText}>Regions</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
