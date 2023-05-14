import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { validatorLogin } from "../ultils/validations";
import { showError, showSuccess } from "../ultils/helperFunction";
import actions from "../redux/actions";
import { LoginImg } from "../public/assets";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import InputFieldCustom from "../components/InputFieldCustom";
import CustomButton from "../components/CustomButton/index.js";

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    isLoading: false,
    username: "1@gmail.com",
    password: "1",
    isSecure: true,
  });
  const { isLoading, username, password, isSecure } = state;

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
      } catch (error) {
        showError(error.error_message);
        updateState({ isLoading: false });
      }
    }
  };
  return (
    <View className="flex-[1] px-[20]  justify-center pt-[0]">
      <View className=" ">
        <View style={{ alignItems: "center" }}>
          <Image
            className="w-40 h-40 object-cover"
            style={{ transform: [{ rotate: "-5deg" }] }}
            source={LoginImg}
          />
        </View>
        <Text className="mb-[30] font-lg text-[28px] text-[#333] ">Login</Text>

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
        <CustomButton label={"Login"} onPress={onLogin} isLoading={isLoading} />

        <View className="mt-[1px] justify-center flex-row">
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className=" font-[700] text-[#AD40AF]"> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
// import ButtonWithLoader from '../components/ButtonWithLoader';
// import TextInputWithLable from '../components/TextInputWithLable';
// import validator from '../ultils/validations';
// import { showError } from '../ultils/helperFunction';
// import actions from '../redux/actions';
// import { showMessage } from 'react-native-flash-message';

// const LoginScreen = ({ navigation }) => {

//     const [state, setState] = useState({
//         isLoading: false,
//         username: '1',
//         password: '1',
//         isSecure: true
//     })
//     const { isLoading, username, password, isSecure } = state
//     const updateState = (data) => setState(() => ({ ...state, ...data }))

//     const isValidData = () => {
//         const error = validator({
//             username,
//             password
//         })
//         if (error) {
//             showError(error)
//             return false
//         }
//         return true
//     }

//     const onLogin = async () => {
//         const checkValid = isValidData()
//         if (checkValid) {
//             updateState({ isLoading: true })
//             try {
//                 var bodyFormData = new FormData();
//                 bodyFormData.append('username', username);
//                 bodyFormData.append('password', password);

//                 const res = await actions.login(bodyFormData)
//                 showMessage("Login successfully...!!!!")
//                 updateState({ isLoading: false })
//             } catch (error) {
//                 showError(error.error_message)
//                 updateState({ isLoading: false })
//             }
//         }
//     }
//     return (
//         <View style={styles.container}>
//             <TextInputWithLable
//                 label="Username"
//                 placheHolder="enter your username"
//                 value={state.username}
//                 onChangeText={(username) => updateState({ username })}
//             />
//             <TextInputWithLable
//                 label="Password"
//                 placheHolder="enter your password"
//                 value={state.password}

//                 // isSecure={isSecure}
//                 secureTextEntry={isSecure}
//                 onChangeText={(password) => updateState({ password })}
//             />

//             <ButtonWithLoader
//                 text="Login"
//                 onPress={onLogin}
//                 isLoading={isLoading}
//             />

//             <View style={{marginVertical: 8}} />

//             <ButtonWithLoader
//                 text="Signup"
//                 onPress={() => navigation.navigate('Signup')}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: 'white'
//     },
// });

// export default LoginScreen;
