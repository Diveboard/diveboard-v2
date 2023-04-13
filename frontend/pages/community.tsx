import React from 'react';
import { Title } from '../src/components/PageBlocks/SignInBlock/Components/Title';
import { LogoIcon } from '../src/components/PageBlocks/SignInBlock/Components/LogoIcon';

const Community = () => (
  <div className="community-wrapper">
    <LogoIcon mode="community" />
    <Title mode="community" />
    <p>
      Join our world’s biggest divers community to log your dives and find your next dive spot
    </p>
    <a href="https://discord.gg/QKtRxppgMT" target="_blank" rel="noreferrer">
      <div className="community-btn">
        Join on Discord
      </div>
    </a>
  </div>
);

export default Community;
