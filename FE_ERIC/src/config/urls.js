import axios from "axios";

// export const API_BASE_URL = "http://192.168.1.4:8080/api"
export const getApiUrl = (endpoint) => endpoint;

// Auth and User
export const LOGIN = getApiUrl("/login");
export const SIGNUP = getApiUrl("/user/register");
export const GET_ALL_USERS = getApiUrl("/users");
export const REFRESH_TOKEN = getApiUrl("/token/refresh");

// Post
export const CREATE_POST = getApiUrl("/post/create");

//Search
export const SEARCH_POST_B_IMG = getApiUrl("/post/searchByImage");

axios.defaults.baseURL = "http://192.168.1.8:8080/api";
// axios.defaults.baseURL = 'http://192.168.1.6:8080/api'
