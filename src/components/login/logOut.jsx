import React from 'react';

import { firebaseService } from '../../services';
import { auth } from '../../utils/fire';

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={firebaseService.signOut()}
    >
      Sign Out
    </button>
  );
}
