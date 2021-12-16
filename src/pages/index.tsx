import type { NextPage } from 'next';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../atoms';
import { LoginButton } from '../components/LoginButton';
import { LogoutButton } from '../components/LogoutButton';

const Index: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);

  return <div>{currentUser ? <LogoutButton /> : <LoginButton />}</div>;
};

export default Index;
