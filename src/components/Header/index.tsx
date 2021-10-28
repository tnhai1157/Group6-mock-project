import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function Header({ userToken }: { userToken: boolean }) {
  const token = userToken;
  const user = useSelector((state: any) => state.user?.data);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return token ? (
    <Navbar>
      {""}
      <nav className="navbar navbar-light">
        <div className="flex-box">
          <NavLink className="navbar-brand" to="/" onClick={closeMobileMenu}>
            conduit
          </NavLink>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <div>
            <ul
              className={
                !click
                  ? "nav navbar-nav pull-xs-right nav-menu"
                  : "nav navbar-nav pull-xs-right nav-menu active"
              }
            >
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  exact={true}
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/editor"
                  onClick={closeMobileMenu}
                >
                  <i className="ion-compose"></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/settings"
                  onClick={closeMobileMenu}
                >
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/profile/${user.username}`}
                  onClick={closeMobileMenu}
                >
                  <i className="ion-gear-a"></i>&nbsp;
                  {user?.username}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Navbar>
  ) : (
    <div>
      {" "}
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            conduit
          </NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact={true}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
