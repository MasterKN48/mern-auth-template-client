import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./layout/Dashboard";
import AdminDashboard from "./layout/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/auth/activate/:token" component={Activate} />
        <AdminRoute path="/admin" exact component={AdminDashboard} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
};
export default Routes;
