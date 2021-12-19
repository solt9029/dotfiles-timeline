import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState } from '../atoms/current-user';
import { githubFollowingUsersState } from '../atoms/github';

const Timeline: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [githubFollowingUsers, setGithubFollowingUsers] = useRecoilState(githubFollowingUsersState);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // sample
      // for (let i = 0; i < 10; i++) {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      //   console.log('aiueo');
      //   setCurrentUser({ id: i.toString(), providerToken: i.toString() });
      // }
      // step1: fetch followingUsers
      // step2: fetch commits using for statement
    })();
  }, [router, currentUser]);

  return <div>timeline</div>;
};

export default Timeline;
