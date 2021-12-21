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
      if (currentUser && githubCurrentUser && githubFollowingUsers) {
        return;
      }

      try {
        const session = await appwrite.account.getSession('current');
        setCurrentUser({ id: session.$id, providerToken: session.providerToken });

        const {
          data: { avatar_url, login, html_url },
        } = await fetchCurrentUser(session.providerToken);
        const githubCurrentUser = {
          login,
          avatarUrl: avatar_url,
          commits: [],
          htmlUrl: html_url,
          updatedAt: undefined,
        };
        setGithubCurrentUser(githubCurrentUser);

        const { data: followingUsers } = await fetchFollowingUsers(login, session.providerToken);
        setGithubFollowingUsers(
          followingUsers
            .map(({ avatar_url, login, html_url }) => ({
              avatarUrl: avatar_url,
              login,
              commits: [],
              htmlUrl: html_url,
              updatedAt: undefined,
            }))
            .concat([githubCurrentUser])
        );
      } catch (err) {
        console.log(err);
        setCurrentUser(undefined);
      }
    })();
  }, []); // eslint-disable-line

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
