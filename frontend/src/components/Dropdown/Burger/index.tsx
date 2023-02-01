import React, {
  FC, useContext, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { LogbookDropdownItem } from '../LogbookDropdown/DropdownItem';
import { Icon } from '../../Icons/Icon';
import {
  About,
  DiveManager,
  Gallery,
  Logout,
  Settings,
  Shop,
  Support,
} from '../../Icons/IconSVGComponents';
import { logOut } from '../../../firebase/auth/authService';
import pageRoutes from '../../../routes/pagesRoutes.json';
import styles from './styles.module.scss';
import { AuthStatusContext } from '../../../layouts/AuthLayout';

const burgerItems = [
  {
    id: 1,
    svgItem: <DiveManager />,
    title: 'Dive Manager',
    link: pageRoutes.diveManagerPageRout,
  },
  {
    id: 2,
    svgItem: <Gallery />,
    title: 'Gallery',
    link: pageRoutes.galleryPageRout,
  },
  {
    id: 3,
    svgItem: <Settings />,
    title: 'Settings',
    link: pageRoutes.settingsPageRout,
  },
  {
    id: 4,
    svgItem: <About />,
    title: 'About',
    link: pageRoutes.aboutPageRout,
  },
  {
    id: 5,
    svgItem: <Support />,
    title: 'Support',
    link: pageRoutes.supportPageRout,
  },
  {
    id: 6,
    svgItem: <Shop />,
    title: 'My Shop',
    link: pageRoutes.shopPageRout,
  },
  {
    id: 7,
    svgItem: <Logout />,
    title: 'Log Out',
    link: pageRoutes.mainPageRoute,
  },
];

export const Burger: FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { setUserAuth } = useContext(AuthStatusContext);

  const outsideClickHandler = (ev: Event): void => {
    if (ev.target !== dropdownRef.current) {
      setOpen(false);
    }
  };

  const logOutUser = async () => {
    await logOut();
    await Cookies.remove('__session');
    setUserAuth(undefined);
    router.push(pageRoutes.mainPageRoute);
  };

  const dropdownElements = burgerItems.map((item) => {
    if (item.title === 'Log Out') {
      return (
        <div onClick={logOutUser} key={item.id}>
          <LogbookDropdownItem
            key={item.id}
            title={item.title}
          >
            {item.svgItem}
          </LogbookDropdownItem>
        </div>
      );
    }
    return (
      <LogbookDropdownItem key={item.id} title={item.title} link={item.link}>
        {item.svgItem}
      </LogbookDropdownItem>
    );
  });

  useOutsideClick(outsideClickHandler, dropdownRef);
  return (
    <div
      ref={dropdownRef}
      onClick={(): void => {
        setOpen(!open);
      }}
      className={styles.dropdown}
    >
      <div className={styles.dropdownButton}>
        <Icon iconName="burger" />
      </div>

      {open && <div className={styles.itemsWrapper}>{dropdownElements}</div>}
    </div>
  );
};
