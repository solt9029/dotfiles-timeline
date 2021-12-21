import type { NextPage } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../atoms/current-user';
import { AppNavbar } from '../components/AppNavbar';
import { Jumbotron } from '../components/Jumbotron';
import { Footer } from '../components/Footer';

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
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
};

export default Index;
