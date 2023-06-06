import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import React from "react";
import Color from "../../constans/Color";
import Icons, { icons } from "../Icons";
import { FONTS, SIZES } from "../../constans/Theme";

export default function ProductValue({ label, value, onPress, children }) {
  return (
    <TouchableOpacity style={styles.touchableContainer} onPress={onPress}>
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        {label && (
          <Text
            numberOfLines={1}
            style={{ color: Color.blackOpacity, ...FONTS.h4, marginLeft: -10 }}
          >
            {label}
          </Text>
        )}

        <Text numberOfLines={1} style={styles.numOfText}>
          {value}
        </Text>
      </View>

      {children}

      {onPress && (
        <Icons
          size={16}
          name={"right"}
          icon={icons.AntDesign}
          color={Color.black}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
  },
  numOfText: {
    color: Color.textLight,
    ...FONTS.body4,
  },
});
