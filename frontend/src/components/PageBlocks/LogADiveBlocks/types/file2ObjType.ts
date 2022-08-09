export interface DiveObj {
  uddf: Uddf;
}

export interface Uddf {
  '@version': string;
  '#comment': unknown;
  generator: Generator;
  gasdefinitions: Gasdefinitions;
  profiledata: Profiledata;
}

export interface Gasdefinitions {
  mix: Mix;
}

export interface Mix {
  '@id': string;
  name: string;
  o2: string;
  n2: string;
  he: string;
  ar: string;
  h2: string;
}

export interface Generator {
  name: string;
  manufacturer: Manufacturer;
  version: string;
  date: DateClass;
}

export interface DateClass {
  year: string;
  month: string;
  day: string;
}

export interface Manufacturer {
  name: string;
  contact: Contact;
}

export interface Contact {
  email: string;
  homepage: string;
}

export interface Profiledata {
  repetitiongroup: Repetitiongroup;
}

export interface Repetitiongroup {
  '@id': string;
  dive: Dive;
}

export interface Dive {
  '@id': string;
  date: DateClass;
  time: Time;
  divenumber: string;
  airtemperature: string;
  lowesttemperature: string;
  greatestdepth: string;
  density: string;
  notes: Notes;
  samples: Samples;
}

export interface Notes {
  text: string;
}

export interface Samples {
  waypoint: Waypoint[];
}

export interface Waypoint {
  depth: string;
  divetime: string;
  temperature: string;
  switchmix?: Switchmix;
}

export interface Switchmix {
  '@ref': string;
}

export interface Time {
  hour: string;
  minute: string;
}
