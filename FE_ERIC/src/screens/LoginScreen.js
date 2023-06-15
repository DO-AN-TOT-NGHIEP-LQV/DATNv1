import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { validatorLogin } from "../ultils/validations";
import { showError, showSuccess } from "../ultils/messageFunction";
import actions from "../redux/actions";
import { LoginImg } from "../public/assets";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import InputFieldCustom from "../components/InputFieldCustom";
import CustomButton from "../components/CustomButton/index.js";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../constans";
import validator from "../ultils/validations";

const LoginScreen = ({}) => {
  const [state, setState] = useState({
    isLoading: false,
    username: "4@gmail.com",
    password: "4",
    isSecure: true,
  });
  const { isLoading, username, password, isSecure } = state;

  const navigation = useNavigation();

  const updateState = (data) => setState(() => ({ ...state, ...data }));

  const isValidData = () => {
    const error = validatorLogin({
      username,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      updateState({ isLoading: true });
      try {
        var bodyFormData = new FormData();
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);

        const res = await actions.login(bodyFormData);
        showSuccess("Login successfully...!!!!");
        updateState({ isLoading: false });
        await actions.setIsLogin(true);
        navigation.navigate("HomeTab", {
          screen: "Signup",
        });
      } catch (error) {
        showError(error.error_message);
        await actions.setIsLogin(false);
        updateState({ isLoading: false });
      }
    }
  };
  return (
    <ImageBackground style={styles.image} blurRadius={10}>
      <View
        className="flex-[1] px-[20]  justify-center pt-[0]"
        style={{ backgroundColor: Color.mainTheme }}
      >
        <View className=" ">
          <View style={{ alignItems: "center" }}>
            <Image
              className="w-40 h-40 object-cover"
              style={{ transform: [{ rotate: "-5deg" }] }}
              source={LoginImg}
            />
          </View>
          <Text className="mb-[30] font-lg text-[28px] text-[#333] ">
            Đăng nhập
          </Text>

          <InputFieldCustom
            label="Username"
            placeholder="enter your username"
            value={username}
            onChangeText={(username) => updateState({ username })}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
          />

          <InputFieldCustom
            label="Password"
            placeholder="enter your password"
            value={password}
            // isSecure={true}
            // secureTextEntry={isSecure}
            onChangeText={(password) => updateState({ password })}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
          />
          <CustomButton
            label={"Login"}
            onPress={onLogin}
            isLoading={isLoading}
            isDisable={isLoading}
            dis
          />

          <View className="mt-[1px] justify-center flex-row">
            <Text>Chưa có tài khoảng?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text className=" font-[700] text-[#AD40AF]"> Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: Color.mainTheme,
  },
});
