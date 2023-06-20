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
  const previousScreen = route.params?.previousScreen;

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
        updateProductShopForm({ productId: productId });
      })
      .catch((error) => {
        showError(error.error_message);
      });

    setLoading(false);
  };

  useEffect(() => {
    if (productId) {
      fetchData();
    }
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
          console.log(productShopForm);
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
              // navigation.goBack()
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
                {product?.name}
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
