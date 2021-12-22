import React from 'react';
import { Button } from 'react-bootstrap';
import { useResetRecoilState } from 'recoil';
import { state } from '../atoms';
import { login } from '../utils';

export const LoginButton = () => {
  const resetState = useResetRecoilState(state);

  const handleClick = () => {
    resetState();
    login();
  };

  return (
    <Button variant="outline-primary" onClick={handleClick}>
      ログイン
    </Button>
  );
};
