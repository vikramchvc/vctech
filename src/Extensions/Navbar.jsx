import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import "../App.css";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";
import ExtensionContext from "./ExtensionsState";
import { copyToClipboard, copyTextFromElement } from "../reducer/Actions";
import { useContextVariable } from "../reducer/ContextProvide";
import { IconDown, IconUp, getVideoId } from "./Utils";
import CONSTANTS from "./Constants";

const Navbar = (props) => {
  const routeState = useContext(ExtensionContext);
  const { ContextVariable } = useContextVariable();
  const { summaryContent, youtubeid, youtubeLink } = ContextVariable;

  const [showSummarizeOptions, setShowSummarizeOptions] = useState(false);
  const [showTransBox, setShowTransBox] = useState(false);
  const [showHamBox, setShowHamBox] = useState(false);
  const [copy, setCopy] = useState(false);

  const [isSummarizeActive, setIsSummarizeActive] = useState(true);
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [selectedLength, setSelectedLength] = useState("Small");

  const handleCopy = () => {
    if (routeState.route === CONSTANTS.ROUTES.SUMMARY) {
      copyToClipboard(summaryContent["summary"]);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }

    if (routeState.route === CONSTANTS.ROUTES.TRANSCRIPT) {
      copyTextFromElement("contentToCopy");
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  };

  const handleShowOptionsClick = () => {
    setIsSummarizeActive(true);
    setShowSummarizeOptions(!showSummarizeOptions);
    routeState.setRoute(CONSTANTS.ROUTES.SUMMARY);
  };

  const rectangleRef = useRef(null);
  const rectangleRefHam = useRef(null);
  const summaryDropDownRef = useRef(null);

  const handleShowHamClick = () => {
    if (showHamBox) {
      setShowHamBox(false);
    } else {
      setShowHamBox(true);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        rectangleRef.current &&
        !rectangleRef.current.contains(event.target) &&
        rectangleRefHam.current &&
        !rectangleRefHam.current.contains(event.target)
      ) {
        setShowHamBox(false);
      }

      if (
        summaryDropDownRef.current &&
        !summaryDropDownRef.current.contains(event.target)
      ) {
        setShowSummarizeOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMyPlansClick = () => {
    setShowHamBox(false);
    routeState.setRoute(CONSTANTS.ROUTES.MY_PLANS);
  };
  const handleLogoutClick = () => {
    setShowHamBox(false);
    props.logout();
  };

  const handleSummarizeClick = () => {
    if (youtubeid === "null" || youtubeLink === "null") {
      getVideoId();
    }
    setIsSummarizeActive(true);
    routeState.setRoute(CONSTANTS.ROUTES.SUMMARY);
  };
  const handleTranscriptClick = () => {
    if (youtubeid === "null" || youtubeLink === "null") {
      getVideoId();
    }
    setIsSummarizeActive(false);
    setShowSummarizeOptions(false);
    setShowTransBox(!showTransBox);
    routeState.setRoute(CONSTANTS.ROUTES.TRANSCRIPT);
  };

  const handleCheckbox1Change = (e) => {
    setCheckbox1Checked(e.target.checked);
  };
  const handleCheckbox2Change = (e) => {
    setCheckbox2Checked(e.target.checked);
  };

  const handleUpgradeClick = () => {
    routeState.setRoute(CONSTANTS.ROUTES.MY_PLANS);
  };

  return (
    <>
      <div
        className="boxFirst"
        style={{ width: "404px", height: "35px", flexShrink: "0" }}
      >
        <div className="planBox">
          {props.user !== null ? (
            <>
              {props.user[CONSTANTS.PLAN] === CONSTANTS.PLANS.FREEPLAN ? (
                <>
                  <p className="creditText">{props.credits}</p>
                  <p className="creditText" style={{ marginLeft: "3px" }}>
                    minutes free credits left.
                  </p>
                  <p
                    className="upgradeButton"
                    style={{ marginLeft: "3px" }}
                    onClick={handleUpgradeClick}
                  >
                    Upgrade Now
                  </p>
                </>
              ) : (
                <></>
              )}

              {props.user[CONSTANTS.PLAN] === CONSTANTS.PLANS.MONTHLY_PLAN ||
              props.user[CONSTANTS.PLAN] === CONSTANTS.PLANS.YEARLY_PLAN ? (
                <>
                  <div className="logo-login">
                    <img src="logo2.svg" alt="Quicksense" />
                  </div>
                  <p className="creditText">You've unlimited minutes</p>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          {props.user === null ? (
            <div className="logo-login">
              <img src="logo2.svg" alt="Quicksense" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="navbar">
        <div className="toggleBox">
          <div className="toggle-container">
            <button
              className={`nav-summarize-btn ${isSummarizeActive ? "active" : ""}`}
              id="summarize-btn"
              onClick={handleSummarizeClick}
            >
              🤯 Summarise
              <span className="arrowIcon" onClick={handleShowOptionsClick}>
                {showSummarizeOptions ? (
                  <IconUp />
                ) : (
                  <IconDown check={isSummarizeActive} />
                )}
              </span>
            </button>

            <button
              className={`nav-transcript-btn ${!isSummarizeActive ? "active" : ""}`}
              id="transcript-btn"
              onClick={handleTranscriptClick}
            >
              ✍🏼 Transcript
            </button>
          </div>
          {showSummarizeOptions && props.isAuthenticated && (
            <div className="summarizeOption" ref={summaryDropDownRef}>
              <div className="checkbox-container">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="checkbox1"
                    name="checkbox1"
                    checked={checkbox1Checked}
                    onChange={handleCheckbox1Change}
                  />
                  <label htmlFor="checkbox1">Insightful Summary</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="checkbox2"
                    name="checkbox2"
                    checked={checkbox2Checked}
                    onChange={handleCheckbox2Change}
                  />
                  <label htmlFor="checkbox2">Time stamped Summary</label>
                </div>
              </div>

              <div className="length-container">
                <div className="toggle-length-container">
                  <button
                    className={`length-btn ${
                      selectedLength === "Small" ? "active" : ""
                    }`}
                    id="small-btn"
                    onClick={() => setSelectedLength("Small")}
                  >
                    Small
                  </button>
                  <button
                    className={`length-btn ${
                      selectedLength === "Medium" ? "active" : ""
                    }`}
                    id="med-btn"
                    onClick={() => setSelectedLength("Medium")}
                  >
                    Medium
                  </button>
                  <button
                    className={`length-btn ${
                      selectedLength === "Large" ? "active" : ""
                    }`}
                    id="large-btn"
                    onClick={() => setSelectedLength("Large")}
                  >
                    Large
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {routeState !== CONSTANTS.ROUTES.LOGIN && props.user !== null ? (
          <>
            <div className="actionIcon">
              {!copy ? (
                <div onClick={handleCopy}>
                  <img src="copyicon.svg" alt="copy-icon"></img>
                </div>
              ) : (
                <div>
                  <div className="copy-confirm">
                    <img src="tick-green.svg" alt="tick-icon"></img>
                  </div>
                </div>
              )}
              <div onClick={handleShowHamClick} ref={rectangleRefHam}>
                {showHamBox ? (
                  <img
                    src="hamburgeropenicon.svg"
                    alt="hamburgeropen-icon"
                  ></img>
                ) : (
                  <img src="hamburger.svg" alt="hamburger-icon"></img>
                )}
              </div>
            </div>
            {showHamBox ? (
              <div className="hamPannel" ref={rectangleRef}>
                <div className="logoutRect" onClick={handleMyPlansClick}>
                  <img src="myplanicon.svg" alt="myplan-icon"></img>
                  <div className="text-wrapper-4" style={{ marginLeft: "3px" }}>
                    My plans
                  </div>
                </div>
                <div className="logoutRect" onClick={handleLogoutClick}>
                  <img src="logouticon.svg" alt="logout-icon"></img>
                  <div className="text-wrapper-4" style={{ marginLeft: "3px" }}>
                    Log out
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    credits: state.ClientReducer.credits,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
