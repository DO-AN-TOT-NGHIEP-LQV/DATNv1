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
  ImageBackground,
  Pressable,
} from "react-native";
import { Fragment, useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Button, Modal } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Color from "../../constans/Color";
import { ShoesFLas } from "../../public/assets";
import Icons, { icons } from "../../components/Icons";
import CustomButton from "../../components/CustomButton/index.js";
import LineDivider from "../../components/LineDivider";
import { FONTS, SIZES, spacing } from "../../constans/Theme";
import ProductValue from "../../components/SalerManager/ProductValue";
import ModalInputText from "../../components/SalerManager/ModalInputText";
import ModalInputNumber from "../../components/SalerManager/ModalInputNumber";
import openWebLink from "../../hookFuntion/openWebLink";
import InputModal from "../../components/InputModal";
import { typeList } from "../../constans/raw";
import { TypeCard } from "../../components/Home";
import { showError, showSuccess } from "../../ultils/messageFunction";
import ModalInputBrand from "../../components/SalerManager/ModalInputBrand";
import {
  ADD_PRODUCT_TO_SHOP,
  CREATE_NEW_PRODUCT,
  GET_PRODUCT_BY_ID,
} from "../../config/urls";
import { validatorAddShopProduct } from "../../ultils/validations";
import { error } from "is_js";
import { getFileExtension } from "../../ultils/helperFunction";
import { apiGet, apiPost } from "../../ultils/utilsApi";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { ProfileEdit, ProfileValue } from "../../components/Profile";
import { Calculator, PriceVND } from "../../public/assets/icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ShopCreateProduct = ({ route }) => {
  const productId = route.params?.productId;
  const detailUser = useSelector((state) => state.auth.detailUser);
  const shopId = detailUser?.shop_id || undefined;
  const [product, setProduct] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
      tabBarVisible: false,
    });

    return () => {
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      setProduct(null);
    };
  }, [navigation]);

  const [loading, setLoading] = useState(false);

  const [productShopForm, setProductShopForm] = useState({
    productId: productId,
    shopId: shopId,
    price: 0,
    link: "",
    quantity: 0,
  });

  const { price, link, quantity } = productShopForm;

  const updateProductShopForm = (data) =>
    setProductShopForm(() => ({ ...productShopForm, ...data }));

  ///////////////////////////////////////////////
  const [isShowModal, setShowModal] = useState({
    priceModal: false,
    linkModal: false,
    quantityModal: false,
  });

  const { priceModal, linkModal, quantityModal } = isShowModal;

  const updateIsShowModal = (data) =>
    setShowModal(() => ({ ...isShowModal, ...data }));

  const fetchData = async () => {
    //   setLoading(true);
    var headers = {
      "Content-Type": "application/json",
    };

    var data = {
      params: {
        productId: productId,
      },
    };
    await apiGet(GET_PRODUCT_BY_ID, data, headers, false)
      .then((res) => {
        console.log("GET_PRODUCT_BY_ID");
        setProduct(res.data);
      })
      .catch((error) => {
        showError(error.error_message);
      });

    //   setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  function renderHeader() {
    const isValidData = () => {
      const error = validatorAddShopProduct(productShopForm);
      if (error) {
        showError(error);
        return false;
      }
      return true;
    };

    const addProductVentor = async () => {
      setLoading(true);
      const checkValid = isValidData();
      try {
        if (checkValid) {
          var headers = {
            "Content-type": "application/json",
          };

          await apiPost(ADD_PRODUCT_TO_SHOP, productShopForm, headers, true)
            .then((res) => {
              setLoading(false);
              showSuccess("Success!");
            })
            .catch((error) => {
              showError(error.error_message);
              setLoading(false);
            });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    return (
      <Header
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: Color.textLight,
              borderRadius: SIZES.radius,
              backgroundColor: Color.whileOpacity,
            }}
            onPress={() =>
              //  navigation.goBack()
              navigation.navigate("ShopTab", { screen: "ShopMainScreen" })
            }
          >
            <View style={styles.headerLeft}>
              <Icons
                icon={icons.Feather}
                size={12}
                color={Color.black}
                name={"chevron-left"}
              />
            </View>
          </TouchableOpacity>
        }
        rightComponent={
          <CustomButton
            loading={loading}
            label="Hoàn tất"
            onPress={() => addProductVentor()}
            // styleContainer={{ height: 35 }}
            textStyle={{ lineHeight: 18 }}
          />
        }
      ></Header>
    );
  }

  function renderProfileUser() {
    return (
      <View style={styles.profileSessionContainer}>
        <ProfileValue
          label={"Giá"}
          value={price}
          icon={
            <Image
              source={PriceVND}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
          onPress={() => {
            updateIsShowModal({ priceModal: true });
          }}
        />
        <LineDivider />

        <ProfileValue
          label={"Liên kết"}
          value={link}
          icon={
            <View>
              <Icons
                size={20}
                name={"link-outline"}
                icon={icons.Ionicons}
                color={Color.mainColor}
              />
            </View>
          }
          onPress={() => {
            updateIsShowModal({ linkModal: true });
          }}
        >
          <CustomButton
            label={"Kiểm tra"}
            onPress={() => {
              link ? openWebLink(link) : null;
            }}
            styleContainer={{
              backgroundColor: Color.transparent,
              marginRight: 5,
            }}
            textStyle={{ color: Color.mainColor }}
          />
        </ProfileValue>
        <LineDivider />

        <ProfileValue
          label={"Số lượng"}
          value={quantity}
          icon={
            <Image
              source={Calculator}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
          onPress={() => {
            updateIsShowModal({ quantityModal: true });
          }}
        />
        {/* <LineDivider /> */}
      </View>
    );
  }

  function renderProductChose() {
    const productType = typeList.find((tag) => tag.value === product?.type);
    return (
      <Pressable
        style={{
          //   backgroundColor: "rgba(242, 241, 253, 1)",
          backgroundColor: "#e5f8ed",
          alignItems: "center",
          borderRadius: SIZES.radius,
          borderColor: Color.textLight,
          backgroundColor: Color.white,
          ...styles.shadow,
          marginHorizontal: SIZES.font,
          padding: SIZES.padding,
          marginVertical: SIZES.padding,
          // marginTop: 18,
          backgroundColor: Color.white,
          height: (windowHeight * 2) / 5,
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            ...styles.cartProductContainer,
            backgroundColor: Color.white,
            paddingVertical: 10,
            height: "50%",
          }}
        >
          <View
            style={{
              height: 120,
              width: 120,
              marginHorizontal: 20,
            }}
          >
            <Image
              source={
                product?.images[0]?.url
                  ? { uri: product?.images[0]?.url }
                  : ShoesFLas
              }
              resizeMode="contain"
              style={styles.images}
            />
          </View>

          <View
            style={{
              flex: 1,
              height: "100%",
              justifyContent: "center",
              paddingRight: 5,
              //   borderWidth: 1,
            }}
          >
            <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
              {`Id:   `} {product?.id}
            </Text>

            <Text style={{ ...FONTS.h4, height: 50 }} numberOfLines={2}>
              {`Tên: `}
              <Text
                numberOfLines={2}
                style={{ ...FONTS.h4, color: Color.gray }}
              >
                {product?.name} dfsdfsdf ffdsfsdf sdf
              </Text>
            </Text>
            <Text
              style={{ ...FONTS.h3, color: Color.blueSd }}
              numberOfLines={1}
            >
              {product?.price}
            </Text>

            <View
              style={{
                alignSelf: "flex-end",
                // flex: 1,
              }}
            >
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 10,
                  fontWeight: "normal",
                  color: Color.gray,
                }}
              >
                {product?.createdAt}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: "50%",
            width: "100%",
            borderRadius: SIZES.radius,
            padding: 5,
            marginVertical: 5,
            backgroundColor: Color.darkGray2,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              paddingHorizontal: 0,
              // margin: 0,
              // height: 40,
              flexDirection: "row",
              // overflow: "hidden",
              // borderWidth: 1,
            }}
            contentContainerStyle={{
              paddingHorizontal: 0,
              // margin: 0,
              // paddingVertical: 2,
              // height: "5/0%",
              // flexDirection: "row",
              // alignItems: "baseline",
              // overflow: "hidden",
            }}
          >
            <TypeCard
              type={productType}
              imageStyle={{
                opacity: 0.2,
              }}
              containerStyle={{
                height: 30,
                width: "100%",
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginRight: 15,
                borderRadius: 8,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
              textStyle={{
                color: Color.black,
                fontSize: 14,
                ...FONTS.h4,
              }}
            />

            {product?.brand && (
              <TouchableOpacity
                style={{
                  height: 30,
                  marginLeft: 10,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: Color.mainColor,
                  borderWidth: 1,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: Color.mainColor,
                    fontSize: 14,
                    ...FONTS.h4,
                  }}
                >
                  {product?.brand}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          <Text style={{ ...FONTS.h4, marginVertical: 0, marginTop: 1 }}>
            Miêu tả:
          </Text>
          <ScrollView
            style={{
              height: "60%",
            }}
          >
            <Text
              style={{
                // color: Color.textLight,
                ...FONTS.body4,
              }}
            >
              {product?.description}
            </Text>
          </ScrollView>

          {/* Phần mô tả */}
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Color.mainTheme,
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
            style={{
              position: "absolute",
              top: spacing.statusbarHeight,
              zIndex: 10,
            }}
            borderRadius={0}
            borderWidth={0}
          />
          <View
            style={{
              position: "absolute",
              top: spacing.statusbarHeight + 3,
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
            <Text style={{ color: Color.white, alignItems: "center" }}>
              Quá trình này có thể mất vài phút, xin hãy giữ kết nối
            </Text>
          </View>
        </>
      )}

      {/* {Header} */}
      {renderHeader()}

      {/* Image */}
      {renderProductChose()}

      {renderProfileUser()}

      {priceModal && (
        <ModalInputNumber
          isVisible={priceModal}
          label={"Giá sản phẩm"}
          onClose={() => {
            updateIsShowModal({ priceModal: false });
          }}
          value={price}
          onPress={(value) => updateProductShopForm({ price: value })}
          isInteger={false}
        />
      )}

      {linkModal && (
        <ModalInputText
          isVisible={linkModal}
          label={"Link sản phẩm"}
          onClose={() => {
            updateIsShowModal({ linkModal: false });
          }} // value={link || "https://shopee.vn/ruby_store.88"}
          value={link || "https://"}
          maxLength={500}
          onPress={(link) => {
            updateProductShopForm({ link: link });
          }}
        />
      )}

      {quantityModal && (
        <ModalInputNumber
          isVisible={quantityModal}
          label={"Số lượng"}
          onClose={() => {
            updateIsShowModal({ quantityModal: false });
          }}
          value={quantity}
          onPress={(quantity) => updateProductShopForm({ quantity: quantity })}
          isInteger={true}
        />
      )}
    </SafeAreaView>
  );
};

export default ShopCreateProduct;

const styles = StyleSheet.create({
  headerLeft: {
    borderColor: Color.textLight,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },
  header: {
    height: 75,
    width: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileSessionContainer: {
    marginHorizontal: SIZES.font,
    paddingHorizontal: SIZES.title,
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
    backgroundColor: Color.white,

    borderWidth: 1,
  },

  imagePickerStyle: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: (windowWidth * 4) / 5,
    height: (windowHeight * 1) / 5,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.blueSd,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    alignItems: "baseline",
  },
  tagType: {
    margin: 2,
    borderRadius: 8,
  },
  TopTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cartProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
  },
  shadow: {
    shadowColor: Color.mainTheme,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  images: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    borderColor: Color.black,
  },
  selectedTag: {
    // paddingHorizontal: 4,
    // margin: 4,
    // marginHorizontal: 4,
    backgroundColor: Color.whiteColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.mainColor,
    height: 30,
    // width: "100%",
    // paddingVertical: 0,
    // paddingHorizontal: 0,
    marginRight: 15,
    borderRadius: 8,
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
  },
});

// import {
//   SafeAreaView,
//   Image,
//   TextInput,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Dimensions,
//   TouchableOpacity,
//   ImageBackground,
//   Pressable,
// } from "react-native";
// import { Fragment, useEffect, useState } from "react";
// import * as Progress from "react-native-progress";
// import { useNavigation } from "@react-navigation/native";
// import { ActivityIndicator, Button, Modal } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker";
// import Color from "../../constans/Color";
// import { ShoesFLas } from "../../public/assets";
// import Icons, { icons } from "../../components/Icons";
// import CustomButton from "../../components/CustomButton/index.js";
// import LineDivider from "../../components/LineDivider";
// import { FONTS, SIZES, spacing } from "../../constans/Theme";
// import ProductValue from "../../components/SalerManager/ProductValue";
// import ModalInputText from "../../components/SalerManager/ModalInputText";
// import ModalInputNumber from "../../components/SalerManager/ModalInputNumber";
// import openWebLink from "../../hookFuntion/openWebLink";
// import InputModal from "../../components/InputModal";
// import { typeList } from "../../constans/raw";
// import { TypeCard } from "../../components/Home";
// import { showError, showSuccess } from "../../ultils/messageFunction";
// import ModalInputBrand from "../../components/SalerManager/ModalInputBrand";
// import { CREATE_NEW_PRODUCT, GET_PRODUCT_BY_ID } from "../../config/urls";
// import { validatorCreateProduct } from "../../ultils/validations";
// import { error } from "is_js";
// import { getFileExtension } from "../../ultils/helperFunction";
// import { apiGet, apiPost } from "../../ultils/utilsApi";
// import Header from "../../components/Header";
// import { useSelector } from "react-redux";
// import { ProfileEdit, ProfileValue } from "../../components/Profile";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// const ShopCreateProduct = ({ route }) => {
//   //   const shopId = route.params?.shopId;
//   const productId = route.params?.productId;
//   const detailUser = useSelector((state) => state.auth.detailUser);
//   const shopId = detailUser?.shop_id || undefined;
//   const [product, setProduct] = useState(null);

//   const navigation = useNavigation();
//   useEffect(() => {
//     navigation.getParent()?.setOptions({
//       tabBarStyle: { display: "none" },
//       tabBarVisible: false,
//     });
//     return () =>
//       navigation
//         .getParent()
//         ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
//   }, [navigation]);

//   //   const [pickedImagePath, setPickedImagePath] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [name, setName] = useState("FFX-007034");
//   const [description, setDescription] = useState("Mieu ta so lươc");
//   const [price, setPrice] = useState(100000);
//   const [link, setLink] = useState("https://shopee.vn/ruby_store.88");
//   const [type, setType] = useState("Sandals");
//   const [quantity, setQuantity] = useState(0);
//   const [brand, setBrand] = useState("Ad");

//   const [nameModal, setNameModal] = useState(false);
//   const [descriptionModal, setDescriptionModal] = useState(false);
//   const [priceModal, setPriceModal] = useState(false);
//   const [linkModal, setLinkModal] = useState(false);
//   const [typeModal, setTypeModal] = useState(false);
//   const [quantityModal, setQuantityModal] = useState(false);
//   const [brandModal, setBrandModal] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       //   setLoading(true);
//       var headers = {
//         "Content-Type": "application/json",
//       };

//       var data = {
//         params: {
//           productId: productId,
//         },
//       };
//       await apiGet(GET_PRODUCT_BY_ID, data, headers, false)
//         .then((res) => {
//           console.log("GET_PRODUCT_BY_ID");
//           setProduct(res.data);
//         })
//         .catch((error) => {
//           showError(error.error_message);
//         });

//       //   setLoading(false);
//     };

//     fetchData();
//   }, []);

//   function renderHeader() {
//     const product = {
//       name,
//       description,
//       price,
//       quantity,
//       type,
//       brand,
//       link,
//       //   pickedImagePath,
//       //   shop_id: shopId,
//     };
//     const isValidData = () => {
//       const error = validatorCreateProduct(product);
//       if (error) {
//         showError(error);
//         return false;
//       }
//       return true;
//     };

//     const createNewProduct = async () => {
//       setLoading(true);
//       const checkValid = isValidData();
//       try {
//         // if (checkValid) {
//         //   const fileUri = pickedImagePath;
//         //   const fileName = fileUri.split("/").pop(); // Lấy tên tệp từ đường dẫn
//         //   const fileExtension = getFileExtension(fileName);

//         //   var formData = new FormData();
//         //   formData.append("product", JSON.stringify(product));
//         //   formData.append("fileImage", {
//         //     uri: fileUri, // Đường dẫn đến file
//         //     type: `image/${fileExtension}`,
//         //     name: fileName, // Tên file
//         //   });

//         //   var headers = {
//         //     "Content-type": "multipart/form-data",
//         //   };

//         //   console.log(product);

//         //   await apiPost(CREATE_NEW_PRODUCT, formData, headers, true)
//         //     .then((res) => {
//         //       setLoading(false);
//         //       showSuccess("Success!");
//         //     })
//         //     .catch((error) => {
//         //       showError(error.error_message);
//         //       setLoading(false);
//         //     });
//         // }
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };

