import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/store';
import types from '../redux/types';
import { showError } from './helperFunction';
import axios from 'axios';
import { REFRESH_TOKEN } from '../config/urls';
import jwtDecode from 'jwt-decode';
import { saveUserData } from '../redux/actions/auth';

const { dispatch, getState } = store;

export async function getHeaders() {

	let userData = await AsyncStorage.getItem('userData');
	if (userData) {	
		userData = JSON.parse(userData);
		return {
			"authorization": 'Bearer ' + `${userData.access_token}`,
		};
	}
	return {};
}

export async function apiReq(
	endPoint,
	data,
	method,
	headers,
	withAuth = true,
	requestOptions = {}
) {

	if( withAuth === true ){
		await console.log('check out')
		const c = await getCredentials();
		if( c === null){
			 console.log('c == null')
			clearUserData();
			dispatch({
					type: types.CLEAR_REDUX_STATE,
					payload: {}
			});
		return null
		}
	}

	return new Promise(async (res, rej) => {

			const getTokenHeader = await getHeaders();
			headers = {
				...getTokenHeader,
				...headers
			};

			if (method === 'get' || method === 'delete') {
				data = {
					...requestOptions,
					...data,
					headers
				};
			}
			axios[method](endPoint, data, { headers })
				.then(result => {
					if (result.status === false) {
						return rej(result);
					}
					return res(result);
				})
				.catch(error => {
					
					console.log("coi loi o ultils", error)
					if (error && error.response &&  400 <= error.response.status ) {
						clearUserData();
						dispatch({
							type: types.CLEAR_REDUX_STATE,
							payload: {}
						});
						return rej(error.response);
					}

					if (error && error.response  ) {
						if( error.response.data ){
							if (!error.response.data.error_message) {
								error.response.data.error_message = error.response.message || "Network Error";
								console.log("coi loi o 1")
								return rej(error.response.data);
							}
							console.log(error.response.data.error_message)
							showError(error.response.data.error_message)
							return rej(error.response.data);
						}
						else{
							showError("Loi mang")
						}

					}else{ 
					console.log("coi loi o 3")
					// console.log(error)
					const a = {  error_message: "Network Error" }
					console.log(a.error_message)
					return rej(a);
					// error.response.data.error_message = 'Network Error' ;
					// return rej(error.response.data);
				}
				});
		});
	}


export async function clearUserData() {
	return AsyncStorage.removeItem('userData');
}


export function apiPost(endPoint, data, headers = {}, withAuth = true ) {
	return apiReq(endPoint, data, 'post', headers, withAuth   );
}

export function apiDelete(endPoint, data, headers = {}, withAuth = true ) {
	return apiReq(endPoint, data, 'delete', headers,  withAuth);
}

export function apiGet( endPoint, data, headers = {}, withAuth = true, requestOptions = {}) {
	return apiReq(endPoint, data, 'get', headers, withAuth, requestOptions);
}

export function apiPut(endPoint, data, headers = {}, withAuth = true) {
	return apiReq(endPoint, data, 'put', headers, withAuth);
}


export function isTokenExpired  (token) {
	var decoded = jwtDecode( token )
	if (decoded.exp < Date.now() / 1000) {
		return true
	  } else {
		return false
	  }
}
export function setCredentials (data) {
	data = JSON.stringify(data);    
	return AsyncStorage.setItem('userData', data);
}

export async function getUserData() {

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('userData').then(data => {
      resolve(JSON.parse(data));
    });
  });
} 

export async function getCredentials() {

	return new Promise(  async  (resolve, reject) =>  {
    try{
    let credentials = await AsyncStorage.getItem('userData')
	console.log('getCredentials 5')

    let cred = await getVerifiedUsers(JSON.parse(credentials))
	console.log('getCredentials 6')
    if (credentials != null && cred != null) {       // neu 1 tron 2 cai null
		console.log('getCredentials 1')
      resolve(cred)
    } else {
		console.log('getCredentials 2')
      resolve(null)
    }
	console.log('getCredentials 3')
	
    resolve(null)
    }
    catch(error){
		console.log('getCredentials 4')
      resolve(null)
    }
  });
} 


export async function getVerifiedUsers (userData) {
  
    console.log('Loading keys from storage')
    if (userData) {
		console.log('co token trong stoage')
      if (!isTokenExpired(userData.access_token)) {
		console.log('token con co gia tri')
        return userData;
      } else {
		console.log('token het gia tri refresh')
        if (!isTokenExpired(userData.refresh_token)) {
          try{
             console.log('getVerifiedUsers  1')
             const refreshResponse = await updateAccessUsingRefresh(userData.refresh_token)
             return refreshResponse
          } catch(error){
			  console.log('getVerifiedUsers  2')
              return null
          } 
		  console.log('getVerifiedUsers  3')        
          return null
        } else {

          console.log('refresh expired, please login')
          return null
        }
      }
    } else {
      console.log('access not available please login')
      return null
    }
}

// refresh lai accesstoken
export async function updateAccessUsingRefresh (refresh_token) {
      return new Promise( async (resolve, reject) => {
		console.log('call api ref  3 ')
        const header = {
          "authorization": 'Bearer ' + `${refresh_token}`,
        }
		console.log('call api ref  0 ')
        return apiGet(REFRESH_TOKEN, {}, header, false , {})
        .then((res) => {
        //   data = JSON.parse(res.data)         //data = JSON.parse(data)/ bien 1 chuoi thang 1 mang]
            console.log('call api ref 1')
            setCredentials(res.data).then(() => {
              resolve(res)
              saveUserData(res.data)
          });
          });
        })
        .catch((error) => {
            console.log("Loi khong the refresh token refreshToken")
            reject(error)
})}



