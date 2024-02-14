import { User } from '@firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

import { appFireStore, Timestamp } from '../firebase/config';

import useAuthContext from './useAuthContext';

interface Props {
  user?: User | null;
  albumName: string;
}

export default function useAddAlbum() {
  const { user: contextUser } = useAuthContext();

  const addAlbum = async ({ albumName, user = contextUser }: Props) => {
    if (user === null) {
      return { success: false, error: '사용자가 로그인되지 않았습니다.' };
    }

    const userAlbumDocRef = collection(
      appFireStore,
      user.uid,
      user.uid,
      'album',
    );
    const duplicateAlbumQuery = query(
      userAlbumDocRef,
      where('name', '==', albumName),
    );
    const duplicateAlbumSnapshot = await getDocs(duplicateAlbumQuery);
    if (!duplicateAlbumSnapshot.empty) {
      // 유효성 검사: 이미 동일한 이름의 앨범이 존재하는 경우 처리
      return { success: false, error: '이미 동일한 이름의 앨범이 존재합니다.' };
    }

    try {
      await addDoc(userAlbumDocRef, {
        feedList: [],
        createdTime: Timestamp.now(),
        name: albumName,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '앨범을 추가하는 동안 오류가 발생했습니다.',
      };
    }
  };

  return addAlbum;
}