//     return (
//       <Header
//         leftComponent={
//           <TouchableOpacity
//             style={{
//               width: 40,
//               height: 40,
//               alignItems: "center",
//               justifyContent: "center",
//               borderWidth: 1,
//               borderColor: Color.textLight,
//               borderRadius: SIZES.radius,
//               backgroundColor: Color.whileOpacity,
//             }}
//             onPress={() => navigation.goBack()}
//           >
//             <View style={styles.headerLeft}>
//               <Icons
//                 icon={icons.Feather}
//                 size={12}
//                 color={Color.black}
//                 name={"chevron-left"}
//               />
//             </View>
//           </TouchableOpacity>
//         }
//         rightComponent={
//           <CustomButton
//             loading={loading}
//             label="Hoàn tất"
//             onPress={() => createNewProduct()}
//             // styleContainer={{ height: 35 }}
//             textStyle={{ lineHeight: 18 }}
//           />
//         }
//       ></Header>
//     );
//   }

//   function renderProfileUser() {
//     return (
//       <View style={styles.profileSessionContainer}>
//         <ProfileValue iconName={"user"} label={"Giá"} />
//         <LineDivider />

//         <ProfileValue iconName={"mail"} label={"Số lượng"} />

//         <LineDivider />

//         <ProfileValue iconName={"lock"} iconSize={22} label={"Link"} />
//       </View>
//     );
//   }

