import React, { useContext } from "react";
import "../App.css";
import Summary from "./Summary"
import Transscript from "./Transscript"
import OutOfCredits from "./OutOfCredits"
import LoginNew from "./LoginNew"
import { connect } from "react-redux";
import ExtensionContext from "./ExtensionsState";
import { GoogleOAuthProvider } from '@react-oauth/google';
import CONSTANTS from "./Constants";
import ENV from "../reducer/Env";
function Home(props) {
  const routeState = useContext(ExtensionContext);
  return (
    <>

      {props.isAuthenticated ? (
        <>
          {routeState.route === CONSTANTS.ROUTES.SUMMARY ? (
            <Summary />
          ) : (<></>)
          }
          {routeState.route === CONSTANTS.ROUTES.TRANSCRIPT ? (
            <Transscript />
          ) : (<></>)
          }
          {routeState.route === CONSTANTS.ROUTES.MY_PLANS ? (
            <OutOfCredits />
          ) : (<></>)
          }
        </>
      ) : (
        <>
          <GoogleOAuthProvider clientId={ENV.googleClientId}>
            <LoginNew />
          </GoogleOAuthProvider>
        </>
      )
      }

    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated
  }
}


export default connect(mapStateToProps, null)(Home);
