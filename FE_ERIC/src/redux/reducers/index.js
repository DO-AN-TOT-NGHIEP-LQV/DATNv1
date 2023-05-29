import { combineReducers } from "redux";
import auth from "./auth";
import search from "./search";
import types from "../types";
import filter from "./filter";

const appReducer = combineReducers({
  auth,
  search,
  filter,
});

const rootReducer = (state, action) => {
  if (action.type == types.CLEAR_REDUX_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
