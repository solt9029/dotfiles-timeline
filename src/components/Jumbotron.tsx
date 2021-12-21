import { Container, Button } from 'react-bootstrap';

export const Jumbotron = () => {
  return (
    <div
      style={{
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
  );
};
