import { useEffect, useState } from 'react';
import { getDoc, DocumentData, DocumentReference } from 'firebase/firestore';

import useGetSharedAlbums from './useGetSharedAlbums';

export default function useGetSharedAlbumsData() {
  const [sharedAlbumsData, setSharedAlbumsData] = useState<DocumentData[]>([]);
  const { getSharedAlbums } = useGetSharedAlbums();

  const getSharedAlbumsData = async () => {
    const sharedAlbums = await getSharedAlbums();

    const promises = sharedAlbums?.map(async (ref: DocumentReference) => {
      const albumDocSnap = await getDoc(ref);
      const albumData = albumDocSnap.data();

      if (albumData) {
        albumData.uid = ref.path.split('/')[0];
        setSharedAlbumsData((prev) => [...prev, albumData]);
      }
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    getSharedAlbumsData();
  }, []);

  return { sharedAlbumsData };
}
