import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Color from "../../constans/Color";
import { apiGet, apiPost } from "../../ultils/utilsApi";
import {
  CREATE_NEW_DISCUSSION,
  CREATE_NEW_SUB_DISCUSSION,
  GET_PRODUCT_DISCUSSION,
} from "../../config/urls";
import { showError } from "../../ultils/helperFunction";
import Icons, { icons } from "../Icons";
import moment from "moment";
import { checkStringEmpty } from "../../ultils/validations";

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
          console.log(res.data);
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
              // <CommentSection
              //   commentItem={item}
              //   commentOption={
              //     <View
              //       style={{
              //         paddingVertical: 10,
              //         flexDirection: "row",
              //         marginTop: 5,
              //         borderTopWidth: 1,
              //         // borderBottomWidth: 1,
              //         borderColor: Color.textLight,
              //       }}
              //     >
              //       {/* comment Icon */}
              //       <IconLabelButton
              //         containerStyle={{
              //           paddingHorizontal: 0,
              //           paddingVertical: 0,
              //         }}
              //         iconStyle={{ width: 20, height: 20 }}
              //         labelStyle={{
              //           marginLeft: 3,
              //           color: Color.black,
              //           fontWeight: "400",
              //           fontSize: 14,
              //         }}
              //         icon={
              //           <Icons
              //             size={20}
              //             name={"comment-o"}
              //             icon={icons.FontAwesome}
              //           />
              //         }
              //       />
              //       {/* reply Icon */}
              //       {/* <IconLabelButton
              //         containerStyle={{
              //           paddingHorizontal: 20,
              //           paddingVertical: 0,
              //         }}
              //         iconStyle={{ width: 20, height: 20 }}
              //         labelStyle={{
              //           marginLeft: 3,
              //           color: Color.black,
              //           fontWeight: "400",
              //           fontSize: 14,
              //         }}
              //         icon={
              //           <Icons size={20} name={"reply"} icon={icons.Octicons} />
              //         }
              //       /> */}

              //       {/* Date */}
              //       <Text
              //         style={{
              //           flex: 1,
              //           textAlign: "right",
              //           fontWeight: "300",
              //           fontSize: 12,
              //         }}
              //       >
              //         {moment(item?.mainUpdateAt).format("YYYY-MM-DD HH:mm")}
              //       </Text>
              //     </View>
              //   }
              //   reply={
              //     <View>
              //       {/*  Sub comment   */}
              //       <FlatList
              //         data={item.subComments}
              //         keyExtractor={(item) =>
              //           `keySubDiscusion-replys-${item.subId}`
              //         }
              //         renderItem={({ item, index }) => {
              //           return (
              //             <CommentSection
              //               commentItem={item}
              //               //   Sub comment Option
              //               commentOption={
              //                 <View
              //                   style={{
              //                     paddingVertical: 10,
              //                     flexDirection: "row",
              //                     marginTop: 5,
              //                     // borderTopWidth: 1,
              //                     // borderBottomWidth: 1,
              //                     // borderColor: Color.textLight,
              //                   }}
              //                 >
              //                   {/* comment Icon */}
              //                   <IconLabelButton
              //                     containerStyle={{
              //                       paddingHorizontal: 0,
              //                       paddingVertical: 0,
              //                     }}
              //                     iconStyle={{
              //                       width: 20,
              //                       height: 20,
              //                     }}
              //                     labelStyle={{
              //                       marginLeft: 3,
              //                       color: Color.black,
              //                       fontWeight: "400",
              //                       fontSize: 14,
              //                     }}
              //                     icon={
              //                       <Icons
              //                         size={20}
              //                         name={"reply"}
              //                         icon={icons.Octicons}
              //                       />
              //                     }
              //                   />

              //                   {/* Date */}
              //                   <Text
              //                     style={{
              //                       flex: 1,
              //                       textAlign: "right",
              //                       fontWeight: "300",
              //                       fontSize: 12,
              //                     }}
              //                   >
              //                     {moment(item?.mainUpdateAt).format(
              //                       "YYYY-MM-DD HH:mm"
              //                     )}
              //                   </Text>
              //                 </View>
              //               }
              //             />
              //           );
              //         }}
              //       />
              //     </View>
              //   }
              //   commentInput={
              //     <DiscussionTextInput
              //       inputTextDiscussionStyle={{
              //         height: 50,
              //         borderRadius: 50,
              //         borderTopWidth: 1,
              //         right: 0,
              //         paddingRight: 0,
              //         marginRight: 0,
              //       }}
              //       productId={dataProduct.id}
              //     />
              //   }
              // />
            );
          }}
        />
      </View>
    </View>
  );
};

