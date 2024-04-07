import React, { useState } from "react";
import { googleLogin,loginLoading } from "../reducer/Actions";
import { connect } from "react-redux";
import "../App.css";
import { useGoogleLogin } from '@react-oauth/google';

function Login(props) {
  

  const googleAUthLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (response) => {
      props.loginLoading();
      props.googleLogin(response.code)
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const handleLoginClick = () => {
    googleAUthLogin();
  };

  return (
    <>
      {props.loading ? (
        <div className="login">
          <div className="login-btn" type="button" >
            <img src="google.png" className="google-logo" alt="Logo description" width="100" height="100"></img>
            Logining In
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        </div>
      ) : (
        <div className="login">
          <div className="login-message">
            To start summarising videos you must login 🤞 
          </div>
          <div className="login-btn" type="button" onClick={handleLoginClick}>
            <img src="google.png" className="google-logo" alt="Logo description" width="100" height="100"></img>
            Login With Google
          </div>
        </div>
      )}
      
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    loading: state.AuthReducer.loading
  }
}

export default connect(mapStateToProps, { googleLogin,loginLoading })(Login);
