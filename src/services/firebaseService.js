import Moment from 'moment/moment';
import { eventsConstants } from '../consatants';
import { auth, fireDB } from '../utils/fire';

// Sign Up
function createUserWithEmailAndPassword(email, password) {
  auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser;
    });
}
// Sign In
function signInWithEmailAndPassword(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}
// Sign out
function signOut() {
  auth.signOut();
}
// Password Reset
function resetPassword(email) {
  auth.sendPasswordResetEmail(email);
}
// Password Change
function updatePassword(password) {
  auth.currentUser.updatePassword(password);
}
// getEvents data from firebase database
function getEvents(nNumber) {
  // get a list of events from Firebase
  const ref = fireDB.database().ref(`/events/${nNumber}`);
  return ref.once('value').then(snapshot => Object.values(snapshot.val()));
}
// save an event to firebase datatbase
function saveEvent(slot, title, desc, nNumber) {
  // save an event to firebase

  fireDB.database().ref(`/events/${nNumber}`).push({
    start: Moment(slot.start).format(),
    end: Moment(slot.end).format(),
    allDay: false,
    title,
    desc,
  });
}

export const firebaseService = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  resetPassword,
  updatePassword,
  saveEvent,
  getEvents,
};
