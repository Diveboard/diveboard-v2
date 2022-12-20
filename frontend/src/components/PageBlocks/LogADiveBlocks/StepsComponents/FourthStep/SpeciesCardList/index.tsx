import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import KebabButton from '../../../../../Buttons/KebabButton';
import { Icon } from '../../../../../Icons/Icon';
import { SpeciesCardItem } from './SpeciesCardItem/speciesCardItem';

import styles from './styles.module.scss';
import { SpeciesType } from '../../../../../../firebase/firestore/models';

type Props = {
  title: string;
  speciesList: SpeciesType[];
  backButtonHandler: () => void;
  selectedSpeciesHandler: (speciesId: string) => void;
  selectedSpeciesList?:SpeciesType[];
};

export const SpeciesCardList: FC<Props> = ({
  title,
  speciesList,
  backButtonHandler,
  selectedSpeciesHandler,
  selectedSpeciesList,
}) => {
  // check if alredy in SELECTED then icon = done
  const isSelected = (speciesId: string) => {
    const selectedSpeciesIndex = selectedSpeciesList.findIndex(
      (itm) => itm.id === speciesId,
    );
    return selectedSpeciesIndex !== -1;
  };

  const speciesCards = speciesList.map((species) => (
    <CSSTransition
      key={species.id}
      timeout={200}
      classNames={{
        exitActive: styles.exitActive,
      }}
    >
      {/* <span>hello</span> */}
      <SpeciesCardItem
        // key={species.id}
        check={isSelected(species.id)}
        species={species}
        selectedSpeciesHandler={selectedSpeciesHandler}
      />
    </CSSTransition>
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.backBtnWrapper}>
          <KebabButton className="backButton" onClick={backButtonHandler}>
            <Icon iconName="left-arrow" width={16} height={16} />
          </KebabButton>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <TransitionGroup className={styles.cardsWrapper}>
        {speciesCards}
      </TransitionGroup>
    </div>
  );
};
