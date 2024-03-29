import React, { useContext } from "react";
import { useState } from "react";
import "../App.css";
import ExtensionContext from "./ExtensionsState";
import { payment } from "../reducer/Actions";
import { connect } from "react-redux";
import { useContextVariable } from "../reducer/ContextProvide";
import Payment from "./Payment";

function OutOfCredits({ user }) {
    const [subscriptionType, setSubscriptionType] = useState("Annual");

    const routeState = useContext(ExtensionContext);
    const { ContextVariable } = useContextVariable();

    const [noCredits, setNoCredits] = useState(false);

    const handleStartPlan = () => {
        // setNoCredits(false);
        // payment(CONSTANTS.PLANS.MONTHLY_PLAN, user.user)
    };

    



    const handleClose = () => {
        routeState.setRoute("home")
    };



    return (
        <div className="CreditBox">
            <div className="credit-container">
                <div className="creditTitle">
                    <span className="creditTime">You ran out of credits</span>
                    <div onClick={handleClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                        >
                            <path
                                d="M11 1L1 11M1 1L11 11"
                                stroke="black"
                                strokeWidth="1.67"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <div className="creditMon">
                    Wait until next Jan 1, or you can choose to upgrade straight
                    away
                </div>

                <div className="upgradeTitle">
                    <span className="upgradeTime">Why upgrade?</span>
                </div>
                <div className="benefitBox">
                    <div className="benefit">
                        <span className="benefit-icon">😎</span>
                        <span>Unlimited summary</span>
                    </div>
                    <div className="benefit">
                        <span className="benefit-icon">🥳</span>
                        <span>Unlimited transcripts</span>
                    </div>
                    <div className="benefit">
                        <span className="benefit-icon">🕰️</span>
                        <span>No limits on video length</span>
                    </div>
                    <div className="benefit">
                        <span className="benefit-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <g clip-path="url(#clip0_14_168)">
                                    <path
                                        d="M13.999 10.4611C13.999 10.5377 13.9966 10.704 13.992 10.8324C13.9808 11.1466 13.9559 11.5521 13.9182 11.7368C13.8616 12.0144 13.7761 12.2765 13.6647 12.4946C13.5328 12.7526 13.3647 12.9837 13.1649 13.1831C12.9655 13.3822 12.7346 13.5497 12.477 13.681C12.2577 13.7927 11.994 13.8782 11.7148 13.9346C11.5319 13.9715 11.1295 13.996 10.8173 14.0071C10.6888 14.0117 10.5225 14.014 10.4461 14.014L3.55239 14.0129C3.47574 14.0129 3.30951 14.0105 3.18109 14.0059C2.86687 13.9946 2.46142 13.9697 2.27667 13.9321C1.99905 13.8755 1.737 13.79 1.51891 13.6786C1.26089 13.5467 1.0298 13.3786 0.830338 13.1787C0.631275 12.9793 0.463768 12.7485 0.332477 12.4908C0.220723 12.2716 0.135219 12.0079 0.0788496 11.7287C0.0419355 11.5458 0.0175039 11.1434 0.00638867 10.8312C0.00182227 10.7026 -0.000488281 10.5364 -0.000488281 10.46L0.000605469 3.56627C0.000605469 3.48961 0.00294336 3.32338 0.00755078 3.19496C0.0188301 2.88074 0.0437266 2.47528 0.0813926 2.29055C0.138008 2.01293 0.223457 1.75088 0.334896 1.53277C0.466734 1.27477 0.634912 1.04366 0.834727 0.8442C1.03412 0.645152 1.26501 0.47763 1.52263 0.346325C1.74188 0.234599 2.00557 0.149095 2.28477 0.0927259C2.46765 0.0557982 2.87009 0.0313665 3.1823 0.020265C3.31084 0.0156849 3.47713 0.0133743 3.55347 0.0133743L10.4472 0.0144818C10.5239 0.0144818 10.6901 0.0168196 10.8185 0.0214271C11.1327 0.0327064 11.5382 0.0576028 11.7229 0.0952689C12.0005 0.151884 12.2626 0.237333 12.4807 0.348773C12.7387 0.480611 12.9698 0.648788 13.1693 0.848603C13.3683 1.04799 13.5358 1.27887 13.6671 1.5365C13.7789 1.75576 13.8644 2.01943 13.9207 2.29863C13.9577 2.48153 13.9821 2.88395 13.9932 3.19617C13.9978 3.32472 14.0001 3.49099 14.0001 3.56736L13.999 10.4611Z"
                                        fill="url(#paint0_linear_14_168)"
                                    />
                                    <path
                                        d="M10.7093 3.32563C9.7614 2.37698 8.50086 1.85428 7.15781 1.85374C4.3906 1.85374 2.13842 4.10507 2.13731 6.87231C2.13696 7.75686 2.36813 8.62031 2.80746 9.3814L2.09521 11.9822L4.75665 11.2843C5.48996 11.6841 6.31555 11.8948 7.15582 11.8952H7.15788C9.92482 11.8952 12.1772 9.64357 12.1783 6.8763C12.1789 5.53527 11.6571 4.27428 10.7093 3.32563ZM7.15788 11.0475H7.15617C6.40741 11.0472 5.67301 10.8461 5.03233 10.4661L4.87994 10.3757L3.30061 10.7898L3.72217 9.25049L3.62292 9.09266C3.20522 8.42849 2.98461 7.66082 2.98494 6.87264C2.98584 4.57263 4.85778 2.7014 7.1595 2.7014C8.27404 2.70182 9.32176 3.13632 10.1096 3.92479C10.8974 4.71326 11.3311 5.76136 11.3307 6.87599C11.3298 9.17618 9.45783 11.0475 7.15788 11.0475ZM9.44676 7.92329C9.32129 7.86052 8.70457 7.55713 8.58957 7.51528C8.47459 7.47342 8.39098 7.4525 8.30732 7.57806C8.22372 7.7036 7.98331 7.98607 7.91011 8.06976C7.83694 8.15346 7.76377 8.16393 7.63833 8.10115C7.51287 8.03838 7.10868 7.90596 6.62953 7.47872C6.25663 7.14624 6.00485 6.73553 5.93168 6.60997C5.85851 6.48442 5.9239 6.41657 5.9867 6.35403C6.04312 6.29786 6.11213 6.20757 6.17486 6.13434C6.23757 6.06113 6.25849 6.00879 6.3003 5.92511C6.34212 5.84141 6.32121 5.76817 6.28984 5.7054C6.25849 5.64263 6.0076 5.02537 5.90306 4.77429C5.80125 4.52975 5.69781 4.56284 5.62081 4.559C5.54772 4.55536 5.46401 4.5546 5.38039 4.5546C5.29677 4.5546 5.16086 4.58597 5.04588 4.71152C4.9309 4.83707 4.60683 5.14046 4.60683 5.75771C4.60683 6.37495 5.05632 6.97128 5.11905 7.05496C5.18178 7.13866 6.00361 8.40535 7.26199 8.94855C7.5613 9.07774 7.79495 9.15491 7.97714 9.21271C8.27765 9.30813 8.55112 9.29468 8.76728 9.2624C9.00829 9.2264 9.50945 8.95903 9.61401 8.6661C9.71854 8.37315 9.71854 8.12208 9.68718 8.06977C9.65582 8.01746 9.5722 7.98607 9.44676 7.92329Z"
                                        fill="white"
                                    />
                                </g>
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_14_168"
                                        x1="6.9998"
                                        y1="0.0133743"
                                        x2="6.9998"
                                        y2="14.014"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="#61FD7D" />
                                        <stop offset="1" stop-color="#2BB826" />
                                    </linearGradient>
                                    <clipPath id="clip0_14_168">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                        <span>Get summary via whatsapp</span>
                    </div>
                </div>

            </div>


            <div className="subsBox">
                <div className="subsBox_container">
                    <div
                        className={`subsDur ${subscriptionType === "Annual" ? "active" : ""
                            }`}
                        onClick={() => setSubscriptionType("Annual")}
                    >
                        <div className="subsDurInner">
                            <div className="savings">
                                <span className="Annual">Annual</span>
                                <text className="save">Save 35% 🥳</text>
                            </div>
                            <div className="priceTab">
                                <span className="Price">$ 8.99 </span>
                                <span className="month">/month</span>
                            </div>
                            {subscriptionType === "Annual" && (
                                <div className="icon-container">
                                    {" "}
                                    <div className="icon-container">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                        >
                                            <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="6.5"
                                                fill="url(#paint0_linear_14_191)"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_14_191"
                                                    x1="6.5"
                                                    y1="0"
                                                    x2="6.5"
                                                    y2="13"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#885DF1" />
                                                    <stop offset="1" stop-color="#6610F2" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <svg
                                            className="tick-icon"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="8"
                                            height="6"
                                            viewBox="0 0 8 6"
                                            fill="none"
                                        >
                                            <path
                                                d="M6.6 1L2.75 4.85L1 3.1"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`subsDur ${subscriptionType === "Monthly" ? "active" : ""
                            }`}
                        onClick={() => setSubscriptionType("Monthly")}
                    >
                        <div className="subsDurInner2">
                            <div className="savings">
                                <span className="Annual">Monthly</span>
                            </div>
                            <div className="priceTab">
                                <span className="Price">$ 14.99 </span>
                                <span className="month">/month</span>
                            </div>
                            {subscriptionType === "Monthly" && (
                                <div className="icon-container">
                                    {" "}
                                    <div className="icon-container">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                        >
                                            <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="6.5"
                                                fill="url(#paint0_linear_14_191)"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_14_191"
                                                    x1="6.5"
                                                    y1="0"
                                                    x2="6.5"
                                                    y2="13"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#885DF1" />
                                                    <stop offset="1" stop-color="#6610F2" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <svg
                                            className="tick-icon"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="8"
                                            height="6"
                                            viewBox="0 0 8 6"
                                            fill="none"
                                        >
                                            <path
                                                d="M6.6 1L2.75 4.85L1 3.1"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Payment/>
            

        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        user: state.AuthReducer.user
    }
}

export default connect(mapStateToProps, {})(OutOfCredits);
