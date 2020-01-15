import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import jwt from "jsonwebtoken";
const ResetPassword = ({ match }) => {
  const [values, setValues] = useState({
    password: "",
    name: "",
    token: "",
    msg: ""
  });
  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    console.log(jwt.decode(token));
    if (token) {
      setValues({ ...values, name, token });
    } // eslint-disable-next-line
  }, []);
  const change = e => {
    setValues({
      ...values,
      password: e.target.value
    });
  };
  const submit = e => {
    e.preventDefault();
    setValues({ ...values, msg: "Submitting" });
    let data = {
      password: values.password,
      resetPasswordLink: values.token
    };
    axios
      .put(`/reset-password`, data)
      .then(res => {
        console.log(res);
        // save userinfo in localstorage and token in cookie for safer
        setValues({
          ...values,
          password: "",
          msg: "Success,Password reset,Now Login with new Password!"
        });
      })
      .catch(err => {
        console.log(err.response);
        setValues({
          ...values,
          password: "",
          msg: err.response.data.error
        });
      });
  };
  return (
    <Layout>
      <p className="alert-info">{values.msg}</p>
      <h4>Hey {values.name}, ResetPassword</h4>
      <form className="container center" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">New Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={change}
            className="form-control"
            id="exampleInputEmail1"
            required
            aria-describedby="emailHelp"
            placeholder="Enter new Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default ResetPassword;
