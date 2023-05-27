import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Color from "../../constans/Color";
import Icons from "../Icons";
import CustomButton from "../CustomButton/index.js";
import { color } from "react-native-reanimated";
import LineDivider from "../LineDivider";
import { showError } from "../../ultils/helperFunction";
import { useSelector } from "react-redux";
import { newListProduct } from "../../constans/raw";
import { LinearGradient } from "expo-linear-gradient";

const DetailShop = ({ dataProduct }) => {
  const [dataDetailShop, setDataDetailShop] = useState();

  useEffect(() => {}, []);

  return (
    <View>
      {/* Header Name */}
      <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
        {/* Headet of Tab */}
        <View style={styles.TopTabContainer}>
          <View style={{ flex: 1 }}>
            {/*  Name */}
            <Text style={{ fontWeight: "500", fontSize: 20 }}>
              {dataProduct.shop.sName || "Shop giay ERic"} Shop giay ERic thoi
              trang Nam cao cap ksdmfsdkflsdfk
            </Text>

            {/* So luong Product  || So luong like */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 1,
              }}
            >
              <Text style={{ color: Color.textLight, fontSize: 14 }}>
                // TO DO
              </Text>
            </View>
          </View>

          {/*  button Go */}
          <CustomButton
            onPress={() => {}}
            label={"Follow +"}
            styleContainer={{ width: 90, alignSelf: "flex-start" }}
          />
        </View>

        {/* Photo */}
        <View style={styles.TopTabContainer}>
          <Image
            source={{ uri: dataProduct.shop.sLogo }}
            style={{
              width: 60,
              height: 50,
              borderRadius: 50,
              alignSelf: "flex-start",
            }}
          />
          {/* address   */}
          <View style={{ flex: 1, marginLeft: 5, justifyContent: "center" }}>
            {/* </Text> */}

            {/* <Icons icon={icons.Feather} name="map-pin" size={10} /> */}
            <Text style={styles.addressStyle}>
              [{"Địa chỉ 1"}]:{dataProduct?.shop?.sAddress1}
            </Text>
            <Text style={styles.addressStyle}>
              {dataProduct?.shop?.sAddress2
                ? `[Địa chỉ 2]: ${dataProduct?.shop?.sAddress2}`
                : null}
              {/* {dataProduct?.shop?.sAddress2} */}
            </Text>
          </View>

          {/*  button follow */}
          <CustomButton
            onPress={() => {}}
            label={"Xem Shop"}
            // style={{bac}}
            styleContainer={{
              ...styles.customButtonGoTo,
            }}
            textStyle={{ ...styles.customTextStyleGoTo }}
          />
        </View>
      </View>

      <LineDivider />

      {/* Top List product */}
      <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
        <Text style={styles.titleListProduct}>Các sản phẩm nổi bật</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {newListProduct.map((item, index) => {
            return (
              <View
                key={`TopProduct-${index}`}
                style={{ marginLeft: index > 0 ? 8 : 0 }}
              >
                <Image
                  source={{ uri: item?.images[0]?.url }}
                  style={styles.thumbnailProduct}
                />
              </View>
            );
          })}

          {/*  View All Button */}
          <CustomButton
            onPress={() => {}}
            label={"View All"}
            styleContainer={{
              width: 80,
              backgroundColor: "transparent",
            }}
            textStyle={{ color: Color.mainColor, fontSize: 13 }}
          />

          <LinearGradient
            colors={["transparent", Color.backGround]}
            locations={[0, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderRadius: 100,
              zIndex: -10,
            }}
          />
        </View>
      </View>
      <LineDivider />

      {/* New List Product */}
      <View style={{ marginVertical: 10, paddingHorizontal: 5 }}>
        <Text style={{ ...styles.titleListProduct, paddingLeft: 5 }}>
          Các sản phẩm mới
        </Text>
        <View>
          {newListProduct.map((item, index) => {
            return (
              <LinearGradient
                colors={[
                  index == 0
                    ? Color.blueTheme
                    : index == 1
                    ? Color.greenTheme
                    : Color.pinkTheme,
                  Color.white,
                ]}
                start={[0, 0.1]}
                end={[0.4, 1]}
                style={{
                  borderRadius: 6,
                  paddingHorizontal: 5,
                  marginTop: index ? 5 : 0,
                }}
                key={`NewProduct-${item.id}`}
              >
                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "center",

                    // backgroundColor: Color.greenTheme,
                  }}
                >
                  {/* Image  */}
                  <Image
                    source={{ uri: item?.images[0]?.url }}
                    style={styles.thumbnailProduct}
                  />

                  {/* Name, count rage,  */}
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        height: (80 / 4) * 2,
                      }}
                    >
                      {item.name}
                      dds fsdfdf dds dds fsdfdf dds dds fsdfdf dds
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ ...styles.addressStyle, height: 80 / 3 }}
                    >
                      {item.description}
                    </Text>

                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        height: 80 / 3,
                        bottom: 0,
                      }}
                    >
                      100k
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default DetailShop;

const styles = StyleSheet.create({
  customButtonGoTo: {
    width: 90,
    alignSelf: "flex-start",
    backgroundColor: Color.white,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: Color.mainColor,
  },
  customTextStyleGoTo: {
    fontSize: 12,
    color: Color.mainColor,
  },
  addressStyle: {
    fontWeight: "300",
    fontSize: 14,
  },
  TopTabContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    flex: 1,
  },
  titleListProduct: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 3,
  },
  thumbnailProduct: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
});
