import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Surface, TextInput, Text } from "react-native-paper";
import { LoginImg } from "../public/assets";
import { showMessage } from "react-native-flash-message";
import { showError, showSuccess } from "../ultils/messageFunction";
import CustomButton from "../components/CustomButton/index.js";
import validator from "../ultils/validations";
import actions from "../redux/actions";
import { Color } from "../constans";

export default function SignupScreen({ navigation }) {
  const [state, setState] = useState({
    isLoading: false,
    username: "@gmail.com",
    email: "@gmail.com",
    password: "",
  });
  const { isLoading, username, email, password } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));

  const isValidData = (username, email, password) => {
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
    // const checkValid = isValidData(username, email, password);
    if (true) {
      updateState({ isLoading: true });

      try {
        const res = await actions.signup({
          username,
          email,
          password,
        });
        showSuccess("Successful account registration");
        updateState({ isLoading: false });
        navigation.goBack();
      } catch (error) {
        showError(error.error_message);
        updateState({ isLoading: false });
      }
    }
  };

  return (
    <ImageBackground source={LoginImg} style={styles.image} blurRadius={10}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng ký</Text>
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
    backgroundColor: Color.mainTheme,
  },
});