//   //   function renderImageChose() {
//   //     const showImagePicker = async () => {
//   //       // Ask the user for the permission to access the media library
//   //       const permissionResult =
//   //         await ImagePicker.requestMediaLibraryPermissionsAsync();

//   //       if (permissionResult.granted === false) {
//   //         alert("You've refused to allow this app to access your photos!");
//   //         return;
//   //       }

//   //       const result = await ImagePicker.launchImageLibraryAsync({
//   //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   //         allowsEditing: true,
//   //         aspect: [4, 3],
//   //         quality: 1,
//   //       });

//   //       if (!result.canceled) {
//   //         console.log(result.assets);
//   //         setPickedImagePath(result.assets[0].uri);
//   //       }
//   //     };

//   //     // This function is triggered when the "Open camera" button pressed
//   //     const openCamera = async () => {
//   //       // Ask the user for the permission to access the camera
//   //       const permissionResult =
//   //         await ImagePicker.requestCameraPermissionsAsync();

//   //       if (permissionResult.granted === false) {
//   //         alert("You've refused to allow this app to access your camera!");
//   //         return;
//   //       }

//   //       const result = await ImagePicker.launchCameraAsync({
//   //         allowsEditing: true,
//   //         aspect: [4, 3],
//   //         quality: 1,
//   //       });
//   //       if (!result.canceled) {
//   //         setPickedImagePath(result.assets[0].uri);
//   //       }
//   //     };

