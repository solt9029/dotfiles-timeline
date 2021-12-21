import React from 'react';
import { useResetRecoilState } from 'recoil';
import { appwrite } from '../appwrite';
import { state } from '../atoms';

export const LogoutButton = () => {
  const resetState = useResetRecoilState(state);

  const handleClick = async () => {
    await appwrite.account.deleteSession('current');
    resetState();
  };

  return <button onClick={handleClick}>ログアウト</button>;
};
