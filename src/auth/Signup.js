import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    msg: ""
  });
  const change = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  const submit = e => {
    e.preventDefault();
    setValues({ ...values, msg: "Submitting" });
    axios
      .post(`${process.env.REACT_APP_API}/api/signup`, values)
      .then(res => {
        console.log(res);
        setValues({ ...values, name: "", password: "", email: "", msg: res });
      })
      .catch(err => {
        setValues({
          ...values,
          name: "",
          password: "",
          email: "",
          msg: err.response.data
        });
      });
  };
  return (
    <Layout>
      <p className="alert-info"></p>
      <h1>Signup</h1>
      <form className="container center" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Full Name</label>
          <input
            type="text"
            name="name"
            onChange={change}
            className="form-control"
            required
            value={values.name}
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter full name"
          />
        </div>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Signup;