//   //     return (
//   //       <View
//   //         style={{
//   //           justifyContent: "center",
//   //           alignItems: "center",
//   //           marginVertical: 5,
//   //         }}
//   //       >
//   //         {!pickedImagePath ? (
//   //           <TouchableOpacity
//   //             style={{
//   //               ...styles.imagePickerStyle,
//   //               borderStyle: "dashed",
//   //             }}
//   //           >
//   //             <ImageBackground
//   //               source={ShoesFLas}
//   //               resizeMode="contain"
//   //               imageStyle={styles.image}
//   //               style={styles.header}
//   //             />
//   //             <Text>Thêm ảnh</Text>
//   //           </TouchableOpacity>
//   //         ) : (
//   //           <Image
//   //             source={{ uri: pickedImagePath }}
//   //             style={styles.imagePickerStyle}
//   //           />
//   //         )}

//   //         <View
//   //           style={{
//   //             flexDirection: "row",
//   //             justifyContent: "center",
//   //             marginVertical: 5,
//   //             marginTop: -25,
//   //           }}
//   //         >
//   //           <Button
//   //             icon="camera"
//   //             mode="contained"
//   //             onPress={() => openCamera()}
//   //             style={{ marginRight: 20, backgroundColor: Color.mainColor }}
//   //           >
//   //             Máy ảnh
//   //           </Button>
//   //           <Button
//   //             icon="image-multiple"
//   //             mode="outlined"
//   //             onPress={() => showImagePicker()}
//   //             style={{ backgroundColor: "white" }}
//   //             textColor={Color.mainColor}
//   //           >
//   //             Thư viện
//   //           </Button>
//   //         </View>
//   //       </View>
//   //     );
//   //   }
//   function renderProductChose() {
//     return (
//       <Pressable
//         style={{
//           //   backgroundColor: Color.mainTheme,
//           //   backgroundColor: Color.whileOpacity,
//           //   backgroundColor: "rgba(242, 241, 253, 1)",
//           backgroundColor: "#e5f8ed",
//           //   backgroundColor: Color.white,
//           backgroundColor: Color.white,
//           ...styles.cartProductContainer,
//           ...styles.shadow,
//           marginHorizontal: SIZES.font,
//           paddingHorizontal: SIZES.padding,
//           marginVertical: SIZES.padding,
//           marginTop: 18,
//           backgroundColor: Color.blackOpacity,
//         }}
//       >
//         {/* image */}
//         <View
//           style={{
//             height: 100,
//             width: 90,
//             // flex: 1,
//             justifyContent: "center",
//           }}
//         >
//           <Image
//             source={
//               product?.images[0]?.url
//                 ? { uri: product?.images[0]?.url }
//                 : ShoesFLas
//             }
//             resizeMode="contain"
//             style={styles.images}
//           />
//         </View>

