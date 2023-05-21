import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Color from "../../constans/Color";
import MasonryList from "@react-native-seoul/masonry-list";
import { v4 as uuidv4 } from "uuid";

const width = Dimensions.get("window").width / 2 - 30;

const MasonryListAll = ({ data }) => {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item) => uuidv4()}
      numColumns={3}
      // spacing={4}
      imageContainerStyle={{ borderRadius: 8 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => <CardItem data={item} i={i} />}
    />
  );
};

const CardItem = ({ data, i }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      // style={{ height: Math.round(200) }}
      style={{
        height: Math.round(100),
        borderColor: Color.textLight,
        borderWidth: 1,
      }}
      // className="bg-[#111] m-1 rounded-md relative overflow-hidden"
      className="bg-[#111]  relative overflow-hidden"
      onPress={handleClick}
    >
      <Image
        source={{ uri: data.images[0].url || null }}
        className="w-full h-full object-cover"
      />
    </TouchableOpacity>
  );
};

export default MasonryListAll;

const style = StyleSheet.create({});
