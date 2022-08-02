import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import KebabButton from '../../../../../Buttons/KebabButton';
import { Icon } from '../../../../../Icons/Icon';
import { SpeciesCardItem } from './SpeciesCardItem/speciesCardItem';

import styles from './styles.module.scss';

type Species = {
  id: string;
  sname: string;
  cnames: string[];
  preferred_name: string;
  picture: string;
  bio: string;
  url: string;
  rank: string;
};

type Props = {
  renderedSpeciesList: {
    selectedSection: string;
    speciesArray: Species[];
  };
  selectedSpecies: Species[];
  backButtonHandler: () => void;
  selectedSpeciesHandler: (speciesId: string) => void;
};

export const SpeciesCardList: FC<Props> = ({
  renderedSpeciesList: { selectedSection, speciesArray },
  backButtonHandler,
  selectedSpeciesHandler,
  selectedSpecies,
}) => {
  // check if alredy in SELECTED then icon = done
  const isSelected = (speciesId: string) => {
    const selectedSpeciesIndex = selectedSpecies.findIndex(
      (itm) => itm.id === speciesId,
    );
    if (selectedSpeciesIndex === -1) {
      return false;
    }
    return true;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.backBtnWrapper}>
          <KebabButton className="backButton" onClick={backButtonHandler}>
            <Icon iconName="left-arrow" width={16} height={16} />
          </KebabButton>
        </div>
        <div className={styles.title}>{selectedSection}</div>
      </div>
      <TransitionGroup className={styles.cardsWrapper}>
        {speciesArray.map((species) => (
          <CSSTransition
            key={species.id}
            timeout={200}
            classNames={{
              exitActive: styles.exitActive,
            }}
          >
            <SpeciesCardItem
              check={isSelected(species.id)}
              species={species}
              key={species.id}
              selectedSpeciesHandler={selectedSpeciesHandler}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
