import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import Color from "../../constans/Color";
import Icons, { icons } from "../Icons";
import { v4 as uuidv4 } from "uuid";

const MasonryListProducts = ({ data }) => {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item) => uuidv4()}
      numColumns={2}
      // spacing={2}
      imageContainerStyle={{ borderRadius: 8 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => <CardItem data={item} i={i} />}
    />
  );
};

const CardItem = ({ data, i }) => {
  return (
    <View
      className="bg-[#111] rounded-md"
      style={style.cardItemView}
      // onPress={() => navigation.navigate('Details', shoe)}
    >
      <View style={style.card}>
        <TouchableOpacity
          style={{
            // borderWidth: 1,
            // paddingHorizontal: 2,
            borderRadius: 3,
            // position: "relative",
            width: "100%",
            height: 110,
            paddingVertical: 5,
          }}
        >
          <Image
            source={{ uri: data.images[0].url || null }}
            // resizeMode="contain"
            // style={{
            //   resizeMode: "contain",
            //   width: 160,
            //   height: 100,
            //   borderRadius: 3,
            // }}
            // resizeMode="contain"
            // className=" object-cover"
            // style={{
            //   // resizeMode: "contain",
            //   width: 160,
            //   height: 100,
            //   // borderRadius: 3,
            // }}
            className="w-full h-full object-cover"
            resizeMode="contain"
            style={{
              // borderWidth: 1,
              borderRadius: 3,
              borderColor: Color.textLight,
            }}
          />
        </TouchableOpacity>

        {/* Content || Name */}
        <View style={{ height: 30 }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "normal",
              fontSize: 14,
              marginLeft: 0,
              lineHeight: 15,
            }}
          >
            {`${data.content || data.description}`}
          </Text>
        </View>

        {/* Price */}
        <View
          style={{
            flexDirection: "row",
            // flex: 1,
          }}
        >
          <Text numberOfLines={1}>
            <Text numberOfLines={1} style={style.priceSmall}>
              đ
            </Text>
            <Text numberOfLines={1} style={style.priceBig}>
              {data.price}
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
                fontSize: 9,
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
    fontSize: 16,
    fontWeight: "300",
    color: Color.red,
  },
  priceBig: {
    fontSize: 18,
    fontWeight: "normal",
    color: Color.red,
  },
  originalPrice: {
    fontWeight: "300",
    color: Color.textLight,
    fontSize: 11,
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
