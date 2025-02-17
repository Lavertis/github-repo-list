import { Nav, Navbar } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FC } from 'react';

const AppNavbar: FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="py-1 px-2">
      <Navbar.Brand>
        <FaGithub size={30} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;