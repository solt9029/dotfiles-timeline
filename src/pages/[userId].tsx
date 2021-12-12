import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

const Timeline: NextPage = () => {
  const { query, isReady } = useRouter();
  const { userId } = query;

  if (!isReady) {
    return <div>loading</div>;
  }

  return <div>{userId}</div>;
};

export default Timeline;
