import { combineReducers } from "redux";
import { userReducer } from "./appReducer";

export default combineReducers({
  user: userReducer,
});
