import TYPE from "./Type";

const initialState = {
  summaryContent: {},
  credits: 0,
  isNewVideo: true,
  youtubeid: "null",
  youtubeLink: "null",
  loading:false,
  userContent: {},
  token: null,
};

const ClientReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.SUMMARIZE:
      return {
        ...state,
        summaryContent: payload.data,
        credits: payload.credits,
        youtubeid: payload.youtubeid,
        youtubeLink: payload.youtubeLink,
        isNewVideo: false,
        loading:false,
      };
    case TYPE.SUMMARIZE_SET_LOADING:
      return {
        ...state,
        loading:true,
      };
    case TYPE.SUMMARIZE_ERROR:
      return state;

    case TYPE.GET_USER_SUCCESS:
      return {
        ...state,
        credits: payload.credit,
      };

    case TYPE.SET_NEW_VIDEO:
      return {
        ...state,
        youtubeid: payload.youtubeid,
        youtubeLink: payload.youtubeLink,
        isNewVideo: true,
      };

      
    case TYPE.GET_USER_FAIL:
      return state;

    case TYPE.GUEST_VIEW:
      return state;

    default:
      return state;
  }
};

export default ClientReducer;
