import TYPE from "../reducer/Type";
const initialState = {
    videoId:undefined
}

const Listener = (state=initialState, action) => {
    console.log("listiner is called",action)
    const { type, data } = action;
    switch (type) {
        case TYPE.VIDEO_ID:
            return {
                videoId:data
            }  
     
        default:
            return state;
        }
}

export default Listener;