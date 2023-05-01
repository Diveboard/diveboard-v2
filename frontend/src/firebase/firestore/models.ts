import { DocumentReference, Timestamp } from '@firebase/firestore';
import { Coords } from '../../types';
import {
  EighthStepType,
  FifthStepType,
  FirstStepType, NinthStepType,
  SecondStepType, SeventhStepType,
} from '../../components/PageBlocks/LogADiveBlocks/types/stepTypes';
import { SafetySpot, ScoreType } from '../../components/PageBlocks/LogADiveBlocks/types/commonTypes';

export type PersonalInfoType = {
  email: null | string;
  photoURL: null | string;
  name: null | string;
};

export type UnitSystem = 'METRIC' | 'IMPERIAL';
export type ShareData = 'OPEN_SHARE' | 'NOT_SHARE' | 'ANONYMOUS_SHARE';

export enum LanguageEnum {
  en = 'English',
  it = 'Italian',
  sp = 'Spanish',
  ge = 'German',
}

export type UserSettingsType = {
  firstName: string | null,
  lastName: string | null,
  nickname: string | null,
  email: string | null,
  photoUrl: string | null,
  country: string | null,
  oldId?: number,
  about: string | null,
  uid?: string,
  settings: {
    preferences: PreferencesType,
    language: string;
    notifications: NotificationsType
  },
};

export type PreferencesType = {
  privacy: {
    divesPublic: boolean;
  };
  scientificData: {
    shareData: ShareData;
    shareNotes: boolean;
  };
  unitSystem: UnitSystem;
};

export type NotificationsType = {
  instant: boolean;
  biWeeklyNotifications: boolean;
  biWeeklyDigest: boolean;
  newsletters: boolean;
};

export type SpeciesType = {
  category: string;
  id: string
  imageSrc: string
  oldId: string
  sname: string
  ref: DocumentReference;
  coords?: Coords[];
};

export type BuddiesType = {
  name: string;
  email: string;
  userRef?: DocumentReference;
  notify: boolean;
  oldId?: number;
  type: 'internal' | 'external';
  photoUrl?: string;
  diveTotal?: number;
  id?: string;
};

export type SpeciesTypeWithoutId = Omit<SpeciesType, 'id'>;

type DiveActivities = Capitalize<keyof Omit<FirstStepType['diveActivities'], 'other'>>[] | string[];

export type UserCommentType = {
  firstName: string;
  lastName: string;
  userId: string;
  photoUrl: string;
};

export type CommentType = {
  comment: string;
  replyTo?: UserCommentType | null;
  author: UserCommentType;
  createdAt: Timestamp;
};

export type MediaUrls = {
  pic?: [string, DocumentReference]
  createdAt?: Timestamp;
  url?: string,
  ref?: DocumentReference,
  id?: string
};

export type DiveType = {
  id?: string;
  ref?: DocumentReference;
  draft: boolean;
  surveyId?: string;
  diveActivities: DiveActivities;
  diveData: SecondStepType['parameters'] & SecondStepType['advancedParameters'] & { profileData?: Array<SafetySpot> };
  tanks: SecondStepType['tanks'];
  species: SpeciesType[];
  diveCenter: { id: string; guide: string };
  buddies: FifthStepType['buddies'];
  pictures: MediaUrls[];
  aboutDive: FirstStepType['overview']
  & FirstStepType['diveReviews']
  oldId: number | null
  unitSystem: UnitSystem;
  saves: number;
  spotId: string | null;
  spotRef: DocumentReference;
  comments?: Array<CommentType>;
  locationName?: string;
}
& SeventhStepType
& EighthStepType
& NinthStepType;

export type SpotType = {
  id?: string;
  oldId: number | null;
  name: string;
  description: string;
  score: number;
  lat: number;
  lng: number;
  zoom: number;
  locationName: string;
  regionName: string;
  countryName: string;
  bestPictures: { [key: string]: DocumentReference };
  species: string[] // species id
  dives: { [key: string]: DocumentReference };
  shops: string[] // shops id
  stats: {
    averageDepth: {
      imperial: number;
      metric: number;
    };
    visibility: string;
    averageCurrent: string;
    averageTemperatureOnSurface: {
      imperial: number;
      metric: number;
    };
    averageTemperatureOnBottom: {
      imperial: number;
      metric: number;
    };
    divers: number;
    divesLogged: number;
  };
};

export type RegionsType = {
  name: string;
  locations: {
    lat: number;
    lng: number;
    country: string;
  }[]
};

export type AreasType = {};

export type DivePictureType = {};

export type SpeciesAreaType = {
  active: number;
  april: number;
  august: number;
  created_at: Date;
  december: number;
  elevation: number;
  favorite_picture_id: null;
  february: number;
  geonames_core_id: number;
  id: number;
  january: number;
  july: number;
  june: number;
  march: number;
  maxLat: number;
  maxLng: number;
  may: number;
  minLat: number;
  minLng: number;
  november: number;
  october: number;
  september: number;
  updated_at: Date;
  url_name: string;
};

export type ShopUserReview = {
  userId: string;
  reviewText: string;
  boatAndEquipment: ScoreType;
  guidingAndSafety: ScoreType;
  service:ScoreType;
  liked: string[] // users id that liked this review
};

export type ShopLatestNews = {
  title: string;
  pictures: {
    imgSrc: string;
    usersSaved: string[] // users id
  }[]
  description: string;
};

export type Comment = {
  userId: string;
  commentText: string;
  liked: string[] // users id
};

export type ShopType = {
  owner: string // user id;
  name: string;
  description: string;
  city: string;
  country: string;
  score: string;
  crewMembers:({ id: string, name: string } | { name: string })[] // ids of registered users or name
  affiliations: string;
  languages: string[];
  spots: string[]; // spots id
  coords: Coords;
  address: string;
  email: string;
  website: string;
  phone: string;
  reviews: {
    boatAndEquipment: ScoreType;
    guidingAndSafety: ScoreType;
    service:ScoreType;
  }
  dives: string[];// dives id
};
