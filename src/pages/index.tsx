import type { NextPage } from 'next';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AppNavbar } from '../components/AppNavbar';
import { Jumbotron } from '../components/Jumbotron';
import { Footer } from '../components/Footer';
import Image from 'next/image';

const Index: NextPage = () => {
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

          <div className="mb-5">
            『dotfiles-timeline』はGitHub上でフォローしているユーザのdotfilesのコミットを時系列順に見ることのできるサービスです。
          </div>

          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <Image src="/screenshot.png" alt="スクリーンショット" width={100} height={143} layout="responsive" />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
};

export default Index;
