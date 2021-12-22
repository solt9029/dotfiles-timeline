import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import { useCallback, useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { fetchCommits, fetchCurrentUser, fetchFollowingUsers } from '../api-clients/github';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms/current-user';
import { githubCurrentUserState, githubFollowingUsersState } from '../atoms/github';
import 'bootstrap/dist/css/bootstrap.min.css';
import clone from 'just-clone';

const AppInit = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [githubCurrentUser, setGithubCurrentUser] = useRecoilState(githubCurrentUserState);
  const [githubFollowingUsers, setGithubFollowingUsers] = useRecoilState(githubFollowingUsersState);

  useEffect(() => {
    (async () => {
      if (currentUser === undefined || githubFollowingUsers === undefined) {
        return;
      }

      let newGithubFollowingUsers = clone(githubFollowingUsers);
      const index = newGithubFollowingUsers.findIndex(
        ({ updatedAt }) => updatedAt == undefined || dayjs().isAfter(dayjs(updatedAt).add(1, 'd'))
      );
      if (index === -1) {
        return;
      }

      try {
        const res = await fetchCommits(newGithubFollowingUsers[index].login, currentUser.providerToken);

        newGithubFollowingUsers[index].commits = (res?.data || []).map(({ commit, committer, html_url }) => {
          return {
            message: commit.message,
            date: commit.committer.date,
            commentCount: commit.comment_count,
            committer: {
              login: committer?.login,
              avatarUrl: committer?.avatar_url,
            },
            htmlUrl: html_url,
          };
        });
        newGithubFollowingUsers[index].updatedAt = dayjs().toDate();

        setGithubFollowingUsers((currentValue) => currentValue && newGithubFollowingUsers);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentUser, githubFollowingUsers, setGithubFollowingUsers]);

  useEffect(() => {
    (async () => {
      if (currentUser === undefined) {
        try {
          const session = await appwrite.account.getSession('current');
          setCurrentUser({ id: session.$id, providerToken: session.providerToken });
        } catch (err) {
          console.log(err);
        }
        return;
      }

      if (githubCurrentUser === undefined) {
        const {
          data: { avatar_url, login, html_url },
        } = await fetchCurrentUser(currentUser.providerToken);
        setGithubCurrentUser({ login, avatarUrl: avatar_url, commits: [], htmlUrl: html_url, updatedAt: undefined });
        return;
      }

      if (githubFollowingUsers === undefined) {
        const { data: followingUsers } = await fetchFollowingUsers(githubCurrentUser.login, currentUser.providerToken);
        const users = [githubCurrentUser].concat(
          followingUsers.map(({ avatar_url, login, html_url }) => ({
            avatarUrl: avatar_url,
            login,
            commits: [],
            htmlUrl: html_url,
            updatedAt: undefined,
          }))
        );
        setGithubFollowingUsers(users);
      }
    })();
  }, [
    currentUser,
    githubCurrentUser,
    githubFollowingUsers,
    setCurrentUser,
    setGithubCurrentUser,
    setGithubFollowingUsers,
  ]);

  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <AppInit />
    </RecoilRoot>
  );
}

export default MyApp;
