import axios from "axios";

export const getApiUrl = (endpoint) => endpoint;

// Auth and User
export const LOGIN = getApiUrl("/login");
export const SIGNUP = getApiUrl("/user/register");
export const CHANGE_PASSWORD = getApiUrl("/user/changePassword");

export const GET_ALL_USERS = getApiUrl("/users");
export const GET_DETAIL_USERS = getApiUrl("/user/getDetail");
export const REFRESH_TOKEN = getApiUrl("/token/refresh");

// Post
export const CREATE_POST = getApiUrl("/post/create");

//Search
export const SEARCH_ALL_B_IMG = getApiUrl("/search/searchByImage");
export const SEARCH_POST_B_TEXT = getApiUrl("/search/posts/SearchByText");
export const SEARCH_PRODUCT_B_TEXT = getApiUrl("/search/products/SearchByText");
export const SEARCH_ALL_BY_TEXT = getApiUrl("/search/all/SearchByText");
export const SEARCH_AND_FILTER_PRODUCTS = getApiUrl(
  "/search/products/searchAndFilterProducts"
);
export const GET_PRODUCT_BY_SHOP = getApiUrl("/search/products/shopId");

//Product
export const GET_PRODUCT_DISCUSSION = getApiUrl(
  "/user/discussion/product/getDiscussionsByProductIdPageable"
);
export const CREATE_NEW_DISCUSSION = getApiUrl(
  "/user/discussion/product/newDiscussion"
);
export const CREATE_NEW_SUB_DISCUSSION = getApiUrl(
  "/user/discussion/product/newSubDiscussion"
);

export const DELETE_MAIN_DISCUSSION = getApiUrl(
  "/user/discussion/product/deleteMainDiscussion"
);
export const DELETE_SUB_DISCUSSION = getApiUrl(
  "/user/discussion/product/deleteSubDiscussion"
);

export const CREATE_NEW_PRODUCT = getApiUrl("/sale/product/create");
export const UPDATE_PRODUCT = getApiUrl("/sale/product/update");
export const DELETE_PRODUCT = getApiUrl("/sale/product/delete");
export const GET_PRODUCT_DETAIL = getApiUrl("/sale/product/getById");
export const CHANGE_FEATURE = getApiUrl("/sale/product/feature");
export const GET_PRODUCT_BY_ID = getApiUrl("/user/product/getById");

//Sale // Shop
export const GET_DETAIL_SHOP = getApiUrl("/sale/shop/getShop");

// axios.defaults.baseURL = "https://f48a-42-119-215-36.ngrok-free.app/api";
axios.defaults.baseURL = "http://192.168.1.8:8080/api";
