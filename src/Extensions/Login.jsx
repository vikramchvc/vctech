import React, { useState } from "react";
import { googleLogin } from "../reducer/Actions";
import { connect } from "react-redux";
import "../App.css";
import { useGoogleLogin } from '@react-oauth/google';

function Login({ googleLogin }) {
  const [loading, setLoading] = useState(false);

  const googleAUthLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (response) => {
      try {
        setLoading(true);
        googleLogin(response.code)
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    },
    onError: (error) => {
      setLoading(false);
      console.log(error)
    }
  });

  const handleLoginClick = () => {
    googleAUthLogin();
  };

  return (
    <>
      {/* {loading ? (
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
          <div className="login-btn" type="button" onClick={handleLoginClick}>
            <img src="google.png" className="google-logo" alt="Logo description" width="100" height="100"></img>
            Login With Google
          </div>
        </div>
      )} */}


<div className="login">
          <div className="login-btn" type="button" onClick={handleLoginClick}>
            <img src="google.png" className="google-logo" alt="Logo description" width="100" height="100"></img>
            Login With Google
          </div>
        </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated
  }
}

export default connect(mapStateToProps, { googleLogin })(Login);
