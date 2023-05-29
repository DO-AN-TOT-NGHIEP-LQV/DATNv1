import { GET_ALL_USERS } from "../../config/urls";
import store from "../store";
import types from "../types";
import { apiGet, apiPost } from "../../ultils/utilsApi";

const { dispatch } = store;

export const updateShowFilterModel = (data) => {
  dispatch({
    type: types.SHOW_FILTER_MODEL,
    payload: data,
  });
};

// nowRangeMinMaxPrice: "nowRangeMinMaxPrice",
// nowValueMinMaxPrice: "nowValueMinMaxPrice",
// saveRangeMinMaxPrice: "saveRangeMinMaxPrice",
// saveValueMinMaxPrice: "saveValueMinMaxPrice",

export const nowRangeMinMaxPrice = (data) => {
  dispatch({
    type: types.nowRangeMinMaxPrice,
    payload: data,
  });
};

export const nowValueMinMaxPrice = (data) => {
  dispatch({
    type: types.nowValueMinMaxPrice,
    payload: data,
  });
};

export const saveRangeMinMaxPrice = (data) => {
  dispatch({
    type: types.saveRangeMinMaxPrice,
    payload: data,
  });
};

export const saveValueMinMaxPrice = (data) => {
  dispatch({
    type: types.saveValueMinMaxPrice,
    payload: data,
  });
};
