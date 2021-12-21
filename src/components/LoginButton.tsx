import React from 'react';
import { appwrite } from '../appwrite';
import { Button } from 'react-bootstrap';

export const LoginButton = () => {
  const handleClick = () => {
    appwrite.account.createOAuth2Session('github', 'http://localhost:3000/timeline', 'http://localhost:3000/');
  };

  return (
    <Button variant="outline-primary" onClick={handleClick}>
      ログイン
    </Button>
  );
};
