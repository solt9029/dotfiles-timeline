import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms';

function MyApp({ Component, pageProps }: AppProps) {
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    (async () => {
      try {
        const res = await appwrite.account.get();
        setCurrentUser({ id: res.$id, name: res.name });
      } catch (err) {
        setCurrentUser(null);
      }
    })();
  }, [setCurrentUser]);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
