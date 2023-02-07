import {
  collection, getDocs, query, orderBy, startAt, limit, where, doc, getDoc, DocumentReference,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { Coords, SearchedLocationType } from '../../../types';
import { firestorePaths } from '../firestorePaths';

export const firestoreGeoDataService = {

  getCountries: async (countryName: string) => {
    const lowCaseCountryName = countryName.trim()
      .toLowerCase();
    try {
      const docRef = collection(db, '_country');
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
      console.log(e.message);
      throw new Error('get countries suggestion error');
    }
  },

  getGeonamesCoreData: async (geoname: string) => {
    const upperGeonames = geoname.trim()
      .charAt(0)
      .toUpperCase() + geoname.slice(1);

    try {
      const docRef = collection(db, firestorePaths.geonames.path);
      const q = query(
        docRef,
        // orderBy('asciiname'),
        // startAt(upperGeonames),
        where('asciiname', '>=', upperGeonames),
        limit(5),
      );
      const querySnapshot = await getDocs(q);

      const geonamesData = [] as {
        id: string, name: string, featureClass: string, countryCode: string, featureCode: string,
      }[];

      querySnapshot.forEach((document) => {
        const { id } = document;
        const {
          asciiname,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          feature_class,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          country_code,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          feature_code,
        } = document.data();

        // const name = asciiname.trim()
        //   .charAt(0)
        //   .toUpperCase() + asciiname.slice(1);
        // if (name.startsWith(upperGeonames)) {
        geonamesData.push({
          id,
          name: asciiname,
          featureClass: feature_class,
          countryCode: country_code,
          featureCode: feature_code,
        });
        // }
      });
      return geonamesData;
    } catch (e) {
      console.log(e.message);
      throw new Error('get geonames core data error');
    }
  },

  getGeonames: async (queryName: string) => {
    const upperLocation = queryName.trim()
      .charAt(0)
      .toUpperCase() + queryName.slice(1);
    try {
      const docRef = collection(db, '_geoname_alternative');
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
      console.log(e);
      throw new Error('get geonames by name error');
    }
  },

  getGeonameById: async (geonameRef: DocumentReference | string) => {
    try {
      let docRef = geonameRef;
      if (typeof geonameRef === 'string') {
        docRef = doc(db, '_geoname', geonameRef);
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
      console.log(e);
      throw new Error('get geoname by ID error');
    }
  },

  getAreaByRef: async (areaRef: DocumentReference) => {
    try {
      const docSnap = await getDoc(areaRef);
      return docSnap.data();
    } catch (e) {
      console.log(e);
      throw new Error('get geoname coords by name error');
    }
  },

  getAreaByCoords: async (coords: Coords) => {
    try {
      const docRef = collection(db, '_area');
      const querySnapshot = await getDocs(docRef);
      let res;
      querySnapshot.forEach((document) => {
        const data = document.data();
        if (
          data.minLat < coords.lat
            && data.maxLat > coords.lat
            && data.minLng < coords.lng
            && data.maxLng > coords.lng
        ) {
          res = data;
        }
      });
      return res;
    } catch (e) {
      console.log(e);
      throw new Error('get geoname coords by name error');
    }
  },

  getRegions: async (locationName) => {
    const upperLocation = locationName.trim()
      .charAt(0)
      .toUpperCase() + locationName.slice(1);
    try {
      const docRef = collection(db, '_region');
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
      console.log(e);
      throw new Error('get regions error');
    }
  },

  getRegionArea: async (id: string) => {
    try {
      const docRef = collection(db, firestorePaths.areas.path);
      const q = query(
        docRef,
        where('id', '==', +id),
      );
      const querySnapshot = await getDocs(q);
      const regions = [];
      querySnapshot.forEach((document) => {
        regions.push(document.data());
      });
      return regions[0];
    } catch (e) {
      console.log(e);
      throw new Error('get geoname coords by name error');
    }
  },
};
