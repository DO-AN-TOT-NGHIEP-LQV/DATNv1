import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import colors from "../constans/Color";
import { useNavigation } from "@react-navigation/native";
import Color from "../constans/Color";
import CustomButton from "../components/CustomButton/index.js";
import { ActivityIndicator, Button } from "react-native-paper";
import InputFieldCustom from "../components/InputFieldCustom";
import { showError, showSuccess } from "../ultils/messageFunction";
import { validatorCreatePost } from "../ultils/validations";
import { apiPost } from "../ultils/utilsApi";
import { CREATE_NEW_PRODUCT, CREATE_POST } from "../config/urls";
import * as Progress from "react-native-progress";
import Icons, { icons } from "../components/Icons";
import { getFileExtension } from "../ultils/helperFunction";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CreatePostScreen = () => {
  const navigation = useNavigation();

  const [pickedImagePath, setPickedImagePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUris, setImageUris] = useState([]);

  // const [post, setPost] = useState({
  //   content: "dsd",
  //   title: "324343",
  // });

  const [post, setPost] = useState({
    name: "Fila 2",
    description: "Fila den dovien trang chinh hang",
    quantity: 100,
    price: 56000,
    type: "AB",
    brand: "Adidas",
    shop_id: 1,
  });
  const { content, size, type, price, title } = post;
  const updatePost = (data) => setPost(() => ({ ...post, ...data }));

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setPickedImagePath(result.assets[0].uri);
      // updateState({ username })
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
    }
  };

  const addMoreImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      multiline: true,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      if (imageUris.length + result.assets.length > 5) {
        alert("You can select up to 5 images.");
        return;
      }

      const newUris = result.assets
        .filter((asset) => !imageUris.includes(asset.uri))
        .map((asset) => asset.uri);
      setImageUris([...imageUris, ...newUris]);

      if (imageUris.length + result.assets.length > 5) {
        alert("You can select up to 5 images.");
        return;
      }
    }
  };

  const isValidData = () => {
    const error = validatorCreatePost({
      pickedImagePath: pickedImagePath,
      content,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  // const createNewPost = () => {
  //   const checkValid = isValidData();
  //   if (checkValid) {
  //     setLoading(true);
  //     // fetch API
  //     var formData = new FormData();
  //     formData.append("post", JSON.stringify(post));
  //     formData.append("fileImage", {
  //       uri: pickedImagePath, // Đường dẫn đến file
  //       type: "image/jpeg", // Loại file
  //       name: "name", // Tên file
  //     });

  //     var headers = {
  //       "Content-type": "multipart/form-data",
  //     };

  //     apiPost(CREATE_POST, formData, headers, true)
  //       .then((res) => {
  //         console.log(res.data);
  //         setLoading(false);
  //         showSuccess("Đã tải anh thành công");
  //       })
  //       .catch((error) => {
  //         showError(error.error_message);
  //         setLoading(false);
  //       });
  //   }
  // };

  const createNewPost = () => {
    const checkValid = isValidData();
    if (checkValid) {
      setLoading(true);
      // fetch API

      const fileUri = pickedImagePath;
      const fileName = fileUri.split("/").pop(); // Lấy tên tệp từ đường dẫn
      const fileExtension = getFileExtension(fileName);

      var formData = new FormData();
      formData.append("product", JSON.stringify(post));
      formData.append("fileImage", {
        uri: fileUri, // Đường dẫn đến file
        type: `image/${fileExtension}`,
        name: fileName, // Tên file
      });

      var headers = {
        "Content-type": "multipart/form-data",
      };

      apiPost(CREATE_NEW_PRODUCT, formData, headers, true)
        .then((res) => {
          setLoading(false);
          showSuccess("Success!");
        })
        .catch((error) => {
          showError(error.error_message);
          setLoading(false);
        });
    }
  };

  const renderAddButton = () => {
    return (
      <TouchableOpacity
        onPress={() => addMoreImage()}
        style={{
          ...styles.ingredientItemWrapper,
          borderWidth: 1,
          borderColor: "#333333",
        }}
      >
        <View
          style={{
            ...styles.ingredientImage,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black" }}>More</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <CustomGradient>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F2F1FD",
      }}
    >
      {loading && (
        <>
          <Progress.Bar
            progress={0.9}
            indeterminate={true}
            width={windowWidth}
            borderColor={Color.blueMain}
            color={Color.blueMain}
            height={4}
            style={{ position: "absolute" }}
            borderRadius={0}
            borderWidth={0}
          />
          <View
            style={{
              position: "absolute",
              top: 4,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color="white" />
          </View>
          {/* <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View> */}
        </>
      )}

      {/* {Header} */}
      <View style={[styles.headerWrapper, styles.shadowTouch]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.headerLeft}>
            <Icons
              icon={icons.Feather}
              size={12}
              color={colors.black}
              name={"chevron-left"}
            />
          </View>
        </TouchableOpacity>

        <View
          style={styles.headerRight}
          // className=" w-12 h-12 bg-gray-400 rounded-md  "
        >
          <CustomButton
            // isLoading={isLoading}
            loading={loading}
            label="Create New"
            onPress={() => createNewPost()}
          />
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          {!pickedImagePath ? (
            <TouchableOpacity
              style={{
                ...styles.shadowTouch,
                justifyContent: "center",
                alignItems: "center",
                width: (windowWidth * 4) / 5,
                height: (windowHeight * 1) / 5,
                borderRadius: 15,
                borderColor: Color.darkGray,
                backgroundColor: Color.white,
                borderWidth: 1,
              }}
            >
              <Text>Add Image</Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{ uri: pickedImagePath }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: (windowWidth * 4) / 5,
                height: (windowHeight * 1) / 5,
                borderRadius: 15,
                borderColor: Color.black,
                backgroundColor: Color.white,
                borderWidth: 1,
              }}
            />
          )}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            icon="camera"
            mode="contained"
            onPress={() => openCamera()}
            style={{ marginRight: 20 }}
          >
            Camera
          </Button>
          <Button
            icon="image-multiple"
            mode="outlined"
            onPress={() => showImagePicker()}
            style={{ backgroundColor: "white" }}
          >
            Gallery
          </Button>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Content"
          multiline={true}
          numberOfLines={4}
          autoCorrect={true}
          onChangeText={(content) => updatePost({ content })}
          // onSubmitEditing={}
          // placeholderTextColor="#657786"
        />

        {/* <SafeAreaView>
                  <View style={styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <View style={styles.headerLeft}>
                        <Feather name="chevron-left" size={12} color={colors.black} />
                      </View>
                    </TouchableOpacity>
                    <View>
                        <Text className="text-[28px] text-[#0B646B] font-bold">Create New</Text>
                    </View>

                    <View style={styles.headerRight}  className=" w-12 h-12 bg-gray-400 rounded-md  ">
                          <Image
                            source={Avatar}
                            className="w-full h-full rounded "
                            resizeMode="cover"
                          >
                          </Image>
                    </View>

                  </View>
            </SafeAreaView> */}

        {/* Detail info */}
        <View style={styles.infoWrapper}>
          {/* <View style={styles.infoLeftWrapper}> */}
          <View style={styles.infoItemWrapper}>
            <Text style={styles.infoItemTitle}>Size</Text>
            <InputFieldCustom
              label="Size"
              styleView={{
                paddingBottom: 0,
                marginBottom: 10,
              }}
              // placeholder="enter your username"
              // value={username}
              // onChangeText={(username) => updateState({ username })}
            />
          </View>

          <View style={styles.infoItemWrapper}>
            <Text style={styles.infoItemTitle}>Type</Text>
            <InputFieldCustom
              label="Type"
              styleView={{
                paddingBottom: 0,
                marginBottom: 10,
              }}
            />
          </View>

          <View style={styles.infoItemWrapper}>
            <Text style={styles.infoItemTitle}>Count</Text>
            <InputFieldCustom
              label="Size"
              styleView={{
                paddingBottom: 0,
                marginBottom: 10,
              }}
              // placeholder="enter your username"
              // value={username}
              // onChangeText={(username) => updateState({ username })}
            />
          </View>

          <View style={styles.infoItemWrapper}>
            <Text style={styles.infoItemTitle}>Type</Text>
            <InputFieldCustom
              label="Type"
              styleView={{
                paddingBottom: 0,
                marginBottom: 10,
              }}
            />
          </View>
        </View>
        {/* </View> */}

        {/* Ingredients 111111 */}
        <View style={styles.ingredientsWrapper}>
          <Text style={styles.ingredientsTitle}>Ingredients</Text>
          <View style={styles.ingredientsListWrapper}>
            <FlatList
              data={imageUris}
              renderItem={renderIngredientsItem}
              keyExtractor={(item, index) => `myKey-${index}`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={
                imageUris.length < 5 ? renderAddButton : null
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    // </CustomGradient>
  );
};
export default CreatePostScreen;

const renderIngredientsItem = ({ item }) => {
  return (
    <View style={[styles.ingredientItemWrapper]}>
      <Image
        source={{ uri: item }}
        resizeMode="contain"
        style={styles.ingredientImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    // paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: colors.white,
    height: Dimensions.get("window").height / 15,
    marginHorizontal: 5,
    marginTop: 5,
  },
  headerLeft: {
    borderColor: colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    borderRadius: 10,
  },
  titleScreen: {
    textAlign: "center",
    fontSize: 20,
    color: Color.black,
    fontWeight: "bold",
  },
  titlesWrapper: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  title: {
    fontSize: 32,
    color: colors.textDark,
    width: "50%",
  },
  priceWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  priceText: {
    color: colors.price,
    fontSize: 32,
  },
  infoWrapper: {
    marginTop: 0,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoLeftWrapper: {
    paddingLeft: 20,
  },
  infoItemWrapper: {
    width: "50%",
    paddingHorizontal: "5%",
  },
  infoItemTitle: {
    fontSize: 14,
    color: colors.darkGray,
  },
  infoItemText: {
    fontSize: 18,
    color: colors.textDark,
  },
  itemImage: {
    resizeMode: "contain",
    marginLeft: 50,
  },
  ingredientsWrapper: {
    // marginTop: 40,
  },
  ingredientsTitle: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.textDark,
  },
  ingredientsListWrapper: {
    paddingVertical: 20,
  },
  ingredientItemWrapper: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 15,
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  ingredientImage: {
    resizeMode: "contain",
    width: 100,
    height: 80,
    borderRadius: 5,
  },
  orderWrapper: {
    marginTop: 60,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orderText: {
    fontSize: 14,
    marginRight: 10,
  },
  shadowTouch: {
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 2,
  },
  textInput: {
    backgroundColor: Color.white,
    borderRadius: 25,
    borderWidth: 0,
    color: "#14171A",
    fontSize: 16,
    height: 120,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: "top",
    borderColor: "#E1E8ED",
    borderWidth: 2,
  },
});
