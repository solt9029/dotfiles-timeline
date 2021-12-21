import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../atoms/current-user';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

export const AppNavbar = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/">dotfiles-timeline</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/timeline">タイムライン</Nav.Link>
          </Nav>
          <Form className="d-flex">{currentUser ? <LogoutButton /> : <LoginButton />}</Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
