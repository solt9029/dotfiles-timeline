import React from 'react';
import { useSetRecoilState } from 'recoil';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms';

export const LoginButton = () => {
  const handleClick = () => {
    appwrite.account.createOAuth2Session('github', 'http://localhost:3000/timeline', 'http://localhost:3000/');
  };

  return <button onClick={handleClick}>ログイン</button>;
};
