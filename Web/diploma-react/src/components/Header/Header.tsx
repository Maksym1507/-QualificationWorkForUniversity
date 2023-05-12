import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { basketStore } from "../../App";

const HeaderComponent: FC = observer(() => {
  return (
    <>
      <Navbar sticky="top" bg="secondary" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand>Pizza Life</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto"
            >
              <Nav.Link
                as={Link}
                to="/product"
                className="text-decoration-none text-white cursor-pointer"
              >
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/basket">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/118/118089.png"
                  alt=""
                  width={20}
                  className="cursor-pointer"
                />
                <span className="ms-1">{basketStore.getTotalCountOfBasketItems()}</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
});

export default HeaderComponent;