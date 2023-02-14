import { DocumentReference, Timestamp } from '@firebase/firestore';
import {
  FirstStepType,
  SecondStepType,
} from '../components/PageBlocks/LogADiveBlocks/types/stepTypes';
import { UnitSystem } from '../firebase/firestore/models';

export type UserType = {
  uid: null | string;
  email: null | string;
  photoUrl: null | string;
  firstName: null | string;
  lastName: null | string,
  country: null | string;
  about: null | string;
  qualifications: string[];
};

export type ImageInfo = {
  url: string,
  createdAt: Timestamp,
  updated_A?: Timestamp,
  videoUrl: string | null,
  media: 'image' | 'video',
  spot: DocumentReference,
  user: {
    firstName: string,
    lastName: string,
    photoUrl?: string,
    userId: string
  },
  locationName: string,
  countryName: string,
  regionName: string,
  width: number,
  height: number,
  imageId: string,
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
    species: SpeciesType[];
    unitSystem: UnitSystem;
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

export type SearchedLocationType = {
  id: string,
  name: string,
  bounds?: Bounds,
  geonameRef: DocumentReference
  countryRef?: DocumentReference
};

export type Bounds = {
  ne: Coords;
  sw: Coords;
};

export type Coords = {
  lat: number;
  lng: number;
};

export type SurveyDanType = {
  version: number,
  encrypted?: boolean,
  diver: {
    dan_pde_id: string,
    dan_id: string,
    alias: string,
    mother: string,
    sex: string,
    birthday: string,
    email: string,
    language: string,
    citizenship: string,
    first_certif: string,
    certif_level: string,
    dives_12m: string,
    dives_5y: string,
    conditions: string,
    medications: string,
    cigarette: string,
    name: Array<string>,
    birthplace: [string, string, string],
    address: [string, string, string, string, string, string],
    phone_home: [string, string],
    phone_work: [string, string],
    license: [string, string],
    weight: [string, string],
    height: [string, string],
  },
  dive: {
    dive_plan: string,
    dive_plan_table: string,
    rest: string,
    drinks: string,
    exercice: string,
    med_dive: string,
    purpose: string,
    program: string,
    environment: string,
    platform: string,
    thermal_confort: string,
    workload: string,
    decompression: string,
    problems: string,
    malfunction: string,
    symptoms: string,
    comments: string,
    altitude_exposure: string,
    altitude_interval: string,
    altitude_date: string,
    altitude_length: string,
    altitude_value: string,
    hyperbar: string,
    hyperbar_location: string | null,
    hyperbar_number: string | null,
    bottom_gas: string,
    gases_number: number
    gases: Array<string>,
    visibility: number,
    dress: string,
    apparatus: number,
    current: number,
  },
  sent?: boolean,
  previous?: null,
  diveId?: string,
};

export type PropertiesType = {
  'Tanks user': boolean,
  'Water Type': boolean,
  'Dive type': boolean,
  Visibility: boolean,
  Ratings: boolean,
  Spot: boolean,
  'Dive Shop': boolean,
  'Gear used': boolean,
  Buddies: boolean,
  Guide: boolean,
};