export default DetailDiscussion;

const MainDiscussionSection = ({ mainDisItem, handleEffect }) => {
  const [showSubDisList, setShowSubDisList] = useState(false);
  const onToggle = () => {
    setShowSubDisList(!showSubDisList);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
        // borderColor: Color.textLight,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderColor: Color.textLight,
      }}
    >
      <Image
        source={{
          uri:
            mainDisItem?.userAvatar ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAB3CAMAAAB/s4FjAAAAIVBMVEX////f39/c3Nz09PT8/Pzk5OT4+Pjr6+vn5+fv7+/h4uE/taJXAAACkklEQVR4nO2bi5KDIAxFCwYU/v+Dt49tl62CdyqPayfnC85kQhIwXi6KoiiKoiiKoihfj8jkRWS0BowE54w11troljCdQTyYN9w15KOlishs352vMY+B2XpeGf8y01r7dZSfwXZ+tFyGjcz4sw6j7bYQH/PKV+l5tOAabwpRJpV2ZWPG9Jh2onxnGm35nwVQNma05T+keP5eUKW0h5RNZOotE+ZMdQyxdDZmGS2agFSNe6BHiyagzkSVIz8dvcNzCKGOcs8NnrZyRufssE/sjJY6dT4Gnhs8dyz4DBLV5zM6C6pM5HwBjanuhOghZJpFwZmf6kaIFmiiiwpeN3iG/q92JiocuDNPPsP3FDfaNAF1Zqp1oDLPCbyUn8sTmNog2AepnpHARkhUNW4g0yhRcX4g+5FeuMJ8Y+ccRqY696R8Dolu3Anq3Iny5zael42UUDyEfEXjRnG6Y5roUkolmq2fPCl9veJM55IzXdt+cUrn/KIM1xSaUMhn1nQudUJa5/wQTTbtJ+Q3ItS5KvnNE9p8zjvz1rpCnGl7ymorN4Fz5N/5qLLwpbRMe48F1lHFWvyCLKtZR3MU/RzhN/M4EwTbB2wdMGEem9l+3lvH3Yz2Mi7Y3n0g/CCO+aXCw5smm7Hu/34nHj53WWvT94eKaX9FG7F23awlfHLwtq1N6FFEpDRVfELzn1c8vC6FY5uOIr5KGm/Q7J+b6fNyvItt81fWoXIM0GAfBfzUyiQNbuwfofqjXqvTlxLrKkvzzDDVvxN1ca68d1C7+W1TN6EbtL8NXNXKcUJn6VE21LmXc9VO2Mm56ro/vkh+jJrO+A9Vx6jZCNGd7KPUbITq3Me5w/R8o+oE3f6S8qDmZkqfcQN1/gFCLxrMgS3bNQAAAABJRU5ErkJggg==",
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />

      {/* Name and Main COmment */}
      <View
        style={{
          flex: 1,
          marginTop: 3,
          marginLeft: 5,
          // borderColor: Color.textLight,
          // borderBottomWidth: 2,
        }}
      >
        {/* Name */}
        <Text style={{ fontSize: 14, fontWeight: 800 }}>
          {mainDisItem?.username || "Người dùng"}
        </Text>

        {/* Main Discussion */}
        <Text style={{ fontSize: 14, fontWeight: 400 }}>
          {mainDisItem?.mainContent}
        </Text>

        {/* Discussion  Option*/}
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            marginTop: 5,
            borderBottomWidth: 1,
            borderColor: Color.textLight,
          }}
        >
          {/* comment Icon */}
          <IconLabelButton
            containerStyle={{
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
            iconStyle={{ width: 20, height: 20 }}
            labelStyle={{
              marginLeft: 3,
              color: Color.black,
              fontWeight: "400",
              fontSize: 14,
            }}
            onPress={onToggle}
            icon={
              <Icons size={20} name={"comment-o"} icon={icons.FontAwesome} />
            }
          />

          {/* Date */}
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontWeight: "300",
              fontSize: 12,
            }}
          >
            {moment(mainDisItem?.mainUpdateAt).format("YYYY-MM-DD HH:mm")}
          </Text>
        </View>

        {showSubDisList && (
          <View>
            <View>
              <FlatList
                data={mainDisItem?.subComments}
                keyExtractor={(item) => `keySubDiscusion-replys-${item.subId}`}
                renderItem={({ item, index }) => {
                  return <SubDiscussionSection subDisItem={item} />;
                }}
              />
            </View>

            <DiscussionTextInput
              handleEffect={handleEffect}
              placeholder={"Phản hồi"}
              mainDiscussionId={mainDisItem.mainId}
              inputTextDiscussionStyle={{
                height: 70,
                borderRadius: 10,
                borderTopWidth: 1,
                right: 0,
                paddingRight: 0,
                marginRight: 0,
              }}
            />
          </View>
        )}
        {/* Reply Sub Discussion */}
      </View>
    </View>
  );
};

