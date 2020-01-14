import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Redirect } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    msg: "",
    redirect: false
  });
  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    } // eslint-disable-next-line
  }, []);
  const { name, token } = values;

  const submit = e => {
    e.preventDefault();
    setValues({ ...values });
    axios
      .post("/account-activation", { token })
      .then(res => {
        console.log(res);
        setValues({
          ...values,
          msg: res.data.msg,
          redirect: true
        });
      })
      .catch(err => {
        setValues({ ...values, msg: err.response.data.error });
      });
    if (values.redirect) {
      return <Redirect to="/signin" />;
    }
  };
  const activationLink = () => (
    <div className="text-center">
      <h2 className="p-5 text-center">Hey {name}, ready to Activate Account</h2>
      <p>{values.msg}</p>
      <button className="btn btn-outline-primary" onClick={submit}>
        Activate
      </button>
    </div>
  );
  return <Layout>{activationLink()}</Layout>;
};

export default Activate;
