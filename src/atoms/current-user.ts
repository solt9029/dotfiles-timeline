import { atom } from 'recoil';
import { persistAtom } from '../utils';

export type CurrentUserState =
  | {
      id: string;
      providerToken: string;
    }
  | undefined;

export const currentUserState = atom<CurrentUserState>({
  key: 'current-user/state',
  default: undefined,
  effects_UNSTABLE: [persistAtom('persist/current-user/state')],
});
