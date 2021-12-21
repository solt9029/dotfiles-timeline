import { recoilPersist } from 'recoil-persist';
import { appwrite } from './appwrite';

export const isSsr = () => typeof window === 'undefined';

export const persistAtom = (key: string) =>
  recoilPersist({ key: key, storage: isSsr() ? undefined : window.localStorage }).persistAtom;

export const login = () => {
  appwrite.account.createOAuth2Session('github', 'http://localhost:3000/timeline', 'http://localhost:3000/');
};
