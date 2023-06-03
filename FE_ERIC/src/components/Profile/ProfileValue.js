import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import React from "react";
import Color from "../../constans/Color";
import Icons, { icons } from "../Icons";
import { FONTS, SIZES } from "../../constans/Theme";

export default function ProfileValue({
  iconName,
  label,
  value,
  onPress,
  iconSize,
  gender,
}) {
  return (
    <View style={styles.touchableContainer}>
      {/* Icon */}
      <View style={styles.iconStyle}>
        <Icons
          size={iconSize || 20}
          name={iconName}
          icon={icons.AntDesign}
          color={Color.mainColor}
        />
        {iconName == "user" && (
          <View
            style={{
              ...styles.iconStyle,
              borderWidth: 1,
              width: 20,
              height: 20,
              position: "absolute",
              left: 25,
              bottom: 0,
              right: 0,
              top: 25,
            }}
          >
            <Icons
              size={10}
              name={gender}
              icon={icons.AntDesign}
              color={Color.mainColor}
            />
          </View>
        )}
      </View>

      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        {label && (
          <Text
            numberOfLines={1}
            style={{ color: Color.darkGray, ...FONTS.body4 }}
          >
            {label}
          </Text>
        )}

        <Text numberOfLines={2} style={{ ...FONTS.h4 }}>
          {value}
        </Text>
      </View>

      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Icons
            size={20}
            name={"right"}
            icon={icons.AntDesign}
            color={Color.black}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
  },
  iconStyle: {
    width: 40,
    height: 40,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Color.mainTheme,
  },
});
