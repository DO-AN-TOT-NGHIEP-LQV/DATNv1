import { GET_ALL_USERS, LOGIN, REFRESH_TOKEN, SIGNUP } from "../../config/urls";
import store from "../store";
import types from "../types";
import { apiGet, apiPost } from "../../ultils/utilsApi";
import { clearUserData , setCredentials} from "../../ultils/utilsApi";


const { dispatch } = store

export const  saveUserData = (data) => {
    dispatch({
        type: types.LOGIN,
        payload: data
    })
}

export function login(data){
    return new Promise((resolve, reject) => {
        const header = {
            "Content-Type": "multipart/form-data"
        }
        return apiPost(LOGIN, data, header, false)
        .then((res) => {
            console.log('login:' )
            setCredentials(res.data).then(() => {
                    resolve(res)
                    saveUserData(res.data)
                });
                return;
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export  function refreshToken(refresh_token){

    return new Promise((resolve, reject) => {
        const header = {
			"authorization": 'Bearer ' + `${refresh_token}`
        }
        return apiGet(REFRESH_TOKEN, {}, header, {}, false)
        .then((res) => {
        //   data = JSON.parse(res.data)         //data = JSON.parse(data)/ bien 1 chuoi thang 1 mang
        console.log('refreshToken 1')
        setCredentials(res.data).then(() => {
            resolve(res)
            saveUserData(res.data)
        });
        })
        .catch((error) => {
            console.log("Loi khong the refresh token refreshToken")
            reject(error)
        })}
)}

export function signup(data) {
    return apiPost(SIGNUP, data)
}

export function logout(){
    dispatch({type: types.CLEAR_REDUX_STATE})
    clearUserData()
}

export  function getAllUsers(){

    return new Promise((resolve, reject) => {
        return apiGet(GET_ALL_USERS, {}, {}, true )
        .then((res) => {
                resolve(res)
            });
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
}