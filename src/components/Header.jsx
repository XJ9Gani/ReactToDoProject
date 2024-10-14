import { useCallback } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hook";
export default function Header() {
  const activeLinkHandler = useCallback(
    ({ isActive }) =>
      isActive
        ? `text-success   nav-link fs-2 m-3 fw-normal`
        : `text-light  nav-link fs-2 m-3`,
    []
  );

  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          background: "#1a1a1a",
          zIndex: 2,
        }}
      >
        <Container className="d-flex justify-content-around align-items-center">
          <Navbar>
            <NavLink to="/" className={activeLinkHandler}>
              Current Tasks
            </NavLink>
            <NavLink to="/done" className={activeLinkHandler}>
              Done Tasks
            </NavLink>
          </Navbar>
          <Button
            variant={theme === "light" ? "dark" : "light"}
            onClick={toggleTheme}
          >
            {theme}
          </Button>
        </Container>
        <hr />
      </header>
    </>
  );
}
