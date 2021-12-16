import React from 'react';
import { useSetRecoilState } from 'recoil';
import { appwrite } from '../appwrite';
import { currentUserState } from '../atoms';

export const LogoutButton = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);

  const handleClick = async () => {
    await appwrite.account.deleteSession('current');
    setCurrentUser(null);
  };

  return <button onClick={handleClick}>ログアウト</button>;
};
