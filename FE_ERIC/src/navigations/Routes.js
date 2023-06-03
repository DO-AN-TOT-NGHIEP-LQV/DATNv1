import { View, Text } from "react-native";
import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

const Routes = () => {
  // const tokenData = useSelector((state) => state.auth.tokenData);
  // const detailUser = useSelector((state) => state.auth.detailUser);
  // const loginRequired = useSelector((state) => state.auth.loginRequired);

  const flashMessageRef = useRef(null);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {!!tokenData && tokenData?.access_token */}
        {/* MainStack(Stack) */}
        {MainStack(Stack)}
        {AuthStack(Stack)}
        {/* {!!detailUser?.email ? MainStack(Stack) : AuthStack(Stack)} */}
        {/* {loginRequired ? MainStack(Stack) : AuthStack(Stack)} */}
      </Stack.Navigator>
      <FlashMessage
        refs={flashMessageRef}
        position="top"
        style={{ zIndex: 100 }}
      />
    </NavigationContainer>
  );
};

export default Routes;