//         <View
//           style={{
//             flex: 1,
//             height: "100%",
//             justifyContent: "center",
//           }}
//         >
//           <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
//             {/* {item?.shop?.sName} */}
//           </Text>

//           <Text
//             numberOfLines={2}
//             style={{ fontSize: 10, fontWeight: "normal", color: Color.gray }}
//           >
//             {`S/lượng: `}
//             <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
//               {/* {item?.shopProduct?.quantity} */}
//             </Text>
//           </Text>

//           <Text
//             numberOfLines={2}
//             style={{ fontSize: 10, fontWeight: "normal", color: Color.gray }}
//           >
//             {/* Đ/chỉ: {item?.shop?.sAddress1} Thôn 2 thái sơn điện tiến ddien ban */}
//             quang nam
//           </Text>
//         </View>

//         {/* content */}
//         <View style={{ flex: 1, marginLeft: 5 }}>
//           <View style={styles.TopTabContainer}>
//             <View style={{ flex: 1 }}>
//               {/*  Name */}
//               <Text
//                 style={{
//                   ...FONTS.h4,
//                   // height: 20,
//                   lineHeight: 20,
//                   alignItems: "flex-start",
//                 }}
//                 numberOfLines={1}
//               >
//                 {/* Id: {product?.id} */}
//               </Text>
//             </View>

