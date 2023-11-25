import { useState } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { appAuth } from '../firebase/config';

export default function useReauthenticate() {
  const [error, setError] = useState<null | string>(null);
  const user = appAuth.currentUser;

  const reauthenticate = async (userProvidedPassword: string) => {
    if (user === null || user?.email === null) {
      return false;
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      userProvidedPassword,
    );

    try {
      await reauthenticateWithCredential(user, credential);

      return true;
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      }

      return false;
    }
  };

  return { reauthenticate, error };
}
