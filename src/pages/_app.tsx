import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms/current-user';

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    (async () => {
      try {
        const session = await appwrite.account.getSession('current');
        setCurrentUser({ id: session.$id, providerToken: session.providerToken });
      } catch (err) {
        console.log(err);
        setCurrentUser(undefined);
      }
    })();
  }, [setCurrentUser]);

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
