import {
  collection, getDocs, query, orderBy, startAt, limit, where, doc, getDoc, DocumentReference,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { Bounds, Coords, SearchedLocationType } from '../../../types';
import { PathEnum } from '../firestorePaths';

export const firestoreGeoDataService = {

  getCountries: async (countryName: string) => {
    const lowCaseCountryName = countryName.trim()
      .toLowerCase();
    try {
      const docRef = collection(db, PathEnum.COUNTRIES);
      const q = query(
        docRef,
        orderBy('blob'),
        startAt(lowCaseCountryName),
        limit(5),
      );
      const querySnapshot = await getDocs(q);

      const countries: SearchedLocationType[] = [];

      querySnapshot.forEach((document) => {
        const {
          blob,
          bounds,
          geonameRef,
        } = document.data();
        const { id } = document;
        const name = blob.trim().toLowerCase();
        if (name.startsWith(lowCaseCountryName)) {
          const { northeast: ne, southwest: sw } = bounds;
          const coords = {
            ne,
            sw,
          };
          countries.push({
            id,
            name: name.charAt(0).toUpperCase() + name.slice(1).replaceAll('-', ' '),
            bounds: coords,
            geonameRef,
          });
        }
      });

      return countries;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getGeonames: async (queryName: string) => {
    const upperLocation = queryName.trim()
      .charAt(0)
      .toUpperCase() + queryName.slice(1);
    try {
      const docRef = collection(db, PathEnum.GEONAMES_ALTERNATIVE);
      const q = query(
        docRef,
        where('value', '>=', upperLocation),
        limit(15),
      );

      const locations: SearchedLocationType[] = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const {
          value, geonameRef,
        } = document.data();

        locations.push({
          id: document.id,
          geonameRef,
          name: value,
        });
      });
      return locations;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getGeonameById: async (geonameRef: DocumentReference | string) => {
    try {
      let docRef = geonameRef;
      if (typeof geonameRef === 'string') {
        docRef = doc(db, PathEnum.GEONAMES, geonameRef);
      }
      const docSnap = await getDoc(docRef as DocumentReference);
      const {
        lat, lng, asciName, areaRef,
      } = docSnap.data();
      return {
        id: docSnap.id,
        name: asciName,
        coords: {
          lat,
          lng,
        },
        areaRef,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getAreaByRef: async (areaRef: DocumentReference) => {
    try {
      const docSnap = await getDoc(areaRef);
      return docSnap.data();
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getCountryByRef: async (countryRef: DocumentReference) => {
    try {
      const docSnap = await getDoc(countryRef);
      const data = docSnap.data();
      const bounds = { ne: data.bounds.northeast, sw: data.bounds.southwest };
      const name = data.blob.charAt(0).toUpperCase() + data.blob.slice(1).replaceAll('-', ' ');
      return { name, bounds } as { bounds: Bounds, name: string };
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getAreaByCoords: async (coords: Coords) => {
    try {
      const docRef = collection(db, PathEnum.AREAS);
      const querySnapshot = await getDocs(docRef);
      let res;
      querySnapshot.forEach((document) => {
        const data = document.data();
        if (
          data.minLat < coords.lat
            && data.maxLat >= coords.lat
            && data.minLng <= coords.lng
            && data.maxLng >= coords.lng
        ) {
          res = data;
        }
      });
      return res;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getLocations: async (locationName: string) => {
    try {
      const upperLocation = locationName.trim()
        .charAt(0)
        .toUpperCase() + locationName.slice(1);
      const docRef = collection(db, PathEnum.LOCATIONS);
      const q = query(
        docRef,
        where('name', '>=', upperLocation),
        limit(15),
      );

      const locations = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const {
          name, countryRef,
        } = document.data();

        locations.push({
          id: document.id,
          countryRef,
          name,
        });
      });
      return locations;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getRegions: async (locationName) => {
    const upperLocation = locationName.trim()
      .charAt(0)
      .toUpperCase() + locationName.slice(1);
    try {
      const docRef = collection(db, PathEnum.REGIONS);
      const q = query(
        docRef,
        where('name', '>=', upperLocation),
        limit(10),
      );
      const locations: SearchedLocationType[] = [];

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((document) => {
        const { name, bounds, geonameRef } = document.data();
        let coords;
        if (bounds) {
          const { northeast: ne, southwest: sw } = bounds;
          coords = {
            ne,
            sw,
          };
        }
        locations.push({
          geonameRef,
          id: document.id,
          name,
          bounds: coords,
        });
      });
      return locations;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