//             <TouchableOpacity
//               onPress={() => {
//                 // navigation.navigate("DetailProduct", {
//                 //   dataProduct: product,
//                 //   fromManagement: true,
//                 //   previousScreen: "ManagerProductScreen",
//                 //   // shopId: shopId,
//                 // });
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 12,
//                   color: Color.mainColor,
//                   textDecorationLine: "underline",
//                   marginRight: 4,
//                 }}
//               >
//                 {/* Chế độ khách */}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.TopTabContainer}>
//             <View style={{ flex: 1 }}>
//               {/*  Name */}
//               <Text
//                 style={{
//                   fontSize: 16,
//                   lineHeight: 20,
//                   height: 40,
//                 }}
//                 numberOfLines={2}
//               >
//                 <Text style={{ ...FONTS.h4, height: 40, lineHeight: 20 }}>
//                   {`Name: `}
//                 </Text>
//                 {/* {`${product?.name}`} */}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.TopTabContainer}>
//             <Text
//               style={{
//                 ...FONTS.h3,
//                 color: Color.mainColor,
//                 justifyContent: "flex-end",
//                 alignItems: "flex-end",
//               }}
//               numberOfLines={1}
//             >
//               {/* {`đ ${product?.price}`} */}
//             </Text>
//             <Text
//               style={{
//                 flex: 1,
//                 textAlign: "right",
//                 fontWeight: "300",
//                 fontSize: 12,
//                 fontStyle: "italic",
//               }}
//             >
//               {/* {moment(product?.createdAt).format("YYYY-MM-DD HH:mm")} */}
//               saodpsd[pas]
//               {/* {moment(product?.createdAt).format("YYYY-MM-DD HH:mm")} */}
//             </Text>
//           </View>
//         </View>
//       </Pressable>
//     );
//   }
//   function renderProfileEdit() {
//     return (
//       <View
//         style={{
//           ...styles.profileSessionContainer,
//           backgroundColor: Color.white,
//           paddingBottom: 10,
//           backgroundColor: Color.whileOpacity,
//           //   marginTop: 50,
//           borderWidth: 1,
//           borderColor: Color.textLight,
//           //   borderBottomLeftRadius: 0,
//           //   borderBottomRightRadius: 0,
//         }}
//       >
//         <ProfileEdit iconName={"edit"} label={"mieu ta"} onPress={() => {}} />
//         <LineDivider />

