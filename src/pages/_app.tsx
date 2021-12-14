import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms';

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    (async () => {
      try {
        const res = await appwrite.account.get();
        console.log(res);
        setCurrentUser({ id: res.$id, name: res.name });
      } catch (err) {
        console.log(err);
        setCurrentUser(null);
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
