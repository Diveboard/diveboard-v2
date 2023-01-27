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

  getCountryByCode: async (code: string) => {
    try {
      const docRef = collection(db, firestorePaths.countries.path);
      const q = query(
        docRef,
        where('ccode', '==', code),
      );
      const querySnapshot = await getDocs(q);
      let country: string;
      querySnapshot.forEach((document) => {
        const { cname } = document.data();
        country = cname;
      });
      return country;
    } catch (e) {
      console.log(e);
      throw new Error('get country by code error');
    }
  },

  getCountryByCoordinates: async (coordinates: Coords) => {
    try {
      const docRef = collection(db, firestorePaths.countries.path);
      const q = query(
        docRef,
      );
      const querySnapshot = await getDocs(q);

      const countries = [];

      querySnapshot.forEach((document) => {
        const {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          nesw_bounds,
          cname,
        } = document.data();
        const bounds: { northeast: Coords, southwest: Coords } = JSON.parse(nesw_bounds);

        if (bounds?.northeast.lat >= coordinates.lat
          && bounds?.southwest.lat <= coordinates.lat
          && bounds?.northeast.lng >= coordinates.lng
          && bounds?.southwest.lng <= coordinates.lat) {
          countries.push(cname);
        }
      });
      return countries;
    } catch (e) {
      console.log(e.message);
      throw new Error('get countries by coordinates error');
    }
  },

  getGeoFeatureByCode: async (code: string) => {
    try {
      const docRef = collection(db, firestorePaths.featureCode.path);
      const q = query(
        docRef,
        where('feature_code', '==', code),
      );
      const querySnapshot = await getDocs(q);
      let featureName: string;
      querySnapshot.forEach((document) => {
        const { name } = document.data();
        featureName = name;
      });
      return featureName;
    } catch (e) {
      console.log(e);
      throw new Error('get feature by code error');
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

  getGeonamesPredictions: async (geoname: string) => {
    const geonamesData = await firestoreGeoDataService.getGeonamesCoreData(geoname);
    const predictions: { id:string | number, name: string }[] = [];
    for (const geonamesDataItem of geonamesData) {
      const {
        id,
        name,
        featureClass,
        featureCode,
        countryCode,
      } = geonamesDataItem;
      // eslint-disable-next-line no-await-in-loop
      const country = await firestoreGeoDataService.getCountryByCode(countryCode);
      // eslint-disable-next-line no-await-in-loop
      const featureObject = await firestoreGeoDataService.getGeoFeatureByCode(`${featureClass}.${featureCode}`);

      predictions.push({ id, name: `${name}, ${country}, ${featureObject}` });
    }

    return predictions;
  },

  getGeonamesCoordsById: async (id: string) => {
    try {
      const docRef = doc(db, firestorePaths.geonames.path, id);
      const docSnap = await getDoc(docRef);
      const { latitude, longitude } = docSnap.data();
      return {
        lat: latitude,
        lng: longitude,
      };
    } catch (e) {
      console.log(e);
      throw new Error('get geoname coords by name error');
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

  getRegionById: async (regionId) => {
    try {
      const docRef = doc(db, firestorePaths.regions.path, regionId);
      const docSnap = await getDoc(docRef);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { name, nesw_bounds, id } = docSnap.data();
      let coords;
      if (nesw_bounds) {
        const { northeast: ne, southwest: sw } = JSON.parse(nesw_bounds);
        coords = {
          ne,
          sw,
        };
      }
      return {
        id: docSnap.id,
        regionId: id,
        name,
        coords,
      };
    } catch (e) {
      console.log(e);
      throw new Error('get regions error');
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

  getCountriesWithPhoneCodes: () => {
  },

};
