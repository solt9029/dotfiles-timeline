import React from 'react';
import { Button } from 'react-bootstrap';
import { login } from '../utils';

export const LoginButton = () => {
  const handleClick = () => {
    login();
  };

  return (
    <Button variant="outline-primary" onClick={handleClick}>
      ログイン
    </Button>
  );
};
