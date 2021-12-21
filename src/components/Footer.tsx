import { Container } from 'react-bootstrap';

export const Footer = () => {
  return (
    <Container
      fluid
      className="text-center"
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
  );
};
