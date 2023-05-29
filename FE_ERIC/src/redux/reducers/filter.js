import types from "../types";

const initialState = {
  showFilterModel: false,

  ///price
  nowRangeMinMaxPrice: null,
  nowValueMinMaxPrice: null,

  saveRangeMinMaxPrice: [0, 100],
  saveValueMinMaxPrice: [0, 0],

  //  Type
  typeSelected: null,
  brandSelected: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_FILTER_MODEL: {
      const data = action.payload;
      return { ...state, showFilterModel: data };
    }

    case types.nowRangeMinMaxPrice: {
      const data = action.payload;
      return { ...state, nowRangeMinMaxPrice: data };
    }
    case types.nowValueMinMaxPrice: {
      const data = action.payload;
      return { ...state, nowValueMinMaxPrice: data };
    }
    case types.saveRangeMinMaxPrice: {
      const data = action.payload;
      return { ...state, saveRangeMinMaxPrice: data };
    }
    case types.saveValueMinMaxPrice: {
      const data = action.payload;
      return { ...state, saveValueMinMaxPrice: data };
    }

    default:
      return { ...state };
  }
}
