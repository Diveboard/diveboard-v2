export type PersonalInfoType = {
  email: null | string;
  photoURL: null | string;
  name: null | string;
};

export type PreferencesType = {
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

export type NotificationsType = {
  instant: boolean;
  biWeeklyNotifications: boolean;
  biWeeklyDigest: boolean;
  newsletters: boolean;
};
