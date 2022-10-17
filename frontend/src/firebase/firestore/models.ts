import { Coords } from '../../types';
import {
  FifthStepType,
  FirstStepType, NinthStepType,
  SecondStepType, SeventhStepType,
} from '../../components/PageBlocks/LogADiveBlocks/types/stepTypes';

export type PersonalInfoType = {
  email: null | string;
  photoURL: null | string;
  name: null | string;
};

export type PreferencesType = {
  privacy: {
    divesPublic: boolean;
  };
  scientificData: {
    shareData: boolean;
    shareNotes: boolean;
  };
  language: 'English' | 'Italian' | 'Spanish' | 'German';
  unitSystem: 'metric' | 'imperial';
};

export type NotificationsType = {
  instant: boolean;
  biWeeklyNotifications: boolean;
  biWeeklyDigest: boolean;
  newsletters: boolean;
};

export type SpeciesType = {
  cname: { name: string, language: string }[];
  sname: string;
  category: string;
  coords: Coords[];
  old_eolsnames_id: number;
  imgSrc: string
};

// export type DiveType = {
//   draft: boolean;
//   name: string;
//   spot: {
//     name: string;
//     lat: number;
//     lng: number;
//   }
//   dive_number: number;
//   date: Date;
//   max_depth: number;
//   duration: number;
//   water: 'salt' | 'fresh';
//   surface_temp: number;
//   bottom_temp: number;
//   dive_type: string[];
//   water_visibility: 'bad' | 'average' | 'good' | 'excellent';
//   about: string;
//   gears: {
//     gear_items: GearType[],
//     weights: number
//   }
//   species: string[] // id
//   comments: {
//     user_id: string;
//     date: Date;
//     text: string
//   }[]
//   tanks: TankType[];
//   safety_spots: SafetySpot[];
//   dive_reviews: DiveReviews;
//   surface_interval: number;
//   current: 'none' | 'light' | 'medium' | ' strong' | 'extreme';
//   altitude: number;
//   buddies: string[] // id/email
// };

type DiveActivities = Capitalize<keyof Omit<FirstStepType['diveActivities'], 'other'>>[] | string[];

export type DiveType = {
  draft: boolean;
  diveActivities: DiveActivities;
  diveData: SecondStepType['parameters'] & SecondStepType['advancedParameters'];
  tanks: SecondStepType['tanks'];
  species: string[];
  diveCenter: { id: string; guide: string };
  buddies: FifthStepType['buddies'];
  externalImgsUrls: string[];
  danSend: boolean;
  aboutDive: FirstStepType['overview']
  & FirstStepType['diveReviews']
  oldId: number | null
  unitSystem: 'metric' | 'imperia';
  saves: number;
  spot: { id: string }
}
& SeventhStepType
& NinthStepType;

// const dive: DiveType = {
//   buddies: [],
//   danSend: false,
//   diveActivities: ['xv', 'DeepDive', 'DeepDive', 'DeepDive'],
//   diveCenter: {
//     id: '0',
//     guideId: '0',
//   },
//   diveData: {
//     surfaceInterval: 0,
//     current: 'light',
//     altitude: 0,
//     safetySpots: [{
//       id: 0,
//       depth: 0,
//       period: 0,
//     }],
//     date: new Date(),
//     bottomTemp: 0,
//     surfaceTemp: 0,
//     duration: 0,
//     time: '',
//     maxDepth: 0,
//     waterType: 'salt',
//     waterVisibility: 'bad',
//     weights: 10,
//   },
//   aboutDive: {
//     tripName: 'some name',
//     diveNumber: 0,
//     diveDifficulty: 1,
//     marineLifeQuality: 1,
//     notes: '',
//     overReview: 1,
//     wreck: 1,
//     bigFish: 1,
//   },
//   draft: false,
//   externalImgsUrls: ['https://some-picture-url.com'],
//   gears: [],
//   publishingMode: 'private',
//   species: ['ljj'],
//   spot: {
//     country: '',
//     lat: 0,
//     lng: 0,
//     name: '',
//   },
//   tanks: [{
//     id: 0,
//     size: 'cuft',
//     pressureMeasures: 'bar',
//     pressureStart: 0,
//     mixture: 'air',
//     pressureEnd: 0,
//     material: 'steel',
//     cylinder: '1x',
//     volume: 0,
//   }],
// };

export type SpotType = {
  oldId: number | null;
  name: string;
  description: string;
  score: number;
  lat: number;
  lng: number;
  zoom: number;
  location: {
    location: string; // name
    country: string; // name
    region: string; // name
  };
  bestPictures: {
    userId: string;
    diveId: string;
    pictureId: string;
  }[];
  species: string[] // species id
  dives: {
    id: number;
    userId: string;
    divesId: string[]
  }[]
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
