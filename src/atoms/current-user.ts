import { atom } from 'recoil';

export type CurrentUserState =
  | {
      id: string;
      providerToken: string;
    }
  | undefined;

export const currentUserState = atom<CurrentUserState>({ key: 'current-user/state', default: undefined });
