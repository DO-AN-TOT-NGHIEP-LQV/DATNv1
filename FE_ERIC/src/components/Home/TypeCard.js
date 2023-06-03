import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constans/Theme";
import Color from "../../constans/Color";

const TypeCard = ({ type, containerStyle }) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        source={type?.thumbnail}
        imageStyle={{ borderRadius: SIZES.radius }}
        resizeMode="cover"
        style={{
          ...style.containerStyle,
          ...containerStyle,
        }}
      >
        <Text style={style.title}>{type?.value}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TypeCard;

const style = StyleSheet.create({
  containerStyle: {
    height: 80,
    width: 150,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    justifyContent: "flex-end",
  },
  title: {
    color: Color.white,
    ...FONTS.h2,
  },
});
