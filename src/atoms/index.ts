import { atom } from 'recoil';

type CurrentUser = {
  id: string;
  providerToken: string;
};

export const currentUserState = atom<CurrentUser | undefined>({ key: 'currentUserState', default: undefined });
