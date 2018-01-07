import Moment from 'moment/moment';
import { eventsConstants } from '../consatants';
import { auth, fireDB } from '../utils/fire';

// Sign Up
function createUserWithEmailAndPassword(email, password) {
  auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(authUser => authUser);
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
  const ref = fireDB.database().ref(`/events/${nNumber}`);
  return ref.once('value').then(snapshot => Object.values(snapshot.val()));
}
// save an event to firebase datatbase
function saveEvent(slot, title, desc, nNumber) {
  fireDB.database().ref(`/events/${nNumber}`).push({
    start: Moment(slot.start).format(),
    end: Moment(slot.end).format(),
    allDay: false,
    title,
    desc,
  });
}
// save user data to firebase
function saveUser(user, userId) {
  console.log('saved user in fireservice ', user);
  return fireDB.database().ref(`/users/${userId}`).push({
    user,
  }).then(() => user);
}
// get current user from database
function getUser(userId) {
  const ref = fireDB.database().ref(`/users/${userId}`);
  return ref.once('value').then(snapshot => Object.values(snapshot.val())[0]);
}

export const firebaseService = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  resetPassword,
  updatePassword,
  saveEvent,
  getEvents,
  saveUser,
  getUser,
};
