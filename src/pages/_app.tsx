import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { fetchCurrentUser, fetchFollowingUsers } from '../api-clients/github';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms/current-user';
import { githubCurrentUserState, githubFollowingUsersState } from '../atoms/github';

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
          data: { avatar_url, login },
        } = await fetchCurrentUser(session.providerToken);
        setGithubCurrentUser({
          login,
          avatarUrl: avatar_url,
          commits: [],
          updatedAt: undefined,
        });

        const { data: followingUsers } = await fetchFollowingUsers(login, session.providerToken);
        console.log(followingUsers);
        setGithubFollowingUsers(
          followingUsers.map(({ avatar_url, login }) => ({
            avatarUrl: avatar_url,
            login,
            commits: [],
            updatedAt: undefined,
          }))
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
