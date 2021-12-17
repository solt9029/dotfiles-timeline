import { atom } from 'recoil';

type CurrentUser = {
  id: string;
  providerToken: string;
};

export const currentUserState = atom<CurrentUser | null>({ key: 'currentUserState', default: null });
