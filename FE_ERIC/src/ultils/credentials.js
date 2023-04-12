// import jwtDecode from "jwt-decode"
// import { apiGet } from "./utilsApi";
// import { REFRESH_TOKEN } from "../config/urls";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { saveUserData } from "../redux/actions/auth";

// Kiem tra token con hieu luc hay khong
// export function isTokenExpired  (token) {
// 	var decoded = jwtDecode( token )
// 	if (decoded.exp < Date.now() / 1000) {
// 		return true
// 	  } else {
// 		return false
// 	  }
// }
// export function setCredentials (data) {
// 	data = JSON.stringify(data);    
// 	return AsyncStorage.setItem('userData', data);
// }

// export async function getUserData() {

//   return new Promise((resolve, reject) => {
//     AsyncStorage.getItem('userData').then(data => {
//       resolve(JSON.parse(data));
//     });
//   });
// } 

// export async function getCredentials() {

// 	return new Promise(  async  (resolve, reject) =>  {
//     try{
//     let credentials = await AsyncStorage.apiGet('userData')
//     let cred = await getVerifiedUsers(JSON.parse(credentials))
//     if (credentials != null && cred != null) {
//       resolve(cred)
      
//     } else {
//       resolve(null)
//     }
//     resolve(null)
//     }
//     catch(error){
//       resolve(null)
//     }
//   });
// } 


// export async function getVerifiedUsers (userData) {
  
//     console.log('Loading keys from storage')
//     if (userData) {
//       if (!isTokenExpired(userData.access_token)) {
//         //neu acces token con hieu luc thi return cai cu
//         return userData
//       } else {
//         if (!isTokenExpired(userData.refresh_token)) {
//           try{
//              console.log('getVerifiedUsers')
//              const refreshResponse = await updateAccessUsingRefresh(userData.refresh_token)
//              return refreshResponse
//           } catch(error){
//               return null
//           }         
//           return null
//         } else {

//           console.log('refresh expired, please login')
//           return null
//         }
//       }
//     } else {
//       console.log('access not available please login')
//       return null
//     }
// }

// // refresh lai accesstoken
// export async function updateAccessUsingRefresh (refresh_token) {
//       return new Promise((resolve, reject) => {
//         const header = {
//           "authorization": 'Bearer ' + `${refresh_token}`,
//         }
//         return apiGet(REFRESH_TOKEN, {}, header, false , {})
//         .then((res) => {
//         //   data = JSON.parse(res.data)         //data = JSON.parse(data)/ bien 1 chuoi thang 1 mang]
//             console.log('call api ref')
//             setCredentials(res.data).then(() => {
//               resolve(res)
//               saveUserData(res.data)
//           });
//           });
//         })
//         .catch((error) => {
//             console.log("Loi khong the refresh token refreshToken")
//             reject(error)
// })}