import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MarginWrapper } from '../../MarginWrapper';
import { Icon } from '../../Icons/Icon';
import styles from './styles.module.scss';
import { ArrowLink } from '../../ArrowLink';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.contentWrapper}>
      <div className={styles.contentGroup}>
        <div className={styles.contentItem}>
          <Icon iconName="logo-gold" width={189} height={27} />

          <span className={styles.donateText}>
            Help keep Diveboard kickin’ ! DIveboard is a non-profit and relies
            on your generous support to keep the platform running.
          </span>

          <ArrowLink text="Donate" color="#FFFFFF" link="/" />
        </div>

        <div className={styles.labelWrapper}>
          <div className={styles.contentItem}>
            <Icon iconName="label" size={131} />
          </div>
        </div>
      </div>

      <div className={styles.contentItem}>
        <div className={styles.socialsWrapper}>
          <span className={styles.socialsTitle}>Join Us on Socials</span>
          <div className={styles.socials}>
            <Link href="/">
              <a>
                <Icon iconName="discord" />
              </a>
            </Link>
            <Link href="/">
              <a>
                <Icon iconName="twitter" />
              </a>
            </Link>
            <Link href="/">
              <a>
                <Icon iconName="github" />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.contentGroup}>
        <div className={styles.contentItem}>
          <div className={styles.linksWrapper}>
            <div className={styles.linkTextWrapper}>
              <Link href="/">
                <a>
                  <span className={styles.linkText}>About Diveboard</span>
                </a>
              </Link>
              <Link href="/">
                <a>
                  <span className={styles.linkText}>
                    Diveboard for Dive Shops
                  </span>
                </a>
              </Link>
            </div>

            <MarginWrapper left={40}>
              <div className={styles.linkTextWrapper}>
                <Link href="/">
                  <a>
                    <span className={styles.linkText}>TOS / Privacy</span>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <span className={styles.linkText}>Contact Us</span>
                  </a>
                </Link>
              </div>
            </MarginWrapper>
          </div>
        </div>
      </div>

      <div className={styles.forkme}>
        <Image src="/assets/images/forkme.png" width={149} height={149} />
      </div>
    </div>
    <div className={styles.copyrightWrapper}>
      <span className={styles.copyright}>
        Copyright © 2021 by Diveboard. All Rights Reserved.
      </span>
    </div>
  </footer>
);
