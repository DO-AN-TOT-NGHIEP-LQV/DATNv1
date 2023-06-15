// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from "react-native";
// import MasonryList from "@react-native-seoul/masonry-list";
// import React from "react";
// import Color from "../../constans/Color";
// import { v4 as uuidv4 } from "uuid";

// const windowWidth = Dimensions.get("window").width;
// const MasonryListPosts = ({ data }) => {
//   return (
//     <MasonryList
//       data={data}
//       keyExtractor={(item) => uuidv4()}
//       numColumns={2}
//       // spacing={2}
//       imageContainerStyle={{ borderRadius: 8 }}
//       showsVerticalScrollIndicator={false}
//       renderItem={({ item, i }) => <CardItem data={item} i={i} />}
//     />
//   );
// };

// const CardItem = ({ data, i }) => {
//   return (
//     <View
//       className="bg-[#111] rounded-md"
//       style={{
//         // height: Math.round(Math.random() * 100 + 160),
//         borderColor: Color.textLight,
//         borderWidth: 1,
//         height: Math.round(200),
//         backgroundColor: Color.white,
//         paddingHorizontal: 5,
//         margin: 2,
//       }}
//     >
//       <View style={style.card}>
//         <TouchableOpacity
//           style={{
//             borderRadius: 3,

//             width: "100%",
//             height: 110,
//             paddingVertical: 5,
//           }}
//         >
//           <Image
//             source={{ uri: data.images[0].url || null }}
//             className="w-full h-full object-cover"
//             resizeMode="contain"
//             style={{
//               borderRadius: 3,
//             }}
//           />
//         </TouchableOpacity>

//         {/* Content && Title */}
//         <View style={{ height: 45 }}>
//           <Text
//             numberOfLines={1}
//             style={{
//               fontWeight: "500",
//               fontSize: 14,
//               marginLeft: 0,
//               lineHeight: 15,
//             }}
//           >
//             {`${data.title || ""}`}
//           </Text>

//           <Text
//             numberOfLines={2}
//             style={{
//               fontWeight: "normal",
//               fontSize: 14,
//               marginLeft: 0,
//               lineHeight: 15,
//             }}
//           >
//             {`${data.content || ""}`}
//           </Text>
//         </View>

//         {/* Price */}
//         <View
//           style={{
//             flexDirection: "row",
//           }}
//         >
//           <Text numberOfLines={1}>
//             <Text numberOfLines={1} style={style.priceSmall}>
//               đ
//             </Text>
//             <Text numberOfLines={1} style={style.priceBig}>
//               {data.price}
//             </Text>
//           </Text>
//         </View>

//         {/* Detail */}
//         <View
//           style={{
//             flexDirection: "row",
//             // flex: 1,
//             justifyContent: "space-between",
//             alignItems: "center",
//             alignContent: "center",
//           }}
//         ></View>
//       </View>
//     </View>
//   );
// };

// export default MasonryListPosts;

// const style = StyleSheet.create({
//   card: {
//     backgroundColor: Color.white,
//     flex: 1,
//   },
//   priceSmall: {
//     fontSize: 16,
//     fontWeight: "300",
//     color: Color.red,
//     color: Color.blueTheme,
//   },
//   priceBig: {
//     fontSize: 18,
//     fontWeight: "normal",
//     color: Color.blueTheme,
//   },
// });
