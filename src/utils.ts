import { recoilPersist } from 'recoil-persist';

export const isSsr = () => typeof window === 'undefined';

export const persistAtom = (key: string) =>
  recoilPersist({ key: key, storage: isSsr() ? undefined : window.localStorage }).persistAtom;
