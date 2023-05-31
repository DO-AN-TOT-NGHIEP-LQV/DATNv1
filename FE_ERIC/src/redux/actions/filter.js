import { SEARCH_AND_FILTER_PRODUCTS } from "../../config/urls";
import store from "../store";
import types from "../types";
import { apiGet, apiPost } from "../../ultils/utilsApi";
import { calculateDisplayValue } from "../../ultils/calculate";
const { dispatch } = store;

export const changeFilter = () => {
  dispatch({
    type: types.IS_CHANGE_FILTER,
  });
};

export const updateApplyFilter = (data) => {
  dispatch({
    type: types.UPDATE_APPLY_FILTER,
    payload: data,
  });
};

export const nowRangeMinMaxPrice = (data) => {
  dispatch({
    type: types.NOW_RANGE_MINMAX,
    payload: data,
  });
};

export const brandSelectedList = (data) => {
  dispatch({
    type: types.BRAND_SELECTED_LIST,
    payload: data,
  });
};

export const typeSelectedList = (data) => {
  dispatch({
    type: types.TYPE_SELECTED_LIST,
    payload: data,
  });
};

export const searchAndFilterProducts = (
  page = 0,
  keyword,
  types = [],
  brands = [],
  minPrice = 0,
  maxPrice = undefined
) => {
  return new Promise(async (resolve, reject) => {
    var headers = {
      "Content-Type": "application/json",
    };

    console.log(types);
    console.log(brands);

    const keywordParam = keyword.trim() == "" ? undefined : keyword;

    const typesParam =
      types && types.length > 0
        ? types.map((type) => encodeURIComponent(type))
        : undefined;

    const brandParam =
      brands && brands.length > 0
        ? brands.map((brand) => encodeURIComponent(brand))
        : undefined;

    const minPriceParam =
      minPrice !== undefined ? calculateDisplayValue(minPrice) : undefined;

    const maxPriceParam =
      maxPrice !== undefined ? calculateDisplayValue(maxPrice) : undefined;

    let url = `${SEARCH_AND_FILTER_PRODUCTS}?`;

    if (keywordParam !== undefined) {
      url += `keyword=${keywordParam}&`;
    }

    if (brandParam !== undefined) {
      url += `brands=${brandParam}&`;
    }

    if (typesParam !== undefined) {
      url += `types=${typesParam}&`;
    }

    if (minPriceParam !== undefined) {
      url += `minPrice=${minPriceParam}&`;
    }
    if (maxPriceParam !== undefined) {
      url += `maxPrice=${maxPriceParam}&`;
    }
    url += `page=${page}`;

    await apiGet(url, {}, headers, true)
      .then((res) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error) => {
        // console.log(error);
        reject({ error_message: "Lỗi" });
      });

    // await apiGet(SEARCH_AND_FILTER_PRODUCTS, data, headers, true)
    //   .then((res) => {
    //     console.log(res);
    //     resolve(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     reject({ error_message: "ai biet" });
    //   });

    // let tokenData = await AsyncStorage.getItem("tokenData");
    // tokenData = JSON.parse(tokenData);

    // var headers = {
    //   "Content-Type": "application/json",
    //   authorization: "Bearer " + `${tokenData.access_token}`,
    // };

    // await axios
    //   .get(SEARCH_AND_FILTER_PRODUCTS, {
    //     params: {
    //       types: typesParam,
    //       minPrice: minPriceParam,
    //       maxPrice: maxPriceParam,
    //       page,
    //     },
    //     headers,
    //   })
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     reject(error);
    //   });
  });
};

// export const searchAndFilterProducts = (
//   page = 0,
//   keyword = "",
//   types = undefined,
//   brands = undefined,
//   minPrice = 0,
//   maxPrice = null
// ) => {
//   return new Promise(async (resolve, reject) => {
//     var headers = {
//       "Content-Type": "application/json",
//     };

//     var params = {
//       page,
//     };

//     if (keyword.trim() != "") {
//       params.keyword = encodeURIComponent(keyword);
//     }

//     if (types !== undefined) {
//       params.types = types.map((type) => encodeURIComponent(type));
//     }

//     if (brands !== undefined) {
//       params.brands = brands.map((brand) => encodeURIComponent(brand));
//     }

//     params.minPrice = encodeURIComponent(calculateDisplayValue(minPrice));
//     params.maxPrice =
//       maxPrice > 100 || maxPrice == null
//         ? undefined
//         : encodeURIComponent(calculateDisplayValue(maxPrice));

//     var data = {
//       params,
//     };

//     await apiGet(SEARCH_AND_FILTER_PRODUCTS, data, headers, true)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

export const searchProductByText = (
  searchText,
  page,
  endPoint = SEARCH_ALL_BY_TEXT
) => {
  return new Promise(async (resolve, reject) => {
    var headers = {
      "Content-Type": "application/json",
    };

    var data = {
      params: {
        searchText: searchText,
        page: page,
      },
    };

    await apiGet(endPoint, data, headers, true)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
