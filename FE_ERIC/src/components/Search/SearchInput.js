// import React, { useState } from "react";
// import {
//   TextInput,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { spacing } from "../../constans/Theme";
// import colors from "../../constans/Color";
// import Icons, { icons } from "../Icons";
// import actions from "../../redux/actions";
// import { showError } from "../../ultils/messageFunction";
// import { useSelector } from "react-redux";
// import Color from "../../constans/Color";
// import { updateIsMainViewDisplay } from "../../redux/actions/search";
// import { SEARCH_ALL_BY_TEXT } from "../../config/urls";

// const SearchInput = () => {
//   const [searchText, setSearch] = useState("");
//   const categoryIndex = useSelector((state) => state.search.categoryIndex);
//   const isMainViewVisible = useSelector(
//     (state) => state.search.isMainViewVisible
//   );

//   const showFilterModel = useSelector((state) => state.filter.showFilterModel);

//   const onSearch = async () => {
//     // actions.updateShowAllCategories(false);
//     // Co cac bien nhu la danh sach search, neu ma bam vo cai nut ni thi hien thi che do showALl tuc la search text.
//     // CO nghia phai check dieu ch cho sroll view luot toi cuoi trang. Neu luot toi cuoi trang ma la show all thi khoi can load,
//     // Con khong thi phai load moi. load moi co nghia la cap nhat cai cu va load ththem cai moi
//     // con sheach by img thi load laij moi het

//     if (true) {
//       // if (!checkStringEmpty(searchText)) {
//       try {
//         actions.updateIsLoading(true);

//         if (categoryIndex == 0) actions.updateCategoryIndex(1);

//         actions.saveListSearch(null);

//         const res = await actions.fetchDataForSearchText(
//           searchText,
//           0,
//           SEARCH_ALL_BY_TEXT
//         );
//         actions.saveListSearch(res.data);
//         actions.updateShowAllCategories(false);
//         actions.updateIsMainViewDisplay(false);
//         actions.updateIsLoading(false);

//         actions.updatePagePost(0);
//         actions.updatePageProduct(0);
//         actions.updateSearchText(searchText);
//       } catch (error) {
//         showError(error.error_message);
//       }
//     }
//   };

//   return (
//     <View style={{ backgroundColor: "#F2F1FD" }}>
//       <View style={[styles.headerWrapperHeader, styles.shadowTouch]}>
//         <TouchableOpacity>
//           <View style={styles.headerLeft}>
//             <Icons
//               icon={icons.Feather}
//               size={12}
//               color={colors.black}
//               name={"chevron-left"}
//             />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.headerRight}>
//           <View
//             style={{
//               borderWidth: 1,
//               borderColor: colors.blueMain,
//               borderRadius: 10,
//               // marginVertical: 5,
//               // paddingVertical:5
//             }}
//           >
//             <View style={styles.inner}>
//               <TextInput
//                 style={styles.field}
//                 placeholder="Search"
//                 value={searchText}
//                 onChangeText={setSearch}
//               />

//               {/* Camera icon */}
//               <TouchableOpacity
//                 style={{
//                   ...styles.cameraButton,
//                 }}
//                 onPress={() => {
//                   updateIsMainViewDisplay(!isMainViewVisible);
//                 }}
//               >
//                 <View>
//                   <Icons
//                     icon={icons.Ionicons}
//                     size={20}
//                     name="camera-outline"
//                   />
//                 </View>
//               </TouchableOpacity>

//               {/* Filter icon */}
//               <TouchableOpacity
//                 style={{
//                   ...styles.cameraButton,
//                 }}
//                 onPress={() => actions.updateShowFilterModel(true)}
//               >
//                 <View>
//                   <Icons
//                     icon={icons.Ionicons}
//                     size={20}
//                     name="md-filter-outline"
//                   />
//                 </View>
//               </TouchableOpacity>

//               {/* Search Button */}
//               <TouchableOpacity style={styles.filter} onPress={onSearch}>
//                 <View>
//                   <Icons
//                     icon={icons.AntDesign}
//                     name="search1"
//                     color={Color.white}
//                   />
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerWrapperHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 16,
//     backgroundColor: "#ffffff",
//     height: Dimensions.get("window").height / 15,
//     marginHorizontal: 5,
//     marginTop: 5,
//     zIndex: 10,
//   },
//   headerLeft: {
//     borderColor: colors.textLight,
//     borderWidth: 2,
//     padding: 12,
//     borderRadius: 10,
//     // backgroundColor: "#ffffff",
//   },
//   headerRight: {
//     height: "90%",
//     flexGrow: 1,
//     marginLeft: 8,
//     // marginVertical: 10,
//     backgroundColor: "#ffffff",
//     // borderRadius: 16,
//   },

