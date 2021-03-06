import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import { authenitcate, isAuth } from "./helpers";
import GLogin from "./GoogleLogin";
const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    msg: "",
    redirect: false
  });
  const change = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  const informParent = res => {
    authenitcate(res, () => {
      isAuth() && isAuth.role === "admin"
        ? history.push("/admin")
        : history.push("/dashboard");
    });
  };
  const submit = e => {
    e.preventDefault();
    setValues({ ...values, msg: "Submitting" });
    axios
      .post(`/signin`, values)
      .then(res => {
        // save userinfo in localstorage and token in cookie for safer
        authenitcate(res, () => {
          setValues({
            ...values,
            password: "",
            email: "",
            msg: "SignIn Success",
            redirect: true
          });
          isAuth() && isAuth.role === "admin"
            ? history.push("/admin")
            : history.push("/dashboard");
        });
      })
      .catch(err => {
        console.log(err.response);
        setValues({
          ...values,
          password: "",
          email: "",
          msg: err.response.data.error
        });
      });
  };
  return (
    <Layout>
      <p className="alert-info">{values.msg}</p>
      <h4>Signin</h4>
      <form className="container center" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={change}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            onChange={change}
            values={values.password}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <Link to="/auth/password/forgot">Forgot Password</Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <GLogin informParent={informParent} />
      </form>
    </Layout>
  );
};

export default withRouter(Signin);
