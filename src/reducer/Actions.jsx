import TYPE from "./Type";
import CONSTANTS from "../Extensions/Constants";
import axios from "axios";
import API from "./Api";
import ENV from "./Env";
axios.defaults.withCredentials = true;

export const SERVER_URL = ENV.backendUrl;

// Authentication APIs
export const verify = () => async (dispatch) => {
  if (localStorage.getItem(CONSTANTS.TOKEN)) {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({
      token: localStorage.getItem(CONSTANTS.TOKEN),
    });
    try {
      await axios.post(SERVER_URL + API.VERIFY, body, config);
      dispatch({
        type: TYPE.VERIFY_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: TYPE.VERIFY_FAIL,
      });
      await dispatch(refresh());
    }
  } else {
    dispatch({
      type: TYPE.GUEST_VIEW,
    });
  }
};
export const logout = () => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    await axios.post(SERVER_URL + API.LOGOUT, config);
    dispatch({
      type: TYPE.LOGOUT,
    });
  } catch (err) {
    dispatch({
      type: TYPE.LOGOUT,
    });
  }
};
export const googleLogin = (code) => async (dispatch) => {
  if (!localStorage.getItem(CONSTANTS.TOKEN)) {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ code });
    try {
      const res = await axios.post(SERVER_URL + API.GOOGLE_LOGIN, body, config);
      dispatch({
        type: TYPE.LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(getUser());
    } catch (err) {
      dispatch({
        type: TYPE.LOGIN_FAIL,
      });
    }
  } else {
    dispatch(verify());
    dispatch(getUser());
  }
};
export const refresh = () => async (dispatch) => {
  if (localStorage.getItem(CONSTANTS.TOKEN)) {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(SERVER_URL + API.REFERSH, config);
      dispatch({
        type: TYPE.REFRESH_SUCCESS,
        payload: res.data,
      });
      dispatch(getUser());
    } catch (err) {
      console.log(err);
      dispatch({
        type: TYPE.REFRESH_FAIL,
      });
    }
  } else {
    dispatch({
      type: TYPE.GUEST_VIEW,
    });
  }
};

// User functionality APIS
export const getUser = () => async (dispatch) => {
  if (localStorage.getItem(CONSTANTS.TOKEN)) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(CONSTANTS.TOKEN)}`,
      },
    };
    try {
      const res = await axios.get(SERVER_URL + API.GET_USER, config);
      dispatch({
        type: TYPE.GET_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TYPE.GET_USER_FAIL,
      });
    }
  } else {
    dispatch({
      type: TYPE.GUEST_VIEW,
    });
  }
};

export const loginLoading = () => async (dispatch) => {
  dispatch({
    type: TYPE.LOGIN_LOADING,
  });
};
export const summariseLoading = () => async (dispatch) => {
  dispatch({
    type: TYPE.SUMMARIZE_SET_LOADING,
  });
};
export const setNewVideo = (id, link) => async (dispatch) => {
  console.log("vikram debug new video is called");
  dispatch({
    type: TYPE.SET_NEW_VIDEO,
    payload: {
      youtubeid: id,
      youtubeLink: link,
    },
  });
};

export const summarise = (id, link) => async (dispatch) => {
  const body = JSON.stringify({
    video_id: id,
    link: link,
  });
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(CONSTANTS.TOKEN)}`,
    },
  };
  try {
    const response = await axios.post(SERVER_URL + API.SUMMARISE, body, config);
    dispatch({
      type: TYPE.SUMMARIZE,
      payload: {
        data: response.data.data,
        youtubeid: id,
        youtubeLink: link,
        credits: response.data.credit,
      },
    });
  } catch (error) {
    dispatch({
      type: TYPE.SUMMARIZE_ERROR,
    });
  }
};

export const payment = async (paymentType, email) => {
  const body = JSON.stringify({
    plan: paymentType,
    email: email,
  });
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(CONSTANTS.TOKEN)}`,
    },
  };
  try {
    const response = await axios.post(SERVER_URL + API.PAYMENT, body, config);
    return response.data;
  } catch (error) {
    return JSON.stringify({ error: "Token refresh failed or in guest view." });
  }
};

// Client functions
export const copyToClipboard = async (textToCopy) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
export const copyTextFromElement = async (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    try {
      const textToCopy = element.innerText || element.textContent;
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  } else {
    console.error("Element not found");
  }
};
