import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { githubClient } from '../github-client';

const Index: NextPage = () => {
  // const { data, error } = useSWR(`/users/${userId}/following?per_page=100`, (path) => {
  //   return githubClient.get(path);
  // });
  const router = useRouter();

  const [userId, setUserId] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(evt.target.value);
  };

  const handleClick = () => {
    router.push(userId);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>更新</button>
    </div>
  );
};

export default Index;
