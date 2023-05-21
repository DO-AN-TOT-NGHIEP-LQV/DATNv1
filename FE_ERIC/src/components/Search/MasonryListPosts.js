import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import React from "react";
import Icons, { icons } from "../Icons";
import Color from "../../constans/Color";
const windowWidth = Dimensions.get("window").width;

const MasonryListPosts = ({ data }) => {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item) => item.id + item.images[0].id}
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
      style={{
        // height: Math.round(Math.random() * 100 + 160),
        borderColor: Color.textLight,
        borderWidth: 1,
        height: Math.round(200),
        backgroundColor: Color.white,
        paddingHorizontal: 5,
        margin: 2,
      }}
    >
      <View style={style.card}>
        {/* <TouchableOpacity
          style={{
            // position: "absolute",
            // left: -8,
            top: 0,
            // paddingHorizontal: 12,
            paddingVertical: 1,
            // backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 5,
            zIndex: 100,
            // width: "10%",
            height: "10%",
            // textShadowColor: "rgba(0,0,0,0.2)",
            // textShadowOffset: {
            //   height: 1,
            //   width: 0,
            // },
            // textShadowRadius: 4,
          }}
        >
          <Text style={{ fontSize: 10, color: Color.black }}>{data}</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={{
            borderRadius: 3,

            width: "100%",
            height: 110,
            paddingVertical: 5,
          }}
        >
          <Image
            source={{ uri: data.images[0].url || null }}
            className="w-full h-full object-cover"
            resizeMode="contain"
            style={{
              // borderWidth: 1,
              borderRadius: 3,
              // borderColor: Color.textLight,
            }}
          />
        </TouchableOpacity>

        {/* Content && Title */}
        <View style={{ height: 45 }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "500",
              fontSize: 14,
              marginLeft: 0,
              lineHeight: 15,
            }}
          >
            {`${data.title || "sdfsdfsdfsdfsadjasljdlasd;asdsadj"}`}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              fontWeight: "normal",
              fontSize: 14,
              marginLeft: 0,
              lineHeight: 15,
            }}
          >
            {`${
              data.content ||
              "sdfsdfsdfsdfsadjasljdlasd;asdsadsdasdasdasdsdfgg654qwwasdfghjmn j"
            }`}
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
          </Text>
        </View>

        {/* Detail */}
        <View
          style={{
            flexDirection: "row",
            // flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {/* Name && address */}
          {/* <TouchableOpacity style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              [{data.content}]
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 9,
                fontWeight: "300",
              }}
            >
              <Icons icon={icons.Feather} name="map-pin" size={10} />
              {data.title}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default MasonryListPosts;

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
});
