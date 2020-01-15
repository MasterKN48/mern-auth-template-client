import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Layout = ({ children, history }) => {
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
        {isAuth() && (
          <li className="nav-item">
            <span className="nav-link active">{isAuth().name}</span>
          </li>
        )}
        {isAuth() ? (
          <li className="nav-item">
            <span
              className="nav-link active"
              style={{ cursor: "pointer" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <NavLink
                to="/signin"
                className="nav-link"
                activeClassName="nav-link active"
              >
                Signin
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
          </>
        )}
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

export default withRouter(Layout);
