import { combineReducers } from "redux";
import auth from "./auth";
import search from "./search";
import types from "../types";

const appReducer = combineReducers({
  auth,
  search,
});

const rootReducer = (state, action) => {
  if (action.type == types.CLEAR_REDUX_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
