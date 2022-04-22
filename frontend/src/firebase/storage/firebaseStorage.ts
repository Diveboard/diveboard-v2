import { getStorage } from 'firebase/storage';
import { app } from '../firebaseApp';

export const storage = getStorage(app);
