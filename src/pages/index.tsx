import type { NextPage } from 'next';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../atoms/current-user';
import { LoginButton } from '../components/LoginButton';
import { LogoutButton } from '../components/LogoutButton';
import Link from 'next/link';
import { AppNavbar } from '../components/AppNavbar';
import { Jumbotron } from '../components/Jumbotron';

const Index: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <>
      <AppNavbar />
      <div style={{ marginBottom: 100 }}>
        <Jumbotron />
      </div>
      <div className="text-center" style={{ marginBottom: 100 }}>
        <Container>
          <div className="mb-3">
            <h2>dotfiles専用のタイムライン</h2>
            <h2>『dotfiles-timeline』</h2>
          </div>

          <div>
            『dotfiles-timeline』はGitHub上でフォローしているユーザのdotfilesのコミットを時系列順に見ることのできるサービスです。
          </div>
        </Container>
      </div>
      <Container
        fluid
        className="text-center mt-5"
        style={{
          padding: 10,
          background: `linear-gradient(
            45deg,
            rgba(20, 160, 140, 0.9),
            rgba(70, 150, 180, 0.8)
          )`,
          color: '#fff',
        }}
      >
        <small>Copyright © Kenshi Shiode. All Rights Reserved.</small>
      </Container>
    </>
  );
};

export default Index;
