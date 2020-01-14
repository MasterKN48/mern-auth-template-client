import React, { Fragment } from "react";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <p>This is nav</p>
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default Layout;
