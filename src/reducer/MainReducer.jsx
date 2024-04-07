import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ClientReducer from "./ClientReducer";

const MainReducer = combineReducers({
    AuthReducer,
    ClientReducer
});

export default MainReducer;