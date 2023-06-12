import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import Color from "../../constans/Color";
import Icons, { icons } from "../Icons";
import { v4 as uuidv4 } from "uuid";
import { FONTS } from "../../constans/Theme";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation, CommonActions } from "@react-navigation/native";

const MasonryListProducts = ({ data }) => {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      imageContainerStyle={{ borderRadius: 8 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <CardItem data={item} />}
    />
  );
};

const CardItem = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View className="bg-[#111] rounded-md" style={style.cardItemView}>
      <View style={style.card}>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("SearchTab", {
          //     screen: "DetailProduct",
          //     params: { dataProduct: data },
          //   })
          // }
          // onPress={() =>
          //   navigation.navigate("DetailProduct", {
          //     params: { dataProduct: data },
          //   })
          // }
          onPress={() => {
            navigation.navigate("DetailProduct", {
              dataProduct: data,
            });
          }}
          style={{
            borderRadius: 3,
            width: "100%",
            height: 100,
            // paddingVertical: 5,
            paddingTop: 5,
            paddingBottom: 0,
          }}
        >
          <Image
            source={{ uri: data.images[0].url || null }}
            className="w-full h-full object-cover"
            resizeMode="contain"
            style={{
              borderWidth: 1,
              borderRadius: 3,
              borderColor: Color.textLight,
            }}
          />
        </TouchableOpacity>

        {/* Content || Name */}
        <View style={{ height: 45 }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "normal",
              fontSize: 14,
              marginLeft: 0,
              lineHeight: 15,
              fontFamily: "Roboto-Bold",
            }}
          >
            {`${data.name}`}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "normal",
              fontSize: 12,
              marginLeft: 0,
              lineHeight: 15,
              fontFamily: "Roboto-Regular",
            }}
          >
            {`${data.content || data.description}`}
          </Text>
        </View>

        {/* Price */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text numberOfLines={1}>
            <Text numberOfLines={1} style={style.priceSmall}>
              đ
            </Text>
            <Text numberOfLines={1} style={style.priceBig}>
              {(data.price || 0).toLocaleString("vi-VN")}
            </Text>

            {(data.originalPrice !== null ||
              data.originalPrice !== undefined) && (
              <Text numberOfLines={1} style={style.originalPrice}>
                đ{data.originalPrice}
              </Text>
            )}
          </Text>
        </View>

        {/* Detail */}
        <View style={style.detailView}>
          {/* Name && address */}
          <TouchableOpacity style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              [{data.shop.sName}]
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 8,
                fontWeight: "300",
              }}
            >
              <Icons icon={icons.Feather} name="map-pin" size={10} />
              {data.shop.sAddress1}
            </Text>
          </TouchableOpacity>

          {/* Like, Rate, Count */}
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontWeight: "normal",
              }}
            >
              {/* [{data.shop.sName}] */}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 10,
                fontWeight: "normal",
              }}
            >
              <Icons icon={icons.AntDesign} name="hearto" size={10} />
              {/* {data.shop.sAddress1} */}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MasonryListProducts;

const style = StyleSheet.create({
  card: {
    backgroundColor: Color.white,
    flex: 1,
  },
  priceSmall: {
    fontSize: 14,
    fontWeight: "300",
    color: Color.red,
    // color: Color.blueTheme,
  },
  priceBig: {
    color: Color.red,
    color: Color.red,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    fontWeight: "normal",
  },
  originalPrice: {
    fontWeight: "300",
    color: Color.textLight,
    fontSize: 10,
    textDecorationLine: "line-through",
  },
  detailView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  cardItemView: {
    borderColor: Color.textLight,
    borderWidth: 1,
    height: Math.round(200),
    backgroundColor: Color.white,
    paddingHorizontal: 5,
    margin: 2,
  },
});
