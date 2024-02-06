import { doc, updateDoc } from 'firebase/firestore';

import useEditContext from './useEditContext';
import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';

export default function useEditFeed() {
  const { user } = useAuthContext();
  const { feedIdToEdit } = useEditContext();

  const editFeed = async (updateData: {}, id?: string) => {
    if (user === null) {
      return;
    }

    let feedDocRef;

    if (feedIdToEdit) {
      feedDocRef = doc(appFireStore, user.uid, user.uid, 'feed', feedIdToEdit);
    } else if (id) {
      feedDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);
    } else {
      console.error('id 아규먼트가 누락되었습니다.');
      return;
    }

    await updateDoc(feedDocRef, updateData);
  };

  return editFeed;
}
