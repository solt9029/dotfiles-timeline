import type { NextPage } from 'next';
import useSWR from 'swr';
import { githubClient } from '../github-client';

const Home: NextPage = () => {
  const userId = 'solt9029';

  const { data, error } = useSWR(`/users/${userId}/following?per_page=100`, (path) => {
    return githubClient.get(path);
  });

  console.log(data);

  return <div></div>;
};

export default Home;
