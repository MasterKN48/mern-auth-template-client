import React, { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
const ForgotPassword = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
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
      .put(`/forgot-password`, values)
      .then(res => {
        console.log(res);
        // save userinfo in localstorage and token in cookie for safer
        setValues({
          ...values,
          email: "",
          msg: "Success,Link Send to mail to reset password"
        });
      })
      .catch(err => {
        console.log(err.response);
        setValues({
          ...values,
          email: "",
          msg: err.response.data.error
        });
      });
  };
  return (
    <Layout>
      <p className="alert-info">{values.msg}</p>
      <h4>ForgotPassword</h4>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default ForgotPassword;
