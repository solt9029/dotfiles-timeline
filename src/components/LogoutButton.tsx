import React from 'react';
import { useResetRecoilState } from 'recoil';
import { appwrite } from '../appwrite';
import { state } from '../atoms';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/dist/client/router';

export const LogoutButton = () => {
  const resetState = useResetRecoilState(state);
  const router = useRouter();

  const handleClick = async () => {
    await appwrite.account.deleteSession('current');
    resetState();
    router.push('/');
  };

  return (
    <Button variant="outline-warning" onClick={handleClick}>
      ログアウト
    </Button>
  );
};
