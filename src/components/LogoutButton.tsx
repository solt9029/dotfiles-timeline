import React from 'react';
import { useResetRecoilState } from 'recoil';
import { appwrite } from '../appwrite';
import { state } from '../atoms';
import { Button } from 'react-bootstrap';

export const LogoutButton = () => {
  const resetState = useResetRecoilState(state);

  const handleClick = async () => {
    await appwrite.account.deleteSession('current');
    resetState();
  };

  return (
    <Button variant="outline-warning" onClick={handleClick}>
      ログアウト
    </Button>
  );
};
