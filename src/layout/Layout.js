import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Layout = ({ children }) => {
  const nav = () => (
    <>
      <ul
        className="nav navbar-dark bg-dark mb-3"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item">
          <NavLink
            to="/"
            className="nav-link"
            activeClassName="nav-link active"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/login"
            className="nav-link"
            activeClassName="nav-link active"
          >
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/signup"
            className="nav-link"
            activeClassName="nav-link active"
          >
            Signup
          </NavLink>
        </li>
      </ul>
    </>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default Layout;
