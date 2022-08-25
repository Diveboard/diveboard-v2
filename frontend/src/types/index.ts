import {
  FirstStepType,
  SecondStepType,
} from '../components/PageBlocks/LogADiveBlocks/types/stepTypes';

export type UserType = {
  uid: null | string;
  email: null | string;
  photoURL: null | string;
  name: null | string;
  country: null | string;
  about: null | string;
  qualifications: string[];
};

export type DiveType =
  {
    userName: string;
    spotName: string;
    spotCountry: string;
    diveType: string;
    diveGallery: GalleryItemType[];
    gear: { name: string, manufacture: string }[];
    averageDepth: number;
    comments: CommentType[];
    species: SpeciesType[]
  }
  & FirstStepType['overview']
  & Omit<SecondStepType['parameters'], 'surfaceInterval'>
  & Omit<SecondStepType['advancedParameters'], 'altitude' | 'current'>
  & Omit<SecondStepType, 'parameters' | 'advancedParameters'>;

type GalleryItemType = {
  id: number | string;
  src: string;
  author: string;
  savedUsers: { id: string }[];
};

type RepliedCommentType = Omit<CommentType, 'liked' | 'replied'>;

type CommentType = {
  id: number | string;
  userPhotoSrc: string;
  date: Date;
  text: string;
  liked: boolean;
  replied: RepliedCommentType[];
};

type SpeciesType = {
  id: number | string;
  name: string;
  scientificName: string;
  imgSrc: string;
  distribution: {
    places: string[];
    minLat: number,
    minLng: number,
    maxLat: number,
    maxLng: number,
  }
};