const SubDiscussionSection = ({ subDisItem }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
        borderColor: Color.textLight,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderColor: Color.textLight,
      }}
    >
      <Image
        source={{
          uri:
            subDisItem?.subUserAvatar ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAB3CAMAAAB/s4FjAAAAIVBMVEX////f39/c3Nz09PT8/Pzk5OT4+Pjr6+vn5+fv7+/h4uE/taJXAAACkklEQVR4nO2bi5KDIAxFCwYU/v+Dt49tl62CdyqPayfnC85kQhIwXi6KoiiKoiiKoihfj8jkRWS0BowE54w11troljCdQTyYN9w15KOlishs352vMY+B2XpeGf8y01r7dZSfwXZ+tFyGjcz4sw6j7bYQH/PKV+l5tOAabwpRJpV2ZWPG9Jh2onxnGm35nwVQNma05T+keP5eUKW0h5RNZOotE+ZMdQyxdDZmGS2agFSNe6BHiyagzkSVIz8dvcNzCKGOcs8NnrZyRufssE/sjJY6dT4Gnhs8dyz4DBLV5zM6C6pM5HwBjanuhOghZJpFwZmf6kaIFmiiiwpeN3iG/q92JiocuDNPPsP3FDfaNAF1Zqp1oDLPCbyUn8sTmNog2AepnpHARkhUNW4g0yhRcX4g+5FeuMJ8Y+ccRqY696R8Dolu3Anq3Iny5zael42UUDyEfEXjRnG6Y5roUkolmq2fPCl9veJM55IzXdt+cUrn/KIM1xSaUMhn1nQudUJa5/wQTTbtJ+Q3ItS5KvnNE9p8zjvz1rpCnGl7ymorN4Fz5N/5qLLwpbRMe48F1lHFWvyCLKtZR3MU/RzhN/M4EwTbB2wdMGEem9l+3lvH3Yz2Mi7Y3n0g/CCO+aXCw5smm7Hu/34nHj53WWvT94eKaX9FG7F23awlfHLwtq1N6FFEpDRVfELzn1c8vC6FY5uOIr5KGm/Q7J+b6fNyvItt81fWoXIM0GAfBfzUyiQNbuwfofqjXqvTlxLrKkvzzDDVvxN1ca68d1C7+W1TN6EbtL8NXNXKcUJn6VE21LmXc9VO2Mm56ro/vkh+jJrO+A9Vx6jZCNGd7KPUbITq3Me5w/R8o+oE3f6S8qDmZkqfcQN1/gFCLxrMgS3bNQAAAABJRU5ErkJggg==",
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />

      {/* Name and Main COmment */}
      <View
        style={{
          flex: 1,
          // marginTop: 3,
          marginLeft: 5,
          // borderTopWidth: 1,
          borderColor: Color.textLight,
        }}
      >
        {/* Name */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: 800, flex: 1 }}
            numberOfLines={1}
          >
            {subDisItem?.subUsername || "Người dùn dsfj"}
          </Text>

          <Text
            style={{
              fontWeight: "300",
              fontSize: 12,
              // width: 90,
              alignSelf: "flex-start",
            }}
          >
            {moment(subDisItem.subUpdateAt).format("YYYY-MM-DD HH:mm")}
          </Text>
        </View>

        {/* Main Discussion */}
        <Text style={{ fontSize: 14, fontWeight: 400 }}>
          {subDisItem?.subContent}
        </Text>

        {/* Discussion  Option*/}
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            marginTop: 0,
            // borderBottomWidth: 1,
            borderColor: Color.textLight,
          }}
        >
          {/* reply Icon */}
          {/* <IconLabelButton
            containerStyle={{
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
            iconStyle={{ width: 20, height: 20 }}
            labelStyle={{
              marginLeft: 3,
              color: Color.black,
              fontWeight: "400",
              fontSize: 14,
            }}
            icon={<Icons size={20} name={"reply"} icon={icons.Octicons} />}
          /> */}

          {/* Date */}
          {/* <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontWeight: "300",
              fontSize: 12,
            }}
          >
            {moment(subDisItem.subUpdateAt).format("YYYY-MM-DD HH:mm")}
          </Text> */}
        </View>
      </View>
    </View>
  );
};

