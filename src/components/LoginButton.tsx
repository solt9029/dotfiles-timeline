import React from 'react';
import { appwrite } from '../appwrite';

export const LoginButton = () => {
  const handleClick = () => {
    appwrite.account.createOAuth2Session('github', 'http://localhost:3000/timeline', 'http://localhost:3000/');
  };

  return <button onClick={handleClick}>ログイン</button>;
};
