import {
  collection, getDocs, query, orderBy, startAt, limit,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';

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
      throw new Error('get countries areas error');
    }
  },

  getGeonames: () => {},

  getGeonamesCoordinates: () => {},

};
