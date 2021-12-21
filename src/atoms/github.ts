import { atom, DefaultValue, selector } from 'recoil';
import { persistAtom } from '../utils';

type Commit = {
  message: string;
  date: string;
  commentCount: number;
  committer: Pick<User, 'login' | 'avatarUrl'>;
  htmlUrl: string;
};

type User = {
  login: string;
  avatarUrl: string;
  commits: Commit[];
  htmlUrl: string;
  updatedAt: Date | undefined;
};

export type GithubState = {
  currentUser: User | undefined;
  followingUsers: User[] | undefined;
};

export const githubCurrentUserState = atom<User | undefined>({
  key: 'github/githubCurrentUserState',
  default: undefined,
  effects_UNSTABLE: [persistAtom('persist/github/githubCurrentUserState')],
});

// TODO: rename to githubTimelineUsersState since this includes current user
export const githubFollowingUsersState = atom<User[] | undefined>({
  key: 'github/githubFollowingUsersState',
  default: undefined,
  effects_UNSTABLE: [persistAtom('persist/github/githubFollowingUsersState')],
});

export const githubState = selector<GithubState>({
  key: 'github/state',
  get: ({ get }) => {
    return {
      currentUser: get(githubCurrentUserState),
      followingUsers: get(githubFollowingUsersState),
    };
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(githubCurrentUserState, newValue);
      set(githubFollowingUsersState, newValue);
      return;
    }
    set(githubCurrentUserState, newValue.currentUser);
    set(githubFollowingUsersState, newValue.followingUsers);
  },
});
