import { DefaultValue, selector } from 'recoil';
import { CurrentUserState, currentUserState } from './current-user';
import { githubState, GithubState } from './github';

type State = {
  currentUser: CurrentUserState;
  github: GithubState;
};

export const state = selector<State>({
  key: 'index/state',
  get: ({ get }) => {
    return {
      currentUser: get(currentUserState),
      github: get(githubState),
    };
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(currentUserState, newValue);
      set(githubState, newValue);
      return;
    }
    set(currentUserState, newValue.currentUser);
    set(githubState, newValue.github);
  },
});
