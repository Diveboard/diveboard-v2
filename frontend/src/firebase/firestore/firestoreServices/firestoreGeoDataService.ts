import {
  collection, getDocs, query, orderBy, startAt, limit,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { Coords } from '../../../types';

export const firestoreGeoDataService = {

  getCountries: async (countryName: string) => {
    const lowCaseCountryName = countryName.trim()
      .toLowerCase();
    try {
      const docRef = collection(db, 'countries');
      const q = query(
        docRef,
        orderBy('blob'),
        startAt(lowCaseCountryName),
        limit(5),
      );
      const querySnapshot = await getDocs(q);

      const countries = [];
      querySnapshot.forEach((doc) => {
        const {
          cname,
        } = doc.data();
        const name = cname.trim().toLowerCase();

        if (name.startsWith(lowCaseCountryName)) {
          countries.push(cname);
        }
      });

      return countries;
    } catch (e) {
      console.log(e.message);
      throw new Error('get countries suggestion error');
    }
  },

  getCountryByCoordinates: async (coordinates: Coords) => {
    try {
      const docRef = collection(db, 'countries');
      const q = query(
        docRef,
      );
      const querySnapshot = await getDocs(q);

      const countries = [];

      querySnapshot.forEach((doc) => {
        const {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          nesw_bounds,
          cname,
        } = doc.data();
        const bounds: { northeast: Coords, southwest: Coords } = JSON.parse(nesw_bounds);
        // console.log(bounds);

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

  getGeonames: () => {
  },

  getGeonamesCoordinates: () => {
  },

};
