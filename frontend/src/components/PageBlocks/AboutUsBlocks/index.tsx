import React from 'react';
import { AboutUsBanner } from './AboutUsBanner';
import { InfoTextBlock } from './InfoTextBlock';
import { WrapperContainer } from '../WrapperContainer';
import { KeyFeaturesBlock } from './KeyFeaturesBlock';
import { CrewBlock } from './CrewBlock';
import { AboutMembers } from './AboutMembers';
import { OurPartners } from './OurParnters';
import styles from './styles.module.scss';

const AboutUsBlock = () => (
  <WrapperContainer>
    <AboutUsBanner />
    <div className={styles.wrapper}>
      <InfoTextBlock
        imgSrc="/images/how-it-began.png"
        title="How it all began"
        text={'It all began with a frustrated computer geek.\n'
              + 'Alex had a Mares M2 dive computer and a (cheap) Digital Camera with an underwater housing. Nothing uncommon yet. But It was incredibly painful to do anything useful with the dive profiles on his computer. They were ending up as printed pdfs in a long-forgotten folder and were too ugly to post on Flickr. The pictures were a mess too. And Alex\'s handwriting was so poor that he really had trouble reading what was written down in his paper logbook.\n'
              + 'From all this frustration shared with Pascal and Richard we got to building Diveboard. We started it as a side project which grew pretty much to become Alex\'s main occupation about 18hrs a day (yes he gets easily obsessed).\n'
              + 'Diveboard\'s objective is fairly straightforward: become the place for scuba divers to keep and share their diving memories. Also we want Diveboard to be a place to help scuba divers discover new places, species and fellow divers to make their diving experience even more enjoyable.\n'
              + 'While still under the radar - Diveboard opened silently the gates on April 8th after a few months of preparation. '}
      />
    </div>

    <KeyFeaturesBlock />
    <CrewBlock />
    <AboutMembers />
    <InfoTextBlock
      imgSrc="/images/collaboration.png"
      title="And the fans!"
      text={`Special thanks to all of you who helped us debug, test, think out Diveboard and who responded to our enthusiasm or .
        Stéphanie, Steve, Bruno, Sara, Jean-Michel, Arthur, Franck, Alexis, Luke, Calou, Bertrand, Sam, Christopher, Dick, Brook, Edward, Kyle...
        Special thanks to Christopher, creator of Scubamap, who was kind enough to share with us its database of about 1000 dive spots mostly located in both north and south America. We appreciate your support!
        Also many thanks to David, http://www.davidrosswebdesign.com/, who gave a hand for porting the plugin code to Linux.`}
    />
    <OurPartners />
  </WrapperContainer>
);

export default AboutUsBlock;
