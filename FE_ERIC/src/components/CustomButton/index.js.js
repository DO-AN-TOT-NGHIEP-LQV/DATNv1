import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

const CustomButton = ({ label, onPress, className, isLoading }) => {
  return (
    <Button
      onPress={onPress}
      className={className ? className : "bg-[#AD40AF]  my-[5px]"}
      loading={isLoading}
      loadingProps={{ color: "black" }}
    >
      {!!isLoading ? (
        ""
      ) : (
        <Text className=" text-center text-[16px] text-[#fff] ">{label}</Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: 48,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  textStyle: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  },
});

export default CustomButton;
