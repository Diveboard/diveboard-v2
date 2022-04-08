export type PersonalInfo = {
  email: null | string;
  photoURL: null | string;
  name: null | string;
};

export type Preferences = {
  privacy:{
    divesPublic: boolean;
  };
  scientificData:{
    shareData:boolean;
    shareNotes:boolean;
  };
  language:'English' | 'Italian' | 'Spanish' | 'German';
  unitSystem:'metric' | 'imperial';
};

export type Notifications = {
  instant: boolean;
  biWeeklyNotifications: boolean;
  biWeeklyDigest: boolean;
  newsletters: boolean;
};
