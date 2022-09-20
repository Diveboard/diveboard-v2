import { Coords } from '../types';
import {
  firestoreSpeciesServices,
} from '../firebase/firestore/firestoreServices/firestoreSpeciesServices';

type SNames = {
  id: number;
  data: string[];
  gbif_id: number;
  sname: string;
  category: string;
};

type CNames = {
  eolsname_id: number;
};

const getSpecies = (snames: SNames[], cnames: CNames[]) => {
  const categoriesSet = new Set();
  snames.forEach(((item) => {
    categoriesSet.add(item.category);
  }));

  const categories = Array.from(categoriesSet);
  return categories.reduce((acc, current: string) => {
    acc[current] = snames.filter((snameItem) => snameItem.category === current)
      .map((item) => ({
        ...item,
        cnames: cnames.filter((cnameItem) => cnameItem.eolsname_id === item.id),
      }));
    return acc;
  }, {});
};

export const getLocalSpecies = async (coords: Coords) => {
  const freq: { gbif_id: number }[] = await firestoreSpeciesServices.getFishFrequencies(coords);
  const eolSNamesIds = freq.map((item) => item.gbif_id);
  // console.log({ eolSNamesIds });
  const snames: {
    id: number;
    data: string[];
    gbif_id: number;
    sname: string;
    category: string;
  }[] = await firestoreSpeciesServices.getEolSNames(
    eolSNamesIds,
  );
  const snamesId = snames.map((item) => item.id);
  // console.log({ snamesId });
  const cnames = await firestoreSpeciesServices.getEolCNames(snamesId, 'en');
  // console.log({ cnames });
  return getSpecies(snames, cnames);
};

export const getAllSpecies = async () => {
  const snames = await firestoreSpeciesServices.getAllSNames();
  const snamesId = snames.map((item) => item.id);
  const cnames = await firestoreSpeciesServices.getEolCNames(snamesId, 'en');
  return getSpecies(snames, cnames);
};
