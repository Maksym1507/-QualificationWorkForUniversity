import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { basketStore, catalogStore, userStore } from "../../App";
import ModalWindowComponent from "../ModalWindow/ModalWindowComponent";
import basketImg from "../../images/shopping-cart.png";
import userProfileImg from "../../images/user-profile.png";

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
                onClick={() => {
                  catalogStore.changeCurrentPage(1)
                  catalogStore.changeFilter("dafault")
                  catalogStore.prefetchData();
                }}
              >
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/basket">
                <img
                  src={basketImg}
                  alt="basket"
                  width={22}
                  className="cursor-pointer"
                />
                <span className="ms-1">{basketStore.getTotalCountOfBasketItems()}</span>
              </Nav.Link>
            </Nav>
            {userStore.isAutificated && (
              <Nav
              >
                <NavDropdown className="my-nav-dropdown" align="end" title={<img
                  src={userProfileImg}
                  alt=""
                  width={32}
                  className="cursor-pointer"
                />}>
                  <Nav.Link className="text-decoration-none text-black" as={Link} to="/cabinet">
                    Cabinet
                    <img src="" alt="" />
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
      </Navbar >
      <Outlet />
    </>
  );
});

export default HeaderComponent;