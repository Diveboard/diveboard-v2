import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import landingLabel from '../../../../../../public/images/landing-label.png';
import styles from './styles.module.scss';
import { Input } from '../../../../Input/CommonInput';
import { Button } from '../../../../Buttons/Button';
import { Icon, imageLoader } from '../../../../Icons/Icon';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';
import { ButtonGroup } from '../../../../ButtonGroup';

export const MainBannerBlock = () => {
  const isWidth = useWindowWidth(500, 768);
  const [inputValue, setInputValue] = useState('');

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
    connectedMode: 'regions',
    text: 'Regions',
  }];

  const search = () => {
    router.push(`/explore?location=${inputValue}&type=spot`);
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
          <div className={styles.inputWrapper}>
            <Input
              value={inputValue}
              setValue={setInputValue}
              placeholder="location"
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
          <ButtonGroup
            onClick={() => {
            }}
            buttons={
              buttons
            }
            special
            defaultChecked="spots"
          />
        </div>
      </div>
    </div>
  );
};
