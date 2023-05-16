import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { basketStore, userStore } from "../../App";
import ModalWindowComponent from "../ModalWindow/ModalWindowComponent";

const HeaderComponent: FC = observer(() => {
  return (
    <>
      <Navbar sticky="top" bg="secondary" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand>Mi Pizza</Navbar.Brand>
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
            {userStore.isAutificated && (
              <Nav
              >
                <NavDropdown className="my-nav-dropdown" align="end" title={<img
                  src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  alt=""
                  width={25}
                  className="cursor-pointer no-caret-toggle"
                />}>
                  <Nav.Link className="text-decoration-none text-black" as={Link} to="/cabinet">
                    Cabinet
                  </Nav.Link>
                  <NavDropdown.Divider />
                  <Nav.Link className="text-decoration-none text-black" as={Link} to="orders">
                    Orders
                  </Nav.Link>
                  <NavDropdown.Divider />
                  <Nav.Link
                    className="text-decoration-none text-black"
                    onClick={() => {
                      userStore.userLogout();
                    }}
                  >
                    Logout
                  </Nav.Link>
                </NavDropdown>
              </Nav>
            )}
            {!userStore.isAutificated && <ModalWindowComponent />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
});

export default HeaderComponent;