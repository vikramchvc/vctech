import React, { useState } from "react";
import Markdown from "https://esm.sh/react-markdown@9";
import "../App.css";
import { refresh, summarise, summariseLoading } from "../reducer/Actions";
import { connect } from "react-redux";

function Summary(props) {
  const handleSummarise = async () => {
    props.summariseLoading();
    props.summarise(props.youtubeid, props.youtubeLink);
  };

  return (
    <>
      {props.summaryContent["summary"] !== undefined && !props.isNewVideo ? (
        <div className="summary-container">
          <Markdown>{props.summaryContent["summary"]}</Markdown>
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
            <div className="summarizeBtn" onClick={handleSummarise}>
              <img src="summarisestick.svg" alt="summarisestick-icon"></img>
              <p className="summarizeText">Summarize this video</p>
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
  summarise,
  summariseLoading,
})(Summary);
