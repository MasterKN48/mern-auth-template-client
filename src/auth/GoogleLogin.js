import React from "react";
import axios from "axios";
import { authenicate, isAuth } from "./helpers";
import GoogleLogin from "react-google-login";

const GLogin = ({ informParent = f => f }) => {
  const responseGoogle = res => {
    axios
      .post("/google-login", { idToken: res.tokenId })
      .then(res => {
        console.log(res);
        //inform parent component
        informParent(res);
      })
      .catch(err => console.error(err));
  };
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GCLIENT_ID}`}
        buttonText="Login"
        onFailure={responseGoogle}
        onSuccess={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GLogin;
