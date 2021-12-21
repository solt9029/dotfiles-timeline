import { Container, Form, FormControl, Nav, Navbar, Button } from 'react-bootstrap';
import { LoginButton } from './LoginButton';

export const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/">dotfiles-timeline</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/timeline">タイムライン</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <LoginButton />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
