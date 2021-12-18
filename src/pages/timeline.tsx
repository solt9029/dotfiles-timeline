import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../atoms';

const Timeline: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (currentUser === undefined) {
        router.push('http://localhost:3000');
      }
    })();
  }, [router, currentUser]);

  return <div>timeline</div>;
};

export default Timeline;
