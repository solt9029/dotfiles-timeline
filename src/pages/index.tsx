import type { NextPage } from 'next';
import React from 'react';
import { appwrite } from '../appwrite';

const Index: NextPage = () => {
  const handleClick = async () => {
    await appwrite.account.createOAuth2Session('github', 'http://localhost:3000/path', 'http://localhost:3000/path');
  };

  return (
    <div>
      <button onClick={handleClick}>ログイン</button>
    </div>
  );
};

export default Index;