const DiscussionTextInput = ({
  handleEffect,
  placeholder,
  inputTextDiscussionStyle,
  productId,
  mainDiscussionId,
}) => {
  const [discussionValue, setDiscussionValue] = useState("");

  const saveDiscussion = async () => {
    console.log("saveDiscussion");
    if (!checkStringEmpty(discussionValue)) {
      if (
        mainDiscussionId == undefined &&
        productId != undefined &&
        productId != ""
      ) {
        await saveMainDiscussion(productId);
        await handleEffect();
        setDiscussionValue("");
      } else if (mainDiscussionId != undefined && mainDiscussionId != null) {
        await saveSubDiscussion(mainDiscussionId);
        await handleEffect();
        setDiscussionValue("");
      }
    }
  };

  const saveMainDiscussion = async (productIds) => {
    const data = {
      productId: productIds,
      mainContent: discussionValue,
    };

    const a = await apiPost(CREATE_NEW_DISCUSSION, data, {}, true)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        // console.log(error);
        showError(error.error_message);
        console.log(error);
      });
  };

  const saveSubDiscussion = async (mainDiscussionId) => {
    const data = {
      mainDisId: mainDiscussionId,
      subContent: discussionValue,
    };

    const a = await apiPost(CREATE_NEW_SUB_DISCUSSION, data, {}, true)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        showError(error.error_message);
        console.log(error);
      });
  };

  return (
    <View
      style={{
        ...styles.inputTextDiscussionStyle,
        ...inputTextDiscussionStyle,
      }}
    >
      <TextInput
        style={{ flex: 1, marginRight: 5 }}
        multiline
        placeholder={placeholder}
        placeholderTextColor={Color.mainColor}
        value={discussionValue}
        onChangeText={setDiscussionValue}
      ></TextInput>

      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          // borderWidth: 1,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
        }}
        onPress={() => {
          saveDiscussion();
        }}
      >
        <Icons
          icon={icons.Ionicons}
          color={Color.mainColor}
          name={"ios-send"}
        />
      </TouchableOpacity>
    </View>
  );
};

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
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
});

