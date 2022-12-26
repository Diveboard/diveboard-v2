import { useContext, useEffect, useState } from 'react';
import { ThirdStepType } from '../../../types/stepTypes';
import {
  firestoreShopsService,
} from '../../../../../../firebase/firestore/firestoreServices/firestoreShopsService';
import {
  firestorePublicProfileService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { LogDiveDataContext } from '../../../LogDiveData/logDiveContext';
import {
  firestoreGuidesService,
} from '../../../../../../firebase/firestore/firestoreServices/firestoreGuidesService';

export const useGetShops = () => {
  const {
    getStepData,
  } = useContext(LogDiveDataContext);

  const [shops, setShops] = useState<{
    connectedMode: string,
    text: string,
  }[]>([]);

  const [guides, setGuides] = useState<{
    connectedMode: string,
    text: string,
    imgSrc?: string
  }[]>([]);

  const { spotId } = getStepData(3) as ThirdStepType;

  useEffect(() => {
    if (spotId) {
      (async () => {
        const shopData = await firestoreShopsService.getShopsBySpotId(spotId);
        const shopsItems = shopData.map((item) => ({
          connectedMode: item.name,
          text: item.name,
        }));
        const shopsIds = shopData.map((item) => item.id);

        const guidesData = await firestoreGuidesService.getGuidesByShopsIds(shopsIds);

        const guidesItems: { connectedMode: string; text: string, imgSrc?: string }[] = [];

        for (let i = 0; i < guidesData.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          const user = await firestorePublicProfileService
            .getUserById(guidesData[i].id);
          guidesItems.push({
            text: guidesData[i].name,
            connectedMode: guidesData[i].name,
            imgSrc: user && user.photoUrl,
          });
        }

        setShops(shopsItems);
        setGuides(guidesItems);
      })();
    }
  }, [spotId]);

  return { shops, guides };
};
