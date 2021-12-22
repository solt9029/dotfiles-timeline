import { recoilPersist } from 'recoil-persist';
import { appwrite } from './appwrite';

export const isSsr = () => typeof window === 'undefined';

export const persistAtom = (key: string) =>
  recoilPersist({ key: key, storage: isSsr() ? undefined : window.localStorage }).persistAtom;

export const login = () => {
  appwrite.account.createOAuth2Session(
    'github',
    process.env.NEXT_PUBLIC_SUCCESS_REDIRECT_URL!,
    process.env.NEXT_PUBLIC_FAILURE_REDIRECT_URL!
  );
};
