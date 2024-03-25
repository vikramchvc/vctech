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



const Navbar = ({ logout, isAuthenticated, user }) => {
    const routeState = useContext(ExtensionContext);
    const { ContextVariable } = useContextVariable();
    const { summaryContent } = ContextVariable;


    const [showSummarizeOptions, setShowSummarizeOptions] = useState(false);
    const [showTransBox, setShowTransBox] = useState(false);
    const [showHamBox, setShowHamBox] = useState(false);

    const [isSummarizeActive, setIsSummarizeActive] = useState(true);
    const [checkbox1Checked, setCheckbox1Checked] = useState(false);
    const [checkbox2Checked, setCheckbox2Checked] = useState(false);
    const [selectedLength, setSelectedLength] = useState("Small");


    const handleCopy = () => {
        if (routeState.route === CONSTANTS.ROUTES.SUMMARY) {
            copyToClipboard(summaryContent["summary"])
        }

        if (routeState.route === CONSTANTS.ROUTES.TRANSCRIPT) {
            copyTextFromElement("contentToCopy")
        }
    };


    const handleShowOptionsClick = () => {
        setIsSummarizeActive(true);
        setShowSummarizeOptions(!showSummarizeOptions);
        routeState.setRoute(CONSTANTS.ROUTES.SUMMARY)
    };







    const rectangleRef = useRef(null);
    const handleShowHamClick = () => {
        setShowHamBox(true);
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (rectangleRef.current && !rectangleRef.current.contains(event.target)) {
                setShowHamBox(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleMyPlansClick = () => {
        setShowHamBox(false);
        routeState.setRoute(CONSTANTS.ROUTES.MY_PLANS);
    };
    const handleLogoutClick = () => {
        setShowHamBox(false);
        logout();
    };



    const handleSummarizeClick = () => {
        getVideoId();

        setIsSummarizeActive(true);
        routeState.setRoute(CONSTANTS.ROUTES.SUMMARY)
    };
    const handleTranscriptClick = () => {
        getVideoId();
        setIsSummarizeActive(false);
        setShowSummarizeOptions(false);
        setShowTransBox(!showTransBox);
        routeState.setRoute(CONSTANTS.ROUTES.TRANSCRIPT)
    };






    const handleCheckbox1Change = (e) => {
        setCheckbox1Checked(e.target.checked);
    };
    const handleCheckbox2Change = (e) => {
        setCheckbox2Checked(e.target.checked);
    };

    const handleUpgradeClick = () => {
        routeState.setRoute(CONSTANTS.ROUTES.MY_PLANS)
    };




    return (
        <>
            <div className="boxFirst" style={{ width: "404px", height: "35px", flexShrink: "0" }}>
                <div className="planBox">
                    {(user !== null) ?
                        (<>

                            {(user[CONSTANTS.PLAN] === CONSTANTS.PLANS.FREEPLAN) ? (
                                <>
                                    <p className="creditText">{user["credit"]}</p>
                                    <p className="creditText" style={{ marginLeft: '3px' }}>minutes free credits left.</p>
                                    <p className="upgradeButton" style={{ marginLeft: '3px' }} onClick={handleUpgradeClick}>Upgrade Now</p>
                                </>
                            ) : (<></>)}



                            {
                                (user[CONSTANTS.PLAN] === CONSTANTS.PLANS.MONTHLY_PLAN ||
                                    user[CONSTANTS.PLAN] === CONSTANTS.PLANS.YEARLY_PLAN) ? (

                                    <p className="creditText">You've unlimited minutes</p>

                                ) : (<></>)}
                        </>
                        ) : (<></>)
                    }
                </div>
            </div>
            <div className="navbar">
                <div className="toggleBox">
                    <div className="toggle-container">
                        <div style={{ width: "140px" }}>
                            <button className={`toggle-btn ${isSummarizeActive ? "active" : ""}`} id="summarize-btn" onClick={handleSummarizeClick}>
                                🤯 Summarise
                                <span className="arrowIcon" onClick={handleShowOptionsClick}> {showSummarizeOptions ? <IconUp /> : <IconDown />} </span>
                            </button>
                        </div>
                        <button
                            className={`toggle-btn ${!isSummarizeActive ? "active" : ""}`}
                            id="transcript-btn"
                            onClick={handleTranscriptClick}
                        >
                            ✍🏼 Transcript
                        </button>
                    </div>
                    {showSummarizeOptions && isAuthenticated && (
                        <div className="summarizeOption">
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
                                        className={`length-btn ${selectedLength === "Small" ? "active" : ""
                                            }`}
                                        id="small-btn"
                                        onClick={() => setSelectedLength("Small")}
                                    >
                                        Small
                                    </button>
                                    <button
                                        className={`length-btn ${selectedLength === "Medium" ? "active" : ""
                                            }`}
                                        id="med-btn"
                                        onClick={() => setSelectedLength("Medium")}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        className={`length-btn ${selectedLength === "Large" ? "active" : ""
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
                <div className="actionIcon">
                    <div onClick={handleCopy}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                            <path d="M8.17143 4.64287H1.11429C0.495238 4.64287 0 5.13811 0 5.75715V12.8298C0 13.4333 0.495238 13.9441 1.11429 13.9441H8.1869C8.79048 13.9441 9.30119 13.4488 9.30119 12.8298V5.75715C9.28571 5.13811 8.79048 4.64287 8.17143 4.64287ZM8.35714 12.8143C8.35714 12.9072 8.27976 12.9845 8.1869 12.9845H1.11429C1.02143 12.9845 0.944048 12.9072 0.944048 12.8143V5.75715C0.944048 5.6643 1.02143 5.58692 1.11429 5.58692H8.1869C8.27976 5.58692 8.35714 5.6643 8.35714 5.75715V12.8143Z" fill="#A6A6A6" />
                            <path d="M11.8858 0H4.82864C4.20959 0 3.71436 0.495238 3.71436 1.11429V3.71429H4.64293V1.11429C4.64293 1.02143 4.72031 0.944048 4.81316 0.944048H11.8858C11.9786 0.944048 12.056 1.02143 12.056 1.11429V8.1869C12.056 8.27976 11.9786 8.35714 11.8858 8.35714H10.2144V9.28571H11.8858C12.4894 9.28571 13.0001 8.79048 13.0001 8.17143V1.11429C13.0001 0.495238 12.5048 0 11.8858 0Z" fill="#A6A6A6" />
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.44256 8.28948C1.95522 8.77735 1.68145 9.43914 1.68145 10.1292C1.68145 10.8192 1.95522 11.481 2.44256 11.9689C2.92989 12.4568 3.59086 12.731 4.28004 12.731C4.6213 12.731 4.95921 12.6636 5.27448 12.5329C5.58979 12.4022 5.87622 12.2105 6.11751 11.9689L7.57676 10.5079C7.90506 10.1792 8.43732 10.1792 8.76571 10.5079C9.09401 10.8367 9.09401 11.3696 8.76571 11.6984L7.30646 13.1593C6.90905 13.5572 6.43724 13.8729 5.91792 14.0882C5.39867 14.3036 4.84211 14.4145 4.28004 14.4145C3.14491 14.4145 2.05626 13.9629 1.2536 13.1593C0.450931 12.3556 0 11.2657 0 10.1292C0 8.99267 0.450931 7.90269 1.2536 7.09899L2.71277 5.63806C3.0411 5.30935 3.57341 5.30934 3.90174 5.63806C4.23006 5.96676 4.23006 6.49975 3.90174 6.82846L2.44256 8.28948Z" fill="#A6A6A6" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.9546 6.12501C12.442 5.63705 12.7157 4.97529 12.7157 4.28526C12.7157 3.59523 12.442 2.93346 11.9546 2.44554C11.4673 1.95761 10.8063 1.6835 10.1171 1.6835C9.77585 1.6835 9.43796 1.75079 9.12269 1.88154C8.80742 2.01229 8.52098 2.20394 8.27961 2.44553L6.82045 3.90649C6.49215 4.23521 5.9598 4.23521 5.6315 3.90649C5.30317 3.57777 5.30317 3.0448 5.6315 2.71608L7.09066 1.25512C7.48816 0.857202 7.95997 0.541547 8.4792 0.326194C8.99852 0.110841 9.55508 0 10.1171 0C11.2522 0 12.3409 0.45148 13.1436 1.25512C13.9463 2.05876 14.3971 3.14874 14.3971 4.28526C14.3971 5.42178 13.9463 6.51179 13.1436 7.31541L11.6844 8.77635C11.3561 9.10505 10.8237 9.10505 10.4954 8.77635C10.1671 8.44765 10.1671 7.91465 10.4954 7.58595L11.9546 6.12501Z" fill="#A6A6A6" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.65884 9.75023C4.33052 9.42153 4.33052 8.88853 4.65884 8.55983L8.54997 4.66393C8.87827 4.33521 9.41062 4.33521 9.73892 4.66393C10.0673 4.99265 10.0673 5.52558 9.73892 5.85437L5.8478 9.75023C5.5195 10.0789 4.98716 10.0789 4.65884 9.75023Z" fill="#A6A6A6" />
                        </svg>
                    </div>

                    <div onClick={handleShowHamClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="12" viewBox="0 0 17 12" fill="none">
                            <line y1="1.25" x2="17" y2="1.25" stroke="#A6A6A6" strokeWidth="1.5" />
                            <line y1="6.25" x2="17" y2="6.25" stroke="#A6A6A6" strokeWidth="1.5" />
                            <line y1="11.25" x2="17" y2="11.25" stroke="#A6A6A6" strokeWidth="1.5" />
                        </svg>
                    </div>
                    {(showHamBox) ? (
                        <div className="hamPannel" ref={rectangleRef}>
                            <div className="logoutRect" onClick={handleMyPlansClick}>
                                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.0625 3.8125H9.3125M4.0625 5.5625H6.6875M1 6.44333C1 7.37667 1.65508 8.18984 2.57908 8.32575C3.23767 8.42259 3.90325 8.49667 4.57583 8.54683C4.78 8.562 4.96667 8.66934 5.08042 8.83909L6.6875 11.25L8.29458 8.83909C8.35096 8.75524 8.4257 8.68534 8.51313 8.63471C8.60057 8.58407 8.69839 8.55402 8.79917 8.54683C9.46717 8.49696 10.1332 8.42322 10.7959 8.32575C11.7199 8.18984 12.375 7.37725 12.375 6.44275V2.93225C12.375 1.99775 11.7199 1.18517 10.7959 1.04925C9.43556 0.849584 8.06243 0.749568 6.6875 0.750001C5.29217 0.750001 3.92017 0.852085 2.57908 1.04925C1.65508 1.18517 1 1.99833 1 2.93225V6.44275V6.44333Z" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="text-wrapper-4" style={{ marginLeft: '3px' }}>My plans</div>
                            </div>
                            <div className="logoutRect" onClick={handleLogoutClick}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.36364 4.33333V2.25C7.36364 1.91848 7.21997 1.60054 6.96424 1.36612C6.70851 1.1317 6.36166 1 6 1H2.36364C2.00198 1 1.65513 1.1317 1.3994 1.36612C1.14367 1.60054 1 1.91848 1 2.25V9.75C1 10.0815 1.14367 10.3995 1.3994 10.6339C1.65513 10.8683 2.00198 11 2.36364 11H6C6.36166 11 6.70851 10.8683 6.96424 10.6339C7.21997 10.3995 7.36364 10.0815 7.36364 9.75V7.66667M5.09091 4.33333L3.27273 6M3.27273 6L5.09091 7.66667M3.27273 6H11" stroke="black" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="text-wrapper-4" style={{ marginLeft: '3px' }}>Log out</div>
                            </div>

                        </div>
                    ) : (<></>)}

                </div>
            </div>


        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        user: state.AuthReducer.user
    }
}


export default connect(mapStateToProps, { logout })(Navbar)