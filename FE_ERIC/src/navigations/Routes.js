import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen
          name="HomeTab"
          component={CreatePostScreen}
        ></Stack.Screen> */}
        {/* {MainStack(Stack)} */}
        {!!userData && userData?.access_token
          ? MainStack(Stack)
          : AuthStack(Stack)}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Routes;
