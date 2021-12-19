import dayjs from 'dayjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState } from '../atoms/current-user';
import { githubFollowingUsersState } from '../atoms/github';

const Timeline: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [githubFollowingUsers, setGithubFollowingUsers] = useRecoilState(githubFollowingUsersState);
  const [requestState, setRequestState] = useState<{ isLoading: boolean; error: any }>({
    isLoading: false,
    error: undefined,
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (requestState.isLoading || requestState.error) {
        return;
      }

      setRequestState({ isLoading: true, error: undefined });

      let newGithubFollowingUsers = githubFollowingUsers;

      try {
        githubFollowingUsers
          ?.filter(({ updatedAt }) => updatedAt == undefined || dayjs().isAfter(dayjs(updatedAt).add(1, 'd')))
          .forEach((user) => {
            console.log(user.login);
            // fetch commits and update updatedAt
            // setGithubFollowingUsers
          });
      } catch (err) {
        console.log(err);
        setRequestState({ isLoading: false, error: err });
      }
    })();
  }, [githubFollowingUsers, requestState]);

  return <div>timeline</div>;
};

export default Timeline;
