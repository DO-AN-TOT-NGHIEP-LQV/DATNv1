import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Color from "../../constans/Color";
import { apiDelete, apiGet, apiPost } from "../../ultils/utilsApi";
import {
  CREATE_NEW_DISCUSSION,
  CREATE_NEW_SUB_DISCUSSION,
  DELETE_MAIN_DISCUSSION,
  DELETE_SUB_DISCUSSION,
  GET_PRODUCT_DISCUSSION,
} from "../../config/urls";
import { showError, showSuccess } from "../../ultils/messageFunction";
import Icons, { icons } from "../Icons";
import moment from "moment";
import { checkStringEmpty } from "../../ultils/validations";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useSelector } from "react-redux";
import DiscussionTextInput from "./DetailDiscussion/DiscussionTextInput";
import MainDiscussionSection from "./DetailDiscussion/MainDiscussionSection";

const DetailDiscussion = ({ dataProduct }) => {
  const [listDiscussion, setListDiscussion] = useState([]);

  const [effectTriggered, setEffectTriggered] = useState(false);

  const handleEffect = () => {
    setEffectTriggered((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      var headers = {
        "Content-Type": "application/json",
      };

      var data = {
        params: {
          productId: dataProduct.id,
        },
      };
      await apiGet(GET_PRODUCT_DISCUSSION, data, headers, true)
        .then((res) => {
          setListDiscussion(res.data);
          // console.log(res.data);
        })
        .catch((error) => {
          showError(error.error_message);
        });
    };

    fetchData();
  }, [effectTriggered]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Input Comment Footer */}
      <DiscussionTextInput
        productId={dataProduct.id}
        placeholder={"Hãy để lại gì đó"}
        handleEffect={handleEffect}
      />

      {/* Discussions Main Comment */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={listDiscussion}
          keyExtractor={(item, index) => `myKey-${item.mainId}`}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}
          renderItem={({ item, index }) => {
            return (
              <MainDiscussionSection
                mainDisItem={item}
                handleEffect={handleEffect}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

// const MainDiscussionSection = ({ mainDisItem, handleEffect }) => {
//   const [showSubDisList, setShowSubDisList] = useState(false);
//   const onToggle = () => {
//     setShowSubDisList(!showSubDisList);
//   };

//   const detailUser = useSelector((state) => state.auth.detailUser);

//   const deleteMainDis = async () => {
//     // await apiDelete(DELETE_MAIN_DISCUSSION, {}, {}, true);
//     console.log("/////////////////////////////////////////");
//     console.log(DELETE_MAIN_DISCUSSION + `/${mainDisItem.mainId}`);

//     await apiDelete(
//       DELETE_MAIN_DISCUSSION + `/${mainDisItem.mainId}`,
//       {},
//       {},
//       true
//     )
//       .then((res) => {
//         console.log(res.data);
//         showSuccess("Xóa thành công");
//       })
//       .catch((error) => {
//         showError(error.error_message);
//       });
//     await handleEffect();
//   };

//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         marginTop: 10,
//         // borderColor: Color.textLight,
//         // borderTopWidth: 1,
//         // borderBottomWidth: 1,
//         // borderColor: Color.textLight,
//       }}
//     >
//       <Image
//         source={{
//           uri:
//             mainDisItem?.userAvatar ||
//             "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAB3CAMAAAB/s4FjAAAAIVBMVEX////f39/c3Nz09PT8/Pzk5OT4+Pjr6+vn5+fv7+/h4uE/taJXAAACkklEQVR4nO2bi5KDIAxFCwYU/v+Dt49tl62CdyqPayfnC85kQhIwXi6KoiiKoiiKoihfj8jkRWS0BowE54w11troljCdQTyYN9w15KOlishs352vMY+B2XpeGf8y01r7dZSfwXZ+tFyGjcz4sw6j7bYQH/PKV+l5tOAabwpRJpV2ZWPG9Jh2onxnGm35nwVQNma05T+keP5eUKW0h5RNZOotE+ZMdQyxdDZmGS2agFSNe6BHiyagzkSVIz8dvcNzCKGOcs8NnrZyRufssE/sjJY6dT4Gnhs8dyz4DBLV5zM6C6pM5HwBjanuhOghZJpFwZmf6kaIFmiiiwpeN3iG/q92JiocuDNPPsP3FDfaNAF1Zqp1oDLPCbyUn8sTmNog2AepnpHARkhUNW4g0yhRcX4g+5FeuMJ8Y+ccRqY696R8Dolu3Anq3Iny5zael42UUDyEfEXjRnG6Y5roUkolmq2fPCl9veJM55IzXdt+cUrn/KIM1xSaUMhn1nQudUJa5/wQTTbtJ+Q3ItS5KvnNE9p8zjvz1rpCnGl7ymorN4Fz5N/5qLLwpbRMe48F1lHFWvyCLKtZR3MU/RzhN/M4EwTbB2wdMGEem9l+3lvH3Yz2Mi7Y3n0g/CCO+aXCw5smm7Hu/34nHj53WWvT94eKaX9FG7F23awlfHLwtq1N6FFEpDRVfELzn1c8vC6FY5uOIr5KGm/Q7J+b6fNyvItt81fWoXIM0GAfBfzUyiQNbuwfofqjXqvTlxLrKkvzzDDVvxN1ca68d1C7+W1TN6EbtL8NXNXKcUJn6VE21LmXc9VO2Mm56ro/vkh+jJrO+A9Vx6jZCNGd7KPUbITq3Me5w/R8o+oE3f6S8qDmZkqfcQN1/gFCLxrMgS3bNQAAAABJRU5ErkJggg==",
//         }}
//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 20,
//         }}
//       />

//       {/* Main Dis */}
//       <View
//         style={{
//           flex: 1,
//           marginTop: 3,
//           marginLeft: 5,
//           // borderColor: Color.textLight,
//           // borderBottomWidth: 2,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             marginTop: 5,
//             alignItems: "center",
//             flex: 1,
//           }}
//         >
//           {/* Name */}
//           <Text
//             style={{ fontSize: 14, fontWeight: 500, flex: 1 }}
//             numberOfLines={1}
//           >
//             {mainDisItem?.username || "Người dùng"}
//             {/* {"dfsdfdsfkkfksdkfsp;dfspddsadas"} */}
//           </Text>

//           {/* Menu Delete Of Sub */}
//           {detailUser.id == mainDisItem.userId && (
//             <Menu>
//               <MenuTrigger>
//                 <Icons
//                   size={20}
//                   name={"more-vertical"}
//                   icon={icons.Feather}
//                   style={{ marginRight: 8 }}
//                 />
//               </MenuTrigger>
//               <MenuOptions
//                 optionsContainerStyle={{ width: 100 }}
//                 customStyles={{
//                   optionWrapper: {
//                     paddingTop: 10,
//                     paddingHorizontal: 10,
//                   },
//                 }}
//               >
//                 <MenuOption
//                   onSelect={() => {
//                     Alert.alert(
//                       "Xóa",
//                       "Bạn có chắc muốn xóa phần bình luận này",
//                       [{ text: "Yes", onPress: deleteMainDis }, { text: "No" }],
//                       { cancelable: true }
//                     );
//                   }}
//                 >
//                   <Text style={{ color: "red" }}>Xóa</Text>
//                 </MenuOption>
//                 <MenuOption
//                   onSelect={() => alert(`Not called`)}
//                   disabled={true}
//                   text="Sửa //TODO"
//                 />
//               </MenuOptions>
//             </Menu>
//           )}
//         </View>

//         {/* Main Discussion */}
//         <Text style={{ fontSize: 14, fontWeight: 400 }}>
//           {mainDisItem?.mainContent}
//         </Text>

//         {/* Discussion  Option*/}
//         <View
//           style={{
//             paddingVertical: 10,
//             flexDirection: "row",
//             // marginTop: 5,
//             borderBottomWidth: 1,
//             borderColor: Color.textLight,
//           }}
//         >
//           {/* comment Icon */}
//           <IconLabelButton
//             label={mainDisItem?.subComments.length}
//             containerStyle={{
//               paddingHorizontal: 0,
//               paddingVertical: 0,
//             }}
//             iconStyle={{ width: 20, height: 20 }}
//             labelStyle={{
//               marginLeft: 3,
//               color: Color.black,
//               fontWeight: "200",
//               fontSize: 14,
//             }}
//             onPress={onToggle}
//             icon={
//               <Icons
//                 size={20}
//                 name={"unfold-more-horizontal"}
//                 icon={icons.MaterialCommunityIcons}
//               />
//             }
//           />

//           {/* Date */}
//           <Text
//             style={{
//               flex: 1,
//               textAlign: "right",
//               fontWeight: "300",
//               fontSize: 12,
//             }}
//           >
//             {moment(mainDisItem?.mainUpdateAt).format("YYYY-MM-DD HH:mm")}
//           </Text>
//         </View>

//         {showSubDisList && (
//           <View>
//             <View>
//               <FlatList
//                 data={mainDisItem?.subComments}
//                 keyExtractor={(item) => `keySubDiscusion-replys-${item.subId}`}
//                 renderItem={({ item, index }) => {
//                   return (
//                     <SubDiscussionSection
//                       subDisItem={item}
//                       mainDisId={mainDisItem.mainId}
//                       handleEffect={handleEffect}
//                     />
//                   );
//                 }}
//               />
//             </View>

//             <DiscussionTextInput
//               handleEffect={handleEffect}
//               placeholder={"Phản hồi"}
//               mainDiscussionId={mainDisItem.mainId}
//               inputTextDiscussionStyle={{
//                 height: 70,
//                 borderRadius: 10,
//                 borderTopWidth: 1,
//                 right: 0,
//                 paddingRight: 0,
//                 marginRight: 0,
//               }}
//             />
//           </View>
//         )}
//         {/* Reply Sub Discussion */}
//       </View>
//     </View>
//   );
// };

// const SubDiscussionSection = ({ subDisItem, mainDisId, handleEffect }) => {
//   const detailUser = useSelector((state) => state.auth.detailUser);

//   const deleteSubDis = async () => {
//     await apiDelete(
//       DELETE_SUB_DISCUSSION + `/${subDisItem.subId}`,
//       {},
//       {},
//       true
//     )
//       .then((res) => {
//         console.log(res.data);
//         showSuccess("Xóa thành công");
//       })
//       .catch((error) => {
//         showError(error.error_message);
//       });
//     await handleEffect();
//   };

//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         paddingTop: 5,
//         borderColor: Color.textLight,
//         borderTopWidth: 1,
//         // borderBottomWidth: 1,
//         borderColor: Color.textLight,
//       }}
//     >
//       <Image
//         source={{
//           uri:
//             subDisItem?.subUserAvatar ||
//             "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAB3CAMAAAB/s4FjAAAAIVBMVEX////f39/c3Nz09PT8/Pzk5OT4+Pjr6+vn5+fv7+/h4uE/taJXAAACkklEQVR4nO2bi5KDIAxFCwYU/v+Dt49tl62CdyqPayfnC85kQhIwXi6KoiiKoiiKoihfj8jkRWS0BowE54w11troljCdQTyYN9w15KOlishs352vMY+B2XpeGf8y01r7dZSfwXZ+tFyGjcz4sw6j7bYQH/PKV+l5tOAabwpRJpV2ZWPG9Jh2onxnGm35nwVQNma05T+keP5eUKW0h5RNZOotE+ZMdQyxdDZmGS2agFSNe6BHiyagzkSVIz8dvcNzCKGOcs8NnrZyRufssE/sjJY6dT4Gnhs8dyz4DBLV5zM6C6pM5HwBjanuhOghZJpFwZmf6kaIFmiiiwpeN3iG/q92JiocuDNPPsP3FDfaNAF1Zqp1oDLPCbyUn8sTmNog2AepnpHARkhUNW4g0yhRcX4g+5FeuMJ8Y+ccRqY696R8Dolu3Anq3Iny5zael42UUDyEfEXjRnG6Y5roUkolmq2fPCl9veJM55IzXdt+cUrn/KIM1xSaUMhn1nQudUJa5/wQTTbtJ+Q3ItS5KvnNE9p8zjvz1rpCnGl7ymorN4Fz5N/5qLLwpbRMe48F1lHFWvyCLKtZR3MU/RzhN/M4EwTbB2wdMGEem9l+3lvH3Yz2Mi7Y3n0g/CCO+aXCw5smm7Hu/34nHj53WWvT94eKaX9FG7F23awlfHLwtq1N6FFEpDRVfELzn1c8vC6FY5uOIr5KGm/Q7J+b6fNyvItt81fWoXIM0GAfBfzUyiQNbuwfofqjXqvTlxLrKkvzzDDVvxN1ca68d1C7+W1TN6EbtL8NXNXKcUJn6VE21LmXc9VO2Mm56ro/vkh+jJrO+A9Vx6jZCNGd7KPUbITq3Me5w/R8o+oE3f6S8qDmZkqfcQN1/gFCLxrMgS3bNQAAAABJRU5ErkJggg==",
//         }}
//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 20,
//         }}
//       />

//       {/*  Sub Dis */}
//       <View
//         style={{
//           flex: 1,
//           marginLeft: 5,
//           borderColor: Color.textLight,
//         }}
//       >
//         {/* Name */}
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             flex: 1,
//           }}
//         >
//           <Text
//             style={{ fontSize: 14, fontWeight: 500, flex: 1 }}
//             numberOfLines={1}
//           >
//             {subDisItem?.subUsername || "Người dùng"}
//           </Text>
//           {/*
//           <Text
//             style={{
//               fontWeight: "300",
//               fontSize: 12,
//               // width: 90,
//               alignSelf: "flex-start",
//             }}
//           >
//             {moment(subDisItem.subUpdateAt).format("YYYY-MM-DD HH:mm")}
//           </Text> */}

//           {/* Menu Delete Of Sub */}
//           {detailUser.id == subDisItem.subUserId && (
//             <Menu>
//               <MenuTrigger>
//                 <Icons
//                   size={20}
//                   name={"more-vertical"}
//                   icon={icons.Feather}
//                   style={{ marginRight: 8 }}
//                 />
//               </MenuTrigger>
//               <MenuOptions
//                 optionsContainerStyle={{ width: 100 }}
//                 customStyles={{
//                   optionWrapper: {
//                     paddingTop: 10,
//                     paddingHorizontal: 10,
//                   },
//                 }}
//               >
//                 <MenuOption
//                   onSelect={() => {
//                     Alert.alert(
//                       "Xóa",
//                       "Bạn có chắc muốn xóa phần bình luận này",
//                       [{ text: "Yes", onPress: deleteSubDis }, { text: "No" }],
//                       { cancelable: true }
//                     );
//                   }}
//                 >
//                   <Text style={{ color: "red" }}>Xóa</Text>
//                 </MenuOption>
//                 <MenuOption
//                   onSelect={() => alert(`Not called`)}
//                   disabled={true}
//                   text="Sửa //TODO"
//                 />
//               </MenuOptions>
//             </Menu>
//           )}
//         </View>

//         {/* Main Discussion */}
//         <Text style={{ fontSize: 14, fontWeight: 400 }}>
//           {subDisItem?.subContent}
//         </Text>

//         {/* Discussion  Option*/}
//         <View
//           style={{
//             flexDirection: "row",
//             marginTop: 0,
//             borderColor: Color.textLight,
//           }}
//         >
//           {/* reply Icon */}
//           {/* <IconLabelButton
//             containerStyle={{
//               paddingHorizontal: 0,
//               paddingVertical: 0,
//             }}
//             iconStyle={{ width: 20, height: 20 }}
//             labelStyle={{
//               marginLeft: 3,
//               color: Color.black,
//               fontWeight: "400",
//               fontSize: 14,
//             }}
//             icon={<Icons size={20} name={"reply"} icon={icons.Octicons} />}
//           /> */}

//           {/* Date */}
//           <Text
//             style={{
//               flex: 1,
//               textAlign: "right",
//               fontWeight: "300",
//               fontSize: 11,
//             }}
//           >
//             {moment(subDisItem.subUpdateAt).format("YYYY-MM-DD HH:mm")}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const DiscussionTextInput = ({
//   handleEffect,
//   placeholder,
//   inputTextDiscussionStyle,
//   productId,
//   mainDiscussionId,
// }) => {
//   const [discussionValue, setDiscussionValue] = useState("");

//   const saveDiscussion = async () => {
//     console.log("saveDiscussion");
//     if (!checkStringEmpty(discussionValue)) {
//       if (
//         mainDiscussionId == undefined &&
//         productId != undefined &&
//         productId != ""
//       ) {
//         await saveMainDiscussion(productId);
//         await handleEffect();
//         setDiscussionValue("");
//       } else if (mainDiscussionId != undefined && mainDiscussionId != null) {
//         await saveSubDiscussion(mainDiscussionId);
//         await handleEffect();
//         setDiscussionValue("");
//       }
//     }
//   };

//   const saveMainDiscussion = async (productIds) => {
//     const data = {
//       productId: productIds,
//       mainContent: discussionValue,
//     };

//     const a = await apiPost(CREATE_NEW_DISCUSSION, data, {}, true)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((error) => {
//         // console.log(error);
//         showError(error.error_message);
//         console.log(error);
//       });
//   };

//   const saveSubDiscussion = async (mainDiscussionId) => {
//     const data = {
//       mainDisId: mainDiscussionId,
//       subContent: discussionValue,
//     };

//     const a = await apiPost(CREATE_NEW_SUB_DISCUSSION, data, {}, true)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((error) => {
//         showError(error.error_message);
//         console.log(error);
//       });
//   };

//   return (
//     <View
//       style={{
//         ...styles.inputTextDiscussionStyle,
//         ...inputTextDiscussionStyle,
//       }}
//     >
//       <TextInput
//         style={{ flex: 1 }}
//         multiline
//         placeholder={placeholder}
//         placeholderTextColor={Color.mainColor}
//         value={discussionValue}
//         onChangeText={setDiscussionValue}
//       />
//       {/* TouchableWithoutFeedback */}
//       {/* <TouchableWithoutFeedback */}
//       <TouchableOpacity
//         style={{
//           width: 60,
//           height: 60,
//           // borderWidth: 5,
//           alignSelf: "center",
//           justifyContent: "center",
//           alignItems: "center",
//           // marginHorizontal: 10,
//         }}
//         onPress={() => {
//           saveDiscussion();
//         }}
//       >
//         <Icons
//           icon={icons.Ionicons}
//           color={Color.mainColor}
//           name={"ios-send"}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

export default DetailDiscussion;

const IconLabelButton = ({
  containerStyle,
  icon,
  iconStyle,
  label,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 5,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {icon}

      <Text style={{ marginLeft: 5, fontSize: 14, fontWeight: 600 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputTextDiscussionStyle: {
    flexDirection: "row",
    backgroundColor: Color.white,
    height: 80,
    paddingHorizontal: 10,
    // paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
});
