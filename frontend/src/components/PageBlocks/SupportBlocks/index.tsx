import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

export const SupportBlock = () => (
  <div className={styles.supportWrapper}>
    <h1>Contact us</h1>
    <div className={styles.supportBlocksWrapper}>
      <div className={styles.supportBlock}>
        <Image src="/appIcons/contact-discord.svg" alt="discord" width={114} height={114} />
        <p>Contact our Customer Support team on our dedicated Discord</p>
        <button className={styles.discordBth}>
          <a href="https://discord.gg/rmqJajR7" target="_blank" rel="noreferrer">
            <Image src="/appIcons/contact-discord-logo.svg" alt="email" width={106} height={20} />
          </a>
        </button>
      </div>
      <div className={styles.supportBlock}>
        <Image src="/appIcons/contact-email.svg" alt="email" width={114} height={114} />
        <p>Get in touch with us via email for any business enquiries</p>
        <a href="mailto:contact@diveboard.com" className={styles.contactEmail}>contact@diveboard.com</a>
      </div>
    </div>
  </div>
);
