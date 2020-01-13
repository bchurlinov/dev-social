import {combineReducers} from "redux";
import authReducer from "./authReducers";
import profileReducer from "./profileReducers";
import postReducer from "./postReducers";

const rootReducer = combineReducers({
   auth: authReducer,
   profile: profileReducer,
   post: postReducer
});

export default rootReducer;