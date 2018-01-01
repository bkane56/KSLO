import * as firebase from 'firebase';
import { firebaseConstants } from '../consatants';

const config = {
  apiKey: firebaseConstants.API_KEY,
  authDomain: firebaseConstants.AUTH_DOMAIN,
  databaseURL: firebaseConstants.DATABASE_URL,
  projectId: firebaseConstants.PROJECT_ID,
  storageBucket: firebaseConstants.STORAGE_BUCKET,
  messagingSenderId: firebaseConstants.MESSAGE_SENDER_ID,
};

let fire = null;
if (!firebase.apps.length) {
  fire = firebase.initializeApp(config);
}
const fireDB = fire;
const auth = firebase.auth();
export { auth, fireDB };
