import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { fetchCurrentUser, fetchFollowingUsers } from '../api-clients/github';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms/current-user';
import { githubCurrentUserState, githubFollowingUsersState } from '../atoms/github';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppInit = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [githubCurrentUser, setGithubCurrentUser] = useRecoilState(githubCurrentUserState);
  const [githubFollowingUsers, setGithubFollowingUsers] = useRecoilState(githubFollowingUsersState);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        return;
      }

      try {
        const session = await appwrite.account.getSession('current');
        setCurrentUser({ id: session.$id, providerToken: session.providerToken });
      } catch {}
    })();
  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser === undefined || githubCurrentUser) {
        return;
      }

      const {
        data: { avatar_url, login, html_url },
      } = await fetchCurrentUser(currentUser.providerToken);

      setGithubCurrentUser({ login, avatarUrl: avatar_url, commits: [], htmlUrl: html_url, updatedAt: undefined });
    })();
  }, [setGithubCurrentUser, currentUser, githubCurrentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser === undefined || githubCurrentUser === undefined || githubFollowingUsers) {
        return;
      }

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
    })();
  }, [currentUser, githubCurrentUser, githubFollowingUsers, setGithubFollowingUsers]);

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
