import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../routes";
import styled from "styled-components";
import { getItemLocalStorage, setItemLocalStorage } from "../utils/localStorage.utils";

const ListNav = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-image: linear-gradient(to top right, #f9a743, #f9db5f);
  width: 100%;
  li {
    text-transform: uppercase;
    font-weight: bold;
    float: left;
    border-right: 1px solid #bbb;
  }
`;

const NavLinkStyled = styled(NavLink)`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  transition: 0.3s;
  &.active,
  &:hover {
    background-color: limegreen;
  }
`;

const Navbar = () => {
  const valueToken = getItemLocalStorage("token", "");
  const [token, setToken] = useState();
  const location = useLocation();

  useEffect(() => {
    setToken(getItemLocalStorage("token", ""));
  }, [location]);

  return (
    <ListNav>
      {routes.map((route) => {
        return token && route.path === "/" ? (
          ""
        ) : (
          <li key={route.path}>
            <NavLinkStyled
              activeClassName="active"
              to={route.path}
              exact={route.exact}
              style={{ backgroundColor: !token && route.private ? "darkgray" : "" }}
              onClick={(e) => {
                !token && route.private && e.preventDefault();
              }}
            >
              {route.name}
            </NavLinkStyled>
          </li>
        );
      })}
      {valueToken && (
        <li style={{ float: "right" }}>
          <NavLinkStyled to="/" exact onClick={() => setItemLocalStorage("token", null)}>
            Logout
          </NavLinkStyled>
        </li>
      )}
    </ListNav>
  );
};

Navbar.defaultProps = {
  routes: [],
};

export default Navbar;
