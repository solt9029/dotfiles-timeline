import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { fetchCurrentUser } from '../api-clients/github';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms/current-user';
import { githubCurrentUserState } from '../atoms/github';

const AppInit = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [githubCurrentUser, setGithubCurrentUser] = useRecoilState(githubCurrentUserState);

  useEffect(() => {
    (async () => {
      if (currentUser && githubCurrentUser) {
        return;
      }

      try {
        const session = await appwrite.account.getSession('current');
        setCurrentUser({ id: session.$id, providerToken: session.providerToken });

        const {
          data: { avatar_url, followers, following, login, bio, twitter_username },
        } = await fetchCurrentUser(session.providerToken);
        setGithubCurrentUser({
          login,
          bio,
          avatarUrl: avatar_url,
          followerCount: followers,
          followingCount: following,
          twitterUsername: twitter_username,
          commits: [],
          updatedAt: dayjs().toDate(),
        });
      } catch (err) {
        console.log(err);
        setCurrentUser(undefined);
      }
    })();
  }, [currentUser, githubCurrentUser, setCurrentUser, setGithubCurrentUser]);

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
