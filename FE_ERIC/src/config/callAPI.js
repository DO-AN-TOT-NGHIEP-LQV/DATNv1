// import { apiGet } from "../ultils/utilsApi";
// import { SEARCH_AND_FILTER_PRODUCTS } from "./urls";

// export const searchAndFilterProducts = (
//   keyword = null,
//   types = [],
//   brands = [],
//   minPrice = 0,
//   maxPrice = null
// ) => {
//   return new Promise(async (resolve, reject) => {
//     var headers = {
//       "Content-Type": "application/json",
//     };

//     var data = {
//       params: {
//         keyword,
//         searchText: searchText,
//         page: page,
//         maxPrice,
//         minPrice,
//       },
//     };

//     await apiGet(SEARCH_AND_FILTER_PRODUCTS, data, headers, false)
//       .then((res) => {
//         console.log(res);
//         resolve(res);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
