import React from "react";
import "../App.css";
import { refresh, summarise, summariseLoading } from "../reducer/Actions";
import { connect } from "react-redux";

function Transscript(props) {
  const handleTranslate = async () => {
    props.summariseLoading();
    props.summarise(props.youtubeid, props.youtubeLink);
  };

  return (
    <>
      {props.summaryContent["title"] !== undefined && !props.isNewVideo ? (
        <div id="contentToCopy">
          <div className="transcript">
            <div className="title">{props.summaryContent["title"]}</div>
            {props.summaryContent["transcript"].map((item, index) => (
              <div className="transcript-container">
                <div className="time-stamp">
                  <div>{item["start"]}</div>
                </div>
                <div className="transcript-text">{item["text"]}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {props.loading ? (
            <div className="loadingSpinner">
              <p className="summarizeText">Processing</p>
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          ) : (
            <div className="summarizeBtn" onClick={handleTranslate}>
              <img src="summarisestick.svg" alt="summarisestick-icon"></img>
              <p className="summarizeText">Get Transcript</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    summaryContent: state.ClientReducer.summaryContent,
    isNewVideo: state.ClientReducer.isNewVideo,
    loading: state.ClientReducer.loading,
    youtubeid: state.ClientReducer.youtubeid,
    youtubeLink: state.ClientReducer.youtubeLink,
  };
};
export default connect(mapStateToProps, {
  refresh,
  summariseLoading,
  summarise,
})(Transscript);
