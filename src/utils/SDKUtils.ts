import { signOut } from 'firebase/auth';
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';

import { storage, appAuth } from '../firebase/config.ts';

async function logout() {
  try {
    await signOut(appAuth);
  } catch (error) {
    alert('로그아웃에 실패했습니다');
  }
}

async function deleteImg(url: string) {
  const imgRef = ref(storage, url);

  await deleteObject(imgRef);
}

async function uploadImg(path: string, file: File) {
  const storageRef = ref(storage, path);
  const uploadTask = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
}

export { deleteImg, uploadImg, logout };
