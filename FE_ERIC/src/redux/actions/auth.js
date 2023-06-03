import {
  GET_ALL_USERS,
  GET_DETAIL_USERS,
  LOGIN,
  SIGNUP,
} from "../../config/urls";
import store from "../store";
import types from "../types";
import { apiGet, apiPost } from "../../ultils/utilsApi";
import { clearUserData, setCredentials } from "../../ultils/credentials";

const { dispatch } = store;

export const saveUserData = (data) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export const saveDetailUser = (data) => {
  dispatch({
    type: types.GET_DETAIL_USERS,
    payload: data,
  });
};

export const setIsLogin = (data) => {
  dispatch({
    type: types.IS_LOGIN,
    payload: data,
  });
};


export function login(data) {
  return new Promise(async (resolve, reject) => {
    const header = {
      "Content-Type": "multipart/form-data",
    };
    try {
      const loginResponse = await apiPost(LOGIN, data, header, false);
      console.log("LOGIN:");
      await setCredentials(loginResponse.data);
      await saveUserData(loginResponse.data);

      // console.log("Loi o ham login 7");
      const detailUsersResponse = await apiGet(GET_DETAIL_USERS, {}, {}, true);
      // console.log(error, "Loi o ham login 6");
      console.log("GET_DETAIL_USERS");
      saveDetailUser(detailUsersResponse.data);

      resolve(loginResponse);
    } catch (error) {
      console.log("Loi o ham login9");
      logout();
      reject(error);
    }
  });
}

// export function refreshToken(refresh_token) {
//   return new Promise(async (resolve, reject) => {
//     const header = {
//       authorization: "Bearer " + `${refresh_token}`,
//     };
//     return apiGet(REFRESH_TOKEN, {}, header, {}, false)
//       .then((res) => {
//         console.log("REFRESH_TOKEN 1");
//         setCredentials(res.data).then(() => {
//           resolve(res);
//           saveUserData(res.data);
//         });
//       })
//       .catch((error) => {
//         console.log("Loi khong the refresh token refreshToken");
//         logout();
//         reject(error);
//       });
//   });
// }

export function getDetailUser() {
  return new Promise(async (resolve, reject) => {
    const header = {
      "Content-Type": "multipart/form-data",
    };
    try {
      const detailUsersResponse = await apiGet(GET_DETAIL_USERS, {}, {}, true);
      console.log("GET_DETAIL_USERS");
      saveDetailUser(detailUsersResponse.data);
      resolve(detailUsersResponse);
    } catch (error) {
      reject(error);
    }
  });
}

export function signup(data) {
  return apiPost(SIGNUP, data, {}, false);
}
export function changePassword(data) {
  return apiPost(SIGNUP, data, {}, false);
}

export function logout() {
  dispatch({ type: types.CLEAR_REDUX_STATE });
  dispatch({ type: types.IS_LOGIN, data: false });
  clearUserData();
}

export function getAllUsers() {
  return new Promise((resolve, reject) => {
    return apiGet(GET_ALL_USERS, {}, {}, true).then((res) => {
      resolve(res);
    });
    resolve(res);
  }).catch((error) => {
    reject(error);
  });
}