//         <ProfileEdit
//           iconName={"account-lock-open-outline"}
//           iconsFamily={icons.MaterialCommunityIcons}
//           label={"price goc"}
//           onPress={() => {}}
//         />
//         <LineDivider />
//       </View>
//     );
//   }

//   function renderDetailField() {
//     return (
//       <View
//         style={{
//           ...styles.profileSessionContainer,
//           backgroundColor: Color.whileOpacity,
//         }}
//       >
//         <View>
//           <ProductValue
//             label={"Giá"}
//             value={price}
//             onPress={() => {
//               setPriceModal(true);
//             }}
//           />
//           <LineDivider />

//           <ProductValue
//             label={"Link sản phẩm"}
//             value={link}
//             onPress={() => {
//               setLinkModal(true);
//             }}
//           >
//             <CustomButton
//               label={"Kiểm tra"}
//               onPress={() => {
//                 link ? openWebLink(link) : null;
//               }}
//               styleContainer={{
//                 backgroundColor: Color.transparent,
//                 marginRight: 5,
//               }}
//               textStyle={{ color: Color.mainColor }}
//             />
//           </ProductValue>
//           <LineDivider />

//           <ProductValue
//             label={"Kiểu dáng"}
//             value={type}
//             onPress={() => {
//               setTypeModal(true);
//             }}
//           />
//           <LineDivider />

//           <ProductValue
//             label={"Số lượng"}
//             value={quantity}
//             onPress={() => {
//               setQuantityModal(true);
//             }}
//           />
//           <LineDivider />

//           <ProductValue
//             label={"Nhãn hàng"}
//             value={brand}
//             onPress={() => {
//               setBrandModal(true);
//             }}
//           />
//         </View>
//       </View>
//     );
//   }

//   function renderTagType() {
//     const handleTypeTagPress = (tag) => {
//       if (type === tag) {
//         setType("");
//       } else {
//         setType(tag);
//       }
//     };

//     return (
//       <View style={styles.selectedTagsContainer}>
//         {typeList.map((tag, index) => (
//           <Fragment key={index}>
//             <TypeCard
//               type={tag}
//               onPress={() => handleTypeTagPress(tag?.value)}
//               imageStyle={{
//                 opacity: type == tag.value ? 1 : 0.1,
//                 marginRight: 15,
//                 paddingRight: 15,
//               }}
//               containerStyle={{
//                 height: 40,
//                 width: "100%",
//                 paddingVertical: 0,
//                 paddingHorizontal: 0,
//                 marginRight: 15,
//                 justifyContent: "flex-end",
//                 ...styles.tagType,
//                 paddingRight: 10,
//               }}
//               textStyle={{
//                 color: Color.black,
//                 fontSize: 16,
//               }}
//             />
//           </Fragment>
//         ))}
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: Color.mainTheme, // "#F2F1FD",
//       }}
//     >
//       {loading && (
//         <>
//           <Progress.Bar
//             progress={0.9}
//             indeterminate={true}
//             width={windowWidth}
//             borderColor={Color.blueMain}
//             color={Color.blueMain}
//             height={4}
//             style={{
//               position: "absolute",
//               top: spacing.statusbarHeight,
//               zIndex: 10,
//             }}
//             borderRadius={0}
//             borderWidth={0}
//           />
//           <View
//             style={{
//               position: "absolute",
//               top: spacing.statusbarHeight + 3,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               justifyContent: "center",
//               alignItems: "center",
//               zIndex: 1,
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//             }}
//           >
//             <ActivityIndicator size="large" color="white" />
//             <Text style={{ color: Color.white, alignItems: "center" }}>
//               Quá trình này có thể mất vài phút, xin hãy giữ kết nối
//             </Text>
//           </View>
//         </>
//       )}

