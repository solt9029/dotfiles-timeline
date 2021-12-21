import type { NextPage } from 'next';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../atoms/current-user';
import { LoginButton } from '../components/LoginButton';
import { LogoutButton } from '../components/LogoutButton';
import Link from 'next/link';

const Index: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="/">dotfiles-timeline</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href="/timeline">タイムライン</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          marginBottom: 100,
          textAlign: 'center',
          background: `linear-gradient(
            45deg,
            rgba(20, 160, 140, 0.9),
            rgba(70, 150, 180, 0.8)
          ),
          url('/jumbotron.jpeg') center no-repeat`,
          backgroundSize: 'cover',
          color: 'white',
        }}
      >
        <Container>
          <h1 style={{ paddingTop: 100, paddingBottom: 50, fontSize: '5rem' }}>dotfiles-timeline</h1>
          <div style={{ paddingBottom: 50 }}>
            <div className="mb-3">勉強会で昔に知り合ったエンジニアの人、最近は何やってるんだろう？</div>
            <div>そうだ、共通の話題作りに、dotfilesのコミット履歴を見てみよう。</div>
          </div>
          <div style={{ paddingBottom: 50 }}>
            <Button size="lg">タイムラインを確認する</Button>
          </div>
        </Container>
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
