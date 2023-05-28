import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import CustomButton from "../components/CustomButton/index.js";

const Profile = () => {
  const tokenData = useSelector((state) => state.auth.tokenData);
  const [isLoading, setLoading] = useState(false);

  const onLogoutAlert = () => {
    Alert.alert(
      "Logout",
      "Are you sure, yout want to logout from this device",
      [{ text: "Yes", onPress: logout }, { text: "No" }],
      { cancelable: true }
    );
  };
  const logout = () => {
    setLoading(true);
    // setTimeout(() => {
    actions.logout();
    setLoading(false);
    // }, 2000);
  };
  return (
    <View style={styles.container}>
      <Text>{tokenData.name}</Text>
      <Text style={{ marginBottom: 16 }}>{tokenData.email}</Text>
      <CustomButton
        isLoading={isLoading}
        label="Logout"
        onPress={onLogoutAlert}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default Profile;
