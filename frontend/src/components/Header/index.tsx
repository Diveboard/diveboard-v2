import React from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import Logo from '../../assets/icons/diveboard_logo.svg';
import Logbook from '../../assets/icons/logbook.svg';
import Dropdown from '../../assets/icons/dropdown.svg';

const Header = (): JSX.Element => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <Image src={Logo} alt="logo" />
      </div>
      <div className={styles.logbook}>
        <Image src={Logbook} alt="logbook" />
        <span className={styles.title}>Logbook</span>
        <Image src={Dropdown} />
      </div>
    </header>
  );
};

export default Header;
