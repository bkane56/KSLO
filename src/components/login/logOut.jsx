import React from 'react';

import { firebaseService } from '../../services';
import { history } from '../../helpers';
import { routesConstants } from '../../consatants';

function handleSignOut() {
  firebaseService.signOut();
  history.push(routesConstants.LANDING);
}

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}