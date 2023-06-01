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
  const tokenData = useSelector((state) => state.auth.tokenData);
  const detailUser = useSelector((state) => state.auth.detailUser);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {!!tokenData && tokenData?.access_token */}
        {!!detailUser?.email ? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Routes;
