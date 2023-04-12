import axios from "axios"

// export const API_BASE_URL = "http://192.168.1.4:8080/api"
export const getApiUrl = ( endpoint) =>  endpoint

export const LOGIN = getApiUrl('/login')
export const SIGNUP = getApiUrl('/user/signup')
export const GET_ALL_USERS = getApiUrl('/users')

export const REFRESH_TOKEN = getApiUrl('/token/refresh')

axios.defaults.baseURL = 'http://localhost:8080/api'