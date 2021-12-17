import { atom, selector } from 'recoil';

type Commit = {
  message: string;
  date: string;
};

type User = {
  login: string;
  avatarUrl: string;
  twitterUsername: string;
  commits: Commit[] | undefined;
};

export const currentUserState = atom<User | undefined>({ key: 'github/currentUserState', default: undefined });
export const followingUsersState = atom<User[] | undefined>({ key: 'github/followingUsersState', default: undefined });

export const state = selector({
  key: 'github/state',
  get: ({ get }) => {
    return {
      currentUser: get(currentUserState),
      followingUsers: get(followingUsersState),
    };
  },
});
