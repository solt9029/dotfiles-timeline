import type { NextPage } from 'next';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms';

const Index: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);

  const handleClick = async () => {
    await appwrite.account.createOAuth2Session('github', 'http://localhost:3000/path', 'http://localhost:3000/path');
  };

  return <div>{currentUser ? <div>ログイン中</div> : <button onClick={handleClick}>ログイン</button>}</div>;
};

export default Index;
