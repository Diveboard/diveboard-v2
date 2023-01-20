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
  img: string,
  date: Date | null,
  draft: boolean,
  spot: string
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
    dress: number,
    apparatus: number,
    current: number,
  },
  sent?: boolean,
  previous?: null,
};

export type DanSurveyType = {
  beforeDive: {
    divePlan: 'none' | 'table' | 'computer' | 'another diver' | '';
    tablesUsed: 'PADI' | 'NAUI' | 'BSAC' | 'Beuhlman' | 'US NAVY' | 'CSIEMD' | 'CSMD' | 'COMEX' | 'MN90' | ' Other' | 'none' | '';
    rest: 'rested' | 'tired' | 'exhausted' | '';
    drinks: string;
    exercise: 'none' | 'light' | 'moderate' | 'severe' | 'exhausting' | '';
    medication: string;
  }
  duringDive: {
    purpose: 'sightseeng' | 'learning' | 'teaching' | 'research' | 'photography' | 'spearfishing' | 'proficiency' | 'work' | 'other' | ''
    program: 'recreational' | 'training' | 'scientific' | 'medical' | 'commercial' | 'military' | 'competitive' | 'other' | ''
    environment: 'ocean/sea' | 'lake/quarry' | 'river/spring' | 'cave/cavern' | 'pool' | 'chamber' | 'under ice' | 'other' | '';
    platform: 'beach/shore' | 'pier' | 'small boat' | 'charter boat' | 'live-board' | 'barge' | 'landside' | 'hyperbaric facility' | 'other' | '';
    thermal: 'comfortable' | 'cold' | 'very cold' | 'hot' | '';
    load: 'resting' | 'light' | 'moderate' | 'severe' | 'exhausting' | '';
    decompression: 'safety spots' | 'in water' | 'in chamber' | 'other' | 'none' | '';
    problems: 'none' | 'equalization' | 'vertigo' | 'out of air' | 'buoyancy' | 'shared air' | 'rapid ascent' | 'sea sickness' | 'other' | '';
    equipment: 'none' | 'face mask' | 'fins' | 'weighting belt' | 'BC' | 'thermal protection' | 'dive computer' | 'depth gauge' | 'pressure gauge' | 'breathing apparatus' | 'deco reel' | 'other' | ''
  }
  afterDive:{
    feelSymptoms: 'yes' | 'no' | '';
    comments: string;
    exposeToAltitude:'none' | 'commercial aircraft' | 'unpressurized aircraft' | 'medevac aircraft' | 'group transportation' | 'helicopter' | '';
    hoursBeforeExposeAltitude: string;
    dateOfFlight: string;
    totalHoursOfExpose: string;
    altitudeOfExpose: string;
    treatedInHyperbaricChamber: 'yes' | 'no' | '';
  }

  identification:{
    DANProjectDiveExplorationID: string;
    DANMemberID: string;
    familyName: string;
    givenName: string;
    middleName: string;
    suffix: string;
    prefix: string;
    alias: string;
    degree: string;
    mothersMaidenName: string;
    sex: 'male' | 'female' | 'other' | '';
    birth: string;
    birthplaceCity: string;
    birthplaceRegion: string;
    birthplaceCountry: string;
  }
  contactInfo:{
    streetAddress:string;
    addressComplement: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneHome: string;
    phoneWork: string;
    email: string;
    language: string;
    citizenship: string;
  }
  divingExperience:{
    license: string;
    issueAgency: string;
    firstDateOfCertification: string;
    level: 'student' | 'basic' | 'advanced/speciality' | 'rescue' | 'dive master' | 'instructor' | 'technical/cave/deep diving' | 'scientific' | 'commercial' | 'military' | ''
    numberOfDivesInYear: string;
    numberOfDivesInFiveYears: string;
  }
  medicalCondition:{
    weight: { value:string, measures: 'kg' | 'lb' };
    height: { value:string, measures: 'cm' | 'in' };
    conditions: string;
    medications: string;
    cigarettes: 'yes' | 'no' | '';
  }
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
