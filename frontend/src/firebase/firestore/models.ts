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
