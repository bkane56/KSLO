import firebase from 'firebase';
import { firebaseConstants } from '../consatants';

const config = {
  apiKey: firebaseConstants.API_KEY,
  authDomain: firebaseConstants.AUTH_DOMAIN,
  databaseURL: firebaseConstants.DATABASE_URL,
  projectId: firebaseConstants.PROJECT_ID,
  storageBucket: firebaseConstants.STORAGE_BUCKET,
  messagingSenderId: firebaseConstants.MESSAGE_SENDER_ID,
};
const fire = firebase.initializeApp(config);
export default fire;