//   shadowTouch: {
//     borderRadius: 16,
//     shadowColor: colors.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 16,
//     elevation: 2,
//   },

//   inner: {
//     flexDirection: "row",
//   },
//   field: {
//     backgroundColor: colors.white,
//     paddingLeft: spacing.s, // spacing.xl + spacing.s,
//     // paddingRight: spacing.m, // spacing.m,
//     paddingVertical: 10,
//     borderRadius: 16,
//     marginRight: 3,

//     flex: 1,
//     shadowColor: colors.black,
//     shadowRadius: 4,
//     shadowOpacity: 0.1,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//   },
//   filter: {
//     borderWidth: 2,
//     borderColor: colors.blueMain,
//     width: 40,
//     backgroundColor: colors.blueMain,
//     justifyContent: "center",
//     alignItems: "center",
//     borderBottomEndRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   cameraButton: {
//     // width: 40,
//     // justifyContent: "center",
//     // alignItems: "center"

//     justifyContent: "center",
//     // alignItems: "flex-start",
//     // borderWidth: 1,
//     // paddingHorizontal: 5
//     // marginHorizontal: 3,
//     marginRight: 3,
//   },
// });

// export default SearchInput;

// // import React, { useState } from "react";
// // import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
// // import { spacing } from "../../constans/Theme";
// // import colors from "../../constans/Color";
// // import Icons, { icons } from "../Icons";
// // import { Feather } from "@expo/vector-icons";

// // const SearchInput = () => {
// //   const [search, setSearch] = useState("");

// //   return (
// //     <View style={{ backgroundColor: "#F2F1FD" }}>
// //       <View style={[styles.headerWrapper]}>
// //         <TouchableOpacity>
// //           <View style={styles.headerLeft}>
// //             <Feather name="chevron-left" size={12} color={colors.black} />
// //           </View>
// //         </TouchableOpacity>

// //         <View style={styles.headerRight}>
// //           <View
// //             style={{
// //               borderWidth: 2,
// //               borderColor: colors.blueMain,
// //               height: 40,
// //               borderRadius: 10,
// //             }}
// //           >
// //             <View style={styles.inner}>
// //               <TextInput
// //                 style={styles.field}
// //                 placeholder="Search"
// //                 value={search}
// //                 onChangeText={setSearch}
// //               />

// //               <TouchableOpacity style={styles.filter}>
// //                 <View>
// //                   <Icons icon={icons.AntDesign} name="search1" />
// //                 </View>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     paddingHorizontal: 5,
// //     paddingTop: 5,
// //     paddingBottom: 5,
// //     // flex: 1,
// //     flexDirection: "row",
// //   },
// //   headerLeft: {
// //     borderColor: colors.textLight,
// //     borderWidth: 2,
// //     padding: 12,
// //     borderRadius: 10,
// //   },
// //   headerRight: {
// //     flexGrow: 1,
// //     marginLeft: 8,
// //     backgroundColor: "#ffffff", // colors.white,
// //     // borderRadius: 16,
// //   },

// //   headerWrapper: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 10,
// //     borderRadius: 16,
// //     backgroundColor: "#ffffff", // colors.white,
// //     height: 55,
// //     marginHorizontal: 5,
// //     marginTop: 5,
// //     position: "absolute",
// //     //  transform: [{ translateY }],
// //     // zIndex: 10,
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //   },

// //   inner: {
// //     flexDirection: "row",
// //   },
// //   field: {
// //     backgroundColor: colors.white,
// //     paddingLeft: spacing.s, // spacing.xl + spacing.s,
// //     paddingRight: spacing.m, // spacing.m,
// //     paddingVertical: 10,
// //     borderRadius: 16,
// //     // height: 55,
// //     flex: 1,
// //     shadowColor: colors.black,
// //     shadowRadius: 4,
// //     shadowOpacity: 0.1,
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //   },
// //   filter: {
// //     // borderLeftColor: 16,
// //     borderWidth: 2,
// //     borderColor: colors.blueMain,
// //     width: 40,
// //     backgroundColor: colors.blueMain,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderBottomEndRadius: 8,
// //     // borderTopLeftRadius:16,
// //     // borderTopStartRadius: 16,
// //     borderTopRightRadius: 8,
// //     // borderTopLeftRadius:16
// //   },
// // });

// // export default SearchInput;
