import types from "../types";

const initialState = {
  tokenData: {},
  detailUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
      const data = action.payload;
      return { ...state, tokenData: data };
    }
    case types.GET_DETAIL_USERS: {
      const data = action.payload;
      return { ...state, detailUser: data };
    }
    default:
      return { ...state };
  }
}
