import dayjs from 'dayjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchCommits, fetchFollowingUsers } from '../api-clients/github';
import { currentUserState } from '../atoms/current-user';
import { githubFollowingUsersState } from '../atoms/github';
import clone from 'just-clone';

const Timeline: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [githubFollowingUsers, setGithubFollowingUsers] = useRecoilState(githubFollowingUsersState);

  const updateCommits = useCallback(async () => {
    if (githubFollowingUsers === undefined || currentUser === undefined) {
      return;
    }

    let newGithubFollowingUsers = clone(githubFollowingUsers);

    const index = newGithubFollowingUsers.findIndex(
      ({ updatedAt }) => updatedAt == undefined || dayjs().isAfter(dayjs(updatedAt).add(100, 'second'))
    );
    if (index === -1) {
      return;
    }

    try {
      const res = await fetchCommits(newGithubFollowingUsers[index].login, currentUser.providerToken);

      newGithubFollowingUsers[index].commits = (res?.data || []).map(({ commit, committer, html_url }) => {
        return {
          message: commit.message,
          date: commit.committer.date,
          commentCount: commit.comment_count,
          committer: {
            login: committer?.login,
            avatarUrl: committer?.avatar_url,
          },
          htmlUrl: html_url,
        };
      });
      newGithubFollowingUsers[index].updatedAt = dayjs().toDate();

      setGithubFollowingUsers(newGithubFollowingUsers);
    } catch (err) {
      console.log(err);
    }
  }, [currentUser, githubFollowingUsers, setGithubFollowingUsers]);

  useEffect(() => {
    updateCommits();
  }, [updateCommits]);

  return <div>timeline</div>;
};

export default Timeline;
