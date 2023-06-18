import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Pressable,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color } from "../../constans";
import { FONTS, SIZES, shadow, statusbarHeight } from "../../constans/Theme";
import Header from "../../components/Header";
import Icons, { icons } from "../../components/Icons";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";

import { showError } from "../../ultils/messageFunction";
import { apiGet } from "../../ultils/utilsApi";
import { GET_PRODUCT_OF_SHOP } from "../../config/urls";
import { ShoesFLas } from "../../public/assets";
import {
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
  bg7,
  bg8,
  promoBg1,
} from "../../public/assets/image";
import { Fragment } from "react";

const ShopManagerProductScreen = ({ route }) => {
  //   const shopId = route.params?.shopId;
  const { shopId } = route.params;
  const navigation = useNavigation();

  const [listProduct, setListProduct] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
    console.log(shopId);
  }, []);

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  //   useEffect(() => {
  //     if (route.params?.refresh) {
  //       fetchData();
  //       navigation.setParams({ refresh: false });
  //     }
  //   }, [route.params?.refresh]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const fetchData = async () => {
    var headers = {
      "Content-Type": "application/json",
    };

    var data = {
      params: {
        shopId: shopId,
        keyword: keyword,
      },
    };
    await apiGet(GET_PRODUCT_OF_SHOP, data, headers, false)
      .then((res) => {
        setListProduct(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        showError(error.error_message);
      });
  };

  function renderHeader() {
    return (
      <Header
        // title={"Quản lý danh sách sản phẩm"}
        image={bg2}
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
            onPress={() => {
              //   navigation.navigate("AdminMainScreen");
              navigation.goBack();
            }}
          >
            <View
              style={{
                borderColor: Color.textLight,
                borderWidth: 1,
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Icons
                icon={icons.Feather}
                size={12}
                color={Color.black}
                name={"chevron-left"}
              />
            </View>
          </TouchableOpacity>
        }
        rightComponent={<View style={{ flex: 1 }}>{renderSearch()}</View>}
      >
        {/* {renderSearch()} */}
      </Header>
    );
  }

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginLeft: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: Color.white, // Color.mainTheme,
          borderWidth: 1,
          borderColor: Color.textLight,
          ...shadow.shadow,
        }}
      >
        {/* icon */}
        <Icons
          icon={icons.AntDesign}
          size={16}
          name="search1"
          color={Color.black}
        />

        <TextInput
          style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}
          onChangeText={(value) => setKeyword(value)}
        />

        <TouchableOpacity
          onPress={() => {
            fetchData();
          }}
        >
          <Image
            source={require("../../public/assets/icons/filterIcon.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderProductList() {
    return (
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.padding,
          padding: 10,

          borderRadius: SIZES.radius,
          backgroundColor: Color.white,
          ...styles.customContainerStyles,
        }}
      >
        <Text style={{ ...FONTS.h3, lineHeight: 25 }}>Danh sách sản phẩm</Text>
        <FlatList
          contentContainerStyle={{ marginTop: SIZES.radius }}
          scrollEnabled={false}
          data={listProduct}
          // keyExtractor={(item) => `${item.productDTO.id}`}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: SIZES.base,
                  paddingHorizontal: SIZES.base,
                  paddingRight: 0,
                }}
              >
                <Image
                  source={{ uri: item?.product?.images[0]?.url }}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                    borderRadius: 5,
                  }}
                />
                <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                  <Text numberOfLines={1} style={{ ...FONTS.h4, width: "75%" }}>
                    Id: {item?.product?.id}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: Color.textLight,
                      ...FONTS.body4,
                      lineHeight: 18,
                      width: "75%",
                    }}
                  >
                    {item?.product?.name}
                  </Text>
                  <Text style={{}}>
                    s/l:
                    {(item?.shopProduct?.quantity || 0).toLocaleString("vi-VN")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: Color.blueSd,
                      // ...FONTS.body4,
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    {(item?.shopProduct?.price || 0).toLocaleString("vi-VN")}
                  </Text>
                  <Icons icon={icons.AntDesign} name={"right"} size={18} />
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: Color.darkGray2,
                }}
              />
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.white }}>
      {/* Header */}
      {renderHeader()}

      {/* Card list */}
      {/* {renderSearch()} */}

      {/* footer */}
      {renderProductList()}
    </View>
  );
};

export default ShopManagerProductScreen;

const styles = StyleSheet.create({
  cartProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  images: {
    width: "100%",
    height: "80%",
    position: "absolute",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Color.black,
  },
  customContainerStyles: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