//       {/* {Header} */}
//       {renderHeader()}

//       {/* Image */}
//       {renderProductChose()}

//       {renderProfileUser()}

//       {renderProfileEdit()}

//       {/* Detail */}
//       {renderDetailField()}

//       {nameModal && (
//         <ModalInputText
//           isVisible={nameModal}
//           label={"Tên sản phẩm"}
//           onClose={() => setNameModal(false)}
//           value={name}
//           onPress={(name) => setName(name)}
//         />
//       )}

//       {descriptionModal && (
//         <ModalInputText
//           isVisible={descriptionModal}
//           label={"Mô tả sản phẩm"}
//           onClose={() => setDescriptionModal(false)}
//           value={description}
//           onPress={(description) => setDescription(description)}
//           maxLength={2500}
//         />
//       )}

//       {priceModal && (
//         <ModalInputNumber
//           isVisible={priceModal}
//           label={"Giá sản phẩm"}
//           onClose={() => setPriceModal(false)}
//           value={price}
//           onPress={(price) => setPrice(price)}
//           isInteger={false}
//         />
//       )}

//       {linkModal && (
//         <ModalInputText
//           isVisible={linkModal}
//           label={"Link sản phẩm"}
//           onClose={() => setLinkModal(false)}
//           // value={link || "https://shopee.vn/ruby_store.88"}
//           value={link || "https://"}
//           maxLength={500}
//           onPress={(link) => {
//             setLink(link);
//           }}
//         />
//       )}

//       {typeModal && (
//         <InputModal
//           isVisible={typeModal}
//           label={"Loại giày"}
//           onClose={() => setTypeModal(false)}
//           styleContainer={{
//             height: 600,
//           }}
//         >
//           <View
//             styleContainer={{
//               borderWidth: 2,
//             }}
//           >
//             {renderTagType()}
//           </View>
//         </InputModal>
//       )}

//       {quantityModal && (
//         <ModalInputNumber
//           isVisible={quantityModal}
//           label={"Số lượng"}
//           onClose={() => setQuantityModal(false)}
//           value={quantity}
//           onPress={(quantity) => setQuantity(quantity)}
//           isInteger={true}
//         />
//       )}

//       {brandModal && (
//         <ModalInputBrand
//           isVisible={brandModal}
//           label={"Nhãn hiệu"}
//           value={brand}
//           onClose={() => setBrandModal(false)}
//           onPress={(value) => setBrand(value)}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default ShopCreateProduct;

// const styles = StyleSheet.create({
//   headerLeft: {
//     borderColor: Color.textLight,
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 10,
//   },
//   header: {
//     height: 75,
//     width: "50%",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   profileSessionContainer: {
//     marginHorizontal: SIZES.font,
//     paddingHorizontal: SIZES.title,
//     // borderWidth: 1,
//     borderRadius: SIZES.radius,
//     borderColor: Color.textLight,
//     backgroundColor: Color.white,

//     borderWidth: 1,
//   },

//   imagePickerStyle: {
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//     alignContent: "center",
//     width: (windowWidth * 4) / 5,
//     height: (windowHeight * 1) / 5,
//     borderRadius: SIZES.radius,
//     borderWidth: 1,
//     backgroundColor: Color.white,
//     borderColor: Color.blueSd,
//   },
//   selectedTagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 15,
//     alignItems: "baseline",
//   },
//   tagType: {
//     margin: 2,
//     borderRadius: 8,
//   },
//   TopTabContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 5,
//   },
//   cartProductContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 5,
//     // paddingHorizontal: SIZES.radius,
//     borderRadius: SIZES.radius,
//     // borderWidth: 1,
//     borderColor: Color.textLight,
//   },
//   shadow: {
//     // shadowColor: "#7F5DF0",
//     // shadowOffset: {
//     //   width: 15,
//     //   height: 20,
//     // },
//     // shadowOpacity: 0.25,
//     // shadowRadius: 3.5,
//     // elevation: 5,

//     shadowColor: Color.mainTheme,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   images: {
//     width: "100%",
//     height: "80%",
//     position: "absolute",
//     // borderWidth: 1,
//     borderRadius: 12,
//     borderColor: Color.black,
//   },
// });
