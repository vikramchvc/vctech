import React, { useRef } from "react";
import Navbar from "../Extensions/Navbar";
import { connect } from "react-redux";
import { useEffect } from "react";
import { verify, getUser, googleLogin, setNewVideo } from "../reducer/Actions";
import ExtensionContext from "../Extensions/ExtensionsState";
import { useState } from "react";
import { sendHeightToParent, getVideoId } from "../Extensions/Utils"
import Home from "../Extensions/Home";
import CONSTANTS from "../Extensions/Constants";
import { useLocation } from "react-router-dom";
import { getStorage } from "../Extensions/Utils";



const Layout = (props) => {
  const containerRef = useRef(null);
  const [route, setRoute] = useState(CONSTANTS.ROUTES.SUMMARY);
   

  let location = useLocation();
  useEffect(() => {
    if(localStorage.getItem(CONSTANTS.TOKEN)==null){
      getStorage(CONSTANTS.TOKEN);
    }else{
    props.verify();
    props.getUser();
    }
  }, [location]);

  if (props.youtubeid === "null" || props.youtubeLink === "null") {

    getVideoId();
  }







  // Used for communication with the extension
  const resolveContext = (type, data) => {
    switch (type) {
      case CONSTANTS.VIDEO_ID:
        props.setNewVideo(data.videoId,data.link)
      break;
      case CONSTANTS.GET_STORAGE:
        localStorage.setItem(CONSTANTS.TOKEN, data.value);
        props.verify();
        props.getUser();
      break;
      default:
        return "null";
    }
  };
  useEffect(() => {
    const handleMessage = (event) => {
      const receivedMessage = event.data;
      resolveContext(receivedMessage.type, receivedMessage)
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);






  // Used for height adjustment in extension
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === containerRef.current) {
          const { height } = entry.contentRect;
          sendHeightToParent(height);
        }
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);



  return (
    <ExtensionContext.Provider value={{ route, setRoute }}>
      <div id="rootContainer" className="container" ref={containerRef}>
        <div>
          <Navbar />
          <div className="main-view-container">
            <Home />
          </div>
        </div>
      </div>
    </ExtensionContext.Provider>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.AuthReducer.message,
    access: state.AuthReducer.access,
    refresh: state.AuthReducer.refresh,
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    content: state.AuthReducer.content,

    summaryContent:state.ClientReducer.summaryContent,
    credits:state.ClientReducer.credits,
    isNewVideo:state.ClientReducer.isNewVideo,
    youtubeid:state.ClientReducer.youtubeid,
    youtubeLink:state.ClientReducer.youtubeLink,
    
  }
}

export default connect(mapStateToProps, { verify, getUser, googleLogin, setNewVideo })(Layout);