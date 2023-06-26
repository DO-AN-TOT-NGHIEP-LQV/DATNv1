import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constans/Color";
import { bg2 } from "../../public/assets/image";
import { FONTS, SIZES, spacing, statusbarHeight } from "../../constans/Theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { LoginImg } from "../../public/assets";
import { GET_DETAIL_SHOP } from "../../config/urls";
import { apiGet } from "../../ultils/utilsApi";
import openWebLink from "../../hookFuntion/openWebLink";
import ProductValue from "../../components/SalerManager/ProductValue";
import LineDivider from "../../components/LineDivider";
import { ProfileValue } from "../../components/Profile";
import Icons, { icons } from "../../components/Icons";
import CustomButton from "../../components/CustomButton/index.js";

const ShopProfileScreen = () => {
  const detailUser = useSelector((state) => state.auth.detailUser);
  const [shopDetail, setShopDetail] = useState(null);

  const navigation = useNavigation();

  const [shopDetailForm, setShopDetailForm] = useState({
    sAddress1: "",
    sFax: "",
    sLink: "",
    sLogo: "",
    sName: "",
    sNumber: "",
  });

  const { sAddress1, sFax, sLink, sLogo, sName, sNumber } = shopDetailForm;

  const updateShopForm = (data) =>
    setShopDetailForm(() => ({ ...shopDetailForm, ...data }));

  useEffect(() => {
    firstLoad();
  }, []);

  const firstLoad = async () => {
    try {
      console.log(detailUser);
      var headers = {
        "Content-Type": "application/json",
      };

      const shopId = detailUser?.shop_id || undefined;
      if (detailUser && detailUser?.shop_id != null) {
        let url = `${GET_DETAIL_SHOP}?`;
        if (shopId !== undefined) {
          url += `shopId=${shopId}`;
        }
        const res = await apiGet(url, {}, headers, false);
        setShopDetail(res.data);
        console.log(res.data);

        updateShopForm({
          sAddress1: res.data?.sAddress1,
          sFax: res.data?.sFax,
          sLink: res.data?.sLink,
          sLogo: res.data?.sLogo,
          sName: res.data?.sName,
          sNumber: res.data?.sNumber,
          sStatus: res.data?.sStatus,
        });
        console.log(GET_DETAIL_SHOP);
        // console.log(shopDetail.id);
      } else {
        showError("Không thể lấy Id của shop");
      }
    } catch (error) {
      console.log(error);
      console.log(error.error_message || "Lấy dữ liệu thất bại");
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={{ ...FONTS.h2, paddingTop: 5 }}>Thông tin cửa hàng</Text>
        </View>

        <ImageBackground style={styles.imgBg}>
          <TouchableOpacity
            onPress={() => {
              firstLoad();
            }}
            style={{
              width: 80,
              height: 80,
              marginLeft: 15,
            }}
          >
            <Image
              source={
                shopDetail && shopDetail?.sLogo
                  ? { uri: shopDetail?.sLogo }
                  : LoginImg
              }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 40,
                borderWidth: 1,
                borderColor: Colors.textLight,
              }}
            />

            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: -70,
                  alignItems: "center",
                  borderRadius: 15,
                  backgroundColor: Colors.mainTheme,
                  justifyContent: "center",
                }}
              >
                <Icons
                  // name={detailUser?.gender ? "man" : "woman"}
                  name={"pluscircleo"}
                  icon={icons.AntDesign}
                  color={Colors.mainColor}
                  size={10}
                />
              </View>
            </View>

            {/* <TouchableOpacity
              style={styles.styleContainerButtonRole}
              onPress={() => openWebLink()}
            >
              <Text style={{ ...styles.styleTextButtonRole }}>Link</Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: -70,
                  alignItems: "center",
                  borderRadius: 15,
                  backgroundColor: Colors.mainTheme,
                  justifyContent: "center",
                }}
              >
                <Icons
                  name={detailUser?.gender ? "man" : "woman"}
                  icon={icons.AntDesign}
                  color={Colors.mainColor}
                  size={10}
                />
              </View>
            </TouchableOpacity> */}
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
            }}
          >
            <View
              style={{
                height: 80,
                color: Colors.white,
                justifyContent: "center",
              }}
            >
              <Text
                numberOfLines={3}
                style={{
                  color: Colors.white,
                  ...FONTS.h2,
                  lineHeight: 22,
                }}
              >
                {shopDetail?.sName || "Chưa có tên"}{" "}
              </Text>
            </View>

            <Text
              style={{
                color: Colors.whileOpacity,
                ...FONTS.body4,
                fontStyle: "italic",
                fontWeight: 100,
                fontSize: 12,
                lineHeight: 15,
              }}
              numberOfLines={2}
            >
              Địa chỉ: {shopDetail?.sAddress1 || "Chưa có địa chỉ"}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={{
              position: "absolute",
              bottom: 0,
              right: 15,
              color: Colors.white,
              ...FONTS.body4,
              fontStyle: "italic",
              fontWeight: 200,
              fontSize: 10,
            }}
          >
            {shopDetail?.created_at}
          </Text>
        </ImageBackground>
        {/* </View> */}
      </View>
    );
  }

  function renderDetailField() {
    return (
      <ScrollView>
        <View style={styles.profileSessionContainer}>
          <ProductValue
            label={"Chủ sở hữu"}
            value={detailUser?.username}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={20}
                  name={"user"}
                  icon={icons.AntDesign}
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          <LineDivider />
          <ProductValue
            label={"Email"}
            value={detailUser?.email}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={16}
                  name={"mail"}
                  icon={icons.AntDesign}
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          <LineDivider />
          <ProductValue
            label={"Tên cửa hàng"}
            value={sName}
            onPress={() => {
              // setNameModal(true);
            }}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={16}
                  name={"storefront-outline"}
                  icon={icons.MaterialCommunityIcons}
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          <LineDivider />

          <ProductValue
            label={"Liên kết"}
            value={sLink}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={20}
                  name={"link-outline"}
                  icon={icons.Ionicons}
                  color={Colors.mainColor}
                />
              </View>
            }
            onPress={() => {
              setDescriptionModal(true);
            }}
          />
          <LineDivider />

          <ProductValue
            label={"Số điện thoại"}
            value={sNumber}
            onPress={() => {
              setPriceModal(true);
            }}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={18}
                  name={"phone-call"}
                  icon={icons.Feather}
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          <LineDivider />

          <ProductValue
            label={"Địa chỉ"}
            value={sAddress1}
            onPress={() => {
              setTypeModal(true);
            }}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={18}
                  name={"ios-location-outline"}
                  icon={icons.Ionicons}
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          <LineDivider />
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      {renderDetailField()}
    </View>
  );
};

export default ShopProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.mainTheme,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    justifyContent: "space-between",
    ...statusbarHeight,
  },

  imgBg: {
    flexDirection: "row",
    height: 140,
    marginHorizontal: 10,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 15,
    borderRadius: SIZES.radius,
    backgroundColor: "#2d2d44",
  },
  shadow: {
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 2,
  },
  iconStyle: {
    width: 40,
    height: 40,
    // paddingLeft: -10,
    marginLeft: -5,
    marginRight: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Colors.mainTheme,
  },
  styleContainerButtonRole: {
    backgroundColor: Colors.mainTheme,
    borderRadius: 15,
    height: 25,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  styleTextButtonRole: {
    color: Colors.mainColor,
    fontSize: 10,
    ...FONTS.h4,
    marginHorizontal: 10,
  },

  profileSessionContainer: {
    marginTop: 20,
    marginHorizontal: SIZES.font,
    paddingHorizontal: SIZES.title,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: Colors.textLight,
    backgroundColor: Colors.white,
  },
});
