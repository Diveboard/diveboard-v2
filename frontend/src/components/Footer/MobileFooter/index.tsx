import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon, imageLoader } from '../../Icons/Icon';
import { ArrowLink } from '../../ArrowLink';
import pageRoutes from '../../../routes/pagesRoutes.json';
import styles from './styles.module.scss';

export const FooterMobile: FC = () => {
  const router = useRouter();

  if (router.pathname !== pageRoutes.mainPageRoute
    && router.pathname !== pageRoutes.aboutPageRout) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.contentWrapper}>
        <div className={styles.labelWrapper}>
          <div className={styles.contentItem}>
            <Icon iconName="label" size={131} />
          </div>
        </div>
        <div className={styles.contentGroup}>
          <Icon iconName="logo-gold" width={189} height={27} />

          <span className={styles.donateText}>
            Help keep Diveboard kickin’ ! DIveboard is a non-profit and relies
            on your generous support to keep the platform running.
          </span>

          <ArrowLink text="Donate" color="#FFFFFF" link={pageRoutes.donatePageRoute} />
        </div>

        <div className={styles.contentGroup}>
          <Link href={pageRoutes.aboutPageRout}>
            <a>
              <span className={styles.linkText}>About Diveboard</span>
            </a>
          </Link>

          <Link href={pageRoutes.shopPageRout}>
            <a>
              <span className={styles.linkText}>Diveboard for Dive Shops</span>
            </a>
          </Link>

          <Link href={pageRoutes.mainPageRoute}>
            <a>
              <span className={styles.linkText}>TOS / Privacy</span>
            </a>
          </Link>

          <Link href={pageRoutes.supportPageRout}>
            <a>
              <span className={styles.linkText}>Contact Us</span>
            </a>
          </Link>
        </div>

        <div className={styles.contentGroup}>
          <div className={styles.socialsWrapper}>
            <span className={styles.socialsTitle}>Join Us on Socials</span>
            <div className={styles.socials}>
              <Link href="https://discord.gg/rmqJajR7">
                <a>
                  <Icon iconName="discord" size={34} />
                </a>
              </Link>
              <Link href="https://twitter.com/diveboard?s=11&t=pF2sFevv7v1darAHt1qDtQ">
                <a>
                  <Icon iconName="twitter" size={34} />
                </a>
              </Link>
              <Link href="https://github.com/Diveboard">
                <a>
                  <Icon iconName="github" size={34} />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.forkme}>
          <Image src="/images/forkme.png" width={149} height={149} loader={imageLoader} />
        </div>
      </div>
      <div className={styles.copyrightWrapper}>
        <span className={styles.copyright}>
          Copyright © 2021 by Diveboard. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
