import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Button, Surface, TextInput, Title, Text } from "react-native-paper";
import { LoginImg } from "../public/assets";
import { showMessage } from "react-native-flash-message";
import { showError } from "../ultils/helperFunction";
import CustomButton from "../components/CustomButton/index.js";
import validator from "../ultils/validations";
import actions from "../redux/actions";

export default function SignupScreen({ navigation }) {
  const [state, setState] = useState({
    isLoading: false,
    username: "1@gmail.com",
    email: "1@gmail.com",
    password: "1",
    confirmPassword: "",
    isSecure: true,
  });
  const { isLoading, username, email, password, isSecure, confirmPassword } =
    state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));

  const isValidData = () => {
    const error = validator({
      username,
      email,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onSignup = async () => {
    // const checkValid = isValidData();
    if (true) {
      updateState({ isLoading: true });

      console.log("dasdasdasdasdasd");
      try {
        const res = await actions.signup({
          username,
          email,
          password,
        });
        console.log("res of signup==>>>>>", res);
        showMessage("Registered successfully...!!!!");
        updateState({ isLoading: false });
        navigation.goBack();
      } catch (error) {
        // console.log("error raised")
        showError(error.error_message);
        updateState({ isLoading: false });
      }
    }
  };

  return (
    <ImageBackground source={LoginImg} style={styles.image} blurRadius={10}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Surface style={styles.box}>
          <View>
            <TextInput
              label="Username"
              mode="outlined"
              value={username}
              onChangeText={(username) => updateState({ username })}
            />

            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={(email) => updateState({ email })}
            />

            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={(password) => updateState({ password })}
            />
          </View>

          <CustomButton
            label={"Register"}
            onPress={onSignup}
            isLoading={isLoading}
          />
        </Surface>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
    backgroundColor: "",
  },
  box: {
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    height: 250,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