// const CommentSection = ({
//   commentItem,
//   commentOption,
//   reply,
//   commentInput,
//   // showSubDisList = true,
// }) => {
//   const [showSubDisList, setShowSubDisList] = useState(false);
//   const onToggle = () => {
//     setShowSubDisList(!showSubDisList);
//   };
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         marginTop: 10,
//         borderColor: Color.textLight,
//       }}
//     >
//       <Image
//         source={{
//           uri:
//             commentItem?.userAvatar ||
//             commentItem?.subUserAvatar ||
//             "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAB3CAMAAAB/s4FjAAAAIVBMVEX////f39/c3Nz09PT8/Pzk5OT4+Pjr6+vn5+fv7+/h4uE/taJXAAACkklEQVR4nO2bi5KDIAxFCwYU/v+Dt49tl62CdyqPayfnC85kQhIwXi6KoiiKoiiKoihfj8jkRWS0BowE54w11troljCdQTyYN9w15KOlishs352vMY+B2XpeGf8y01r7dZSfwXZ+tFyGjcz4sw6j7bYQH/PKV+l5tOAabwpRJpV2ZWPG9Jh2onxnGm35nwVQNma05T+keP5eUKW0h5RNZOotE+ZMdQyxdDZmGS2agFSNe6BHiyagzkSVIz8dvcNzCKGOcs8NnrZyRufssE/sjJY6dT4Gnhs8dyz4DBLV5zM6C6pM5HwBjanuhOghZJpFwZmf6kaIFmiiiwpeN3iG/q92JiocuDNPPsP3FDfaNAF1Zqp1oDLPCbyUn8sTmNog2AepnpHARkhUNW4g0yhRcX4g+5FeuMJ8Y+ccRqY696R8Dolu3Anq3Iny5zael42UUDyEfEXjRnG6Y5roUkolmq2fPCl9veJM55IzXdt+cUrn/KIM1xSaUMhn1nQudUJa5/wQTTbtJ+Q3ItS5KvnNE9p8zjvz1rpCnGl7ymorN4Fz5N/5qLLwpbRMe48F1lHFWvyCLKtZR3MU/RzhN/M4EwTbB2wdMGEem9l+3lvH3Yz2Mi7Y3n0g/CCO+aXCw5smm7Hu/34nHj53WWvT94eKaX9FG7F23awlfHLwtq1N6FFEpDRVfELzn1c8vC6FY5uOIr5KGm/Q7J+b6fNyvItt81fWoXIM0GAfBfzUyiQNbuwfofqjXqvTlxLrKkvzzDDVvxN1ca68d1C7+W1TN6EbtL8NXNXKcUJn6VE21LmXc9VO2Mm56ro/vkh+jJrO+A9Vx6jZCNGd7KPUbITq3Me5w/R8o+oE3f6S8qDmZkqfcQN1/gFCLxrMgS3bNQAAAABJRU5ErkJggg==",
//         }}
//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 20,
//         }}
//       />

//       {/* Name and Main COmment */}
//       <View style={{ flex: 1, marginTop: 3, marginLeft: 5 }}>
//         {/* Name */}
//         <Text style={{ fontSize: 14, fontWeight: 800 }}>
//           {commentItem?.username || commentItem?.subUsername || "Người dùng"}
//         </Text>

//         {/* Main Discussion */}
//         <Text style={{ fontSize: 14, fontWeight: 400 }}>
//           {commentItem?.mainContent || commentItem?.subContent}
//         </Text>

//         {/* Discussion  Option*/}
//         {commentOption}

//         {/* Reply Sub Discussion */}
//         {showSubDisList && reply}

//         {/* Comment input */}
//         {showSubDisList && commentInput}
//         {/* {commentInput} */}
//       </View>
//     </View>
//   );
// };
