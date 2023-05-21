import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import Color from "../../constans/Color";

const width = Dimensions.get("window").width / 2 - 30;

const MasanoryContainer = ({ data }) => {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      spacing={4}
      imageContainerStyle={{ borderRadius: 8 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => <CardItem data={item} i={i} />}
    />
  );
};

// const CardItem = ({ data, i }) => {
//   // const nagivation = useNavigation();

//   const handleClick = () => {
//     // nagivation.navigate("DetailPost", { param: data.id });
//   };

//   return (
//     <TouchableOpacity
//       style={{ height: Math.round(200) }}
//       // style={{ height: Math.round(Math.random() * 100 + 160) }}
//       className="bg-[#111] m-1 rounded-md relative overflow-hidden"
//       onPress={handleClick}
//     >
//       <Image
//         source={{ uri: data.images[0].url }}
//         // source={ require( 'E:/Do_an_nhap/testimg/7631215.1141.jpg') }
//         className="w-full h-full object-cover"
//       />
//     </TouchableOpacity>
//   );
// };

const CardItem = ({ data, i }) => {
  return (
    <View
      // activeOpacity={0.8}
      // style={{ height: Math.round(200) }}
      className="bg-[#111] m-1 rounded-md  "
      style={{
        borderColor: Color.textLight,
        borderWidth: 1,
        height: Math.round(200),
        backgroundColor: Color.light,
        paddingHorizontal: 5,
      }}
      // onPress={() => navigation.navigate('Details', shoe)}
    >
      <View style={style.card}>
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            // paddingHorizontal: 5,
            borderRadius: 15,
          }}
        >
          <Image
            source={{ uri: data.images[0].url }}
            resizeMode="contain"
            style={{
              resizeMode: "contain",
              width: 160,
              height: 120,
              borderRadius: 3,
            }}
          />
        </TouchableOpacity>

        <View style={{ paddingTop: 0, height: 35 }}>
          <Text
            style={{
              fontWeight: "normal",
              fontSize: 14,
              marginLeft: 0,
            }}
          >
            {`${data.content || data.description}`.slice(0, 40)} ...
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold", color: Color.red }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: Color.red }}
            >
              Đ
            </Text>
            {data.price}
          </Text>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: Color.green,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: Color.white, fontWeight: "bold" }}>+</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MasanoryContainer;

const style = StyleSheet.create({
  card: {
    // height: 200,
    backgroundColor: Color.light,
    // justifyContent: "space-between",
    flex: 1,
    // alignItems: "center",
    // width,
    // marginHorizontal: 2,
    // borderRadius: 10,
    // marginBottom: 20,
    // padding: 15,
  },
});
