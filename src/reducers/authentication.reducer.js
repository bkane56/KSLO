import { userConstants } from '../consatants';

const initialState = {
  status: '',
  error: null,
  displayName: '',
  uid: '',
  photoURL: '',
  email: '',
};
export default function authentication(state = initialState, action) {
  switch (action.type) {
    // case `${cs.actions.AUTH_SIGNOUT}_PENDING`:
    //   return { ...initialState, status: 'pending'};
    //
    // case `${cs.actions.AUTH_SIGNOUT}_REJECTED`:
    //   return { ...initialState, status: 'unknown', error: action.payload };
    //
    // case `${cs.actions.AUTH_SIGNOUT}_FULFILLED`:
    //   return { ...initialState };
    //
    // case `${cs.actions.AUTH_SIGNIN}_PENDING`:
    //   return { ...initialState, status: '' };
    //
    // case `${cs.actions.AUTH_SIGNIN}_REJECTED`:
    //   return { ...initialState, status: '', error: action.payload };
    //
    // case `${cs.actions.AUTH_SIGNIN}_FULFILLED`: {
    //   // its possible that firebase will have fired its auth_user action first
    //   // so only set to waiting if its not logged in
    //   if (state.status === '') {
    //     return { ...state, credential: action.payload.credential };
    //   }
    //
    //   return {
    //     ...initialState,
    //     credential: action.payload.credential,
    //     status: '',
    //   };
    // }
    default: {
      return state;
    }
  }
}
