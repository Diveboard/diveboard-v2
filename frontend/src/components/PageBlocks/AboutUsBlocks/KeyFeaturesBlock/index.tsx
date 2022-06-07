import React from 'react';
import Image from 'next/image';
import { FeatureCard } from './FeatureCard';
import styles from './styles.module.scss';

export const KeyFeaturesBlock = () => (
  <div className={styles.featuresWrapper}>
    <div className={styles.imagesWrapper}>
      <div className={styles.cardsWrapper}>
        <div className={styles.titleWrapper}>
          <h2> Key features</h2>
          <p>The core features of Diveboard are:</p>
        </div>
        <FeatureCard
          iconName="computer"
          title="A computer plugin (PC/Mac)"
          description="A computer plugin (PC/Mac) to connect directly your dive computer to Diveboard
      and upload your dive profile - Currently about 60 models are supported."
        />
        <FeatureCard
          iconName="map-pin"
          title="Database of species"
          description="Access to an incredible database of
        over 2 Million species along with their geographical population density
        through GBIF"
        />
        <FeatureCard
          iconName="divers"
          title="Database of dive spots"
          description="Access to a database of over 2000 dive spots all over the world"
        />
        <FeatureCard
          iconName="new-dive"
          title="Support of UDCF files"
          description="Support of UDCF files for dive profiles upload"
        />
        <FeatureCard
          iconName="support-devices"
          title="Full Support"
          description="Full HTML5 enabling support for any kind of device (PC/Tablet/Mobile)"
        />
        <FeatureCard
          iconName="share-social"
          title="Social Sharing"
          description="Integration with Facebook and Twitter's share features"
        />
        <FeatureCard
          iconName="gallery-sharing"
          title="Social photo sharing"
          description="Integration with Flickr and Facebook photo sharing features"
        />
        <FeatureCard
          iconName="species"
          title="Export of species spotted"
          description="Export of species spotted to GBIF, WoRMS and IOBIS"
        />

      </div>
      <div className={styles.leftImage}>
        <Image src="/images/left-key-features.png" layout="fill" />
      </div>
      <div className={styles.rightImage}>
        <Image src="/images/right-key-features.png" layout="fill" />
      </div>
    </div>
  </div>
);
