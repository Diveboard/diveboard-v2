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

export type Coords = {
  lat: number;
  lng: number;
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
