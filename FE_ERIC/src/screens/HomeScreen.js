import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeroImage, ShoesFLas } from "../public/assets";
import * as Animatable from "react-native-animatable";
import actions from "../redux/actions";
import { useSelector } from "react-redux";
import { showError } from "../ultils/helperFunction";

const HomeScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth.userData);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const navigatorToScreen = () => {
    navigation.navigate("DiscoverTab", { screen: "DetailPost" });
  };

  const getAllUsses = async () => {
    try {
      const res = await actions.getAllUsers();
      console.log(res.data);
    } catch (error) {
      console.log("co loi");
      showError(error.error_message);
    }
  };

  const refreshToken = async (refresh_token = userData.refresh_token) => {
    try {
      const res = await actions.refreshToken(refresh_token);
      console.log(res.data);
    } catch (error) {
      showError(error.error_message);
    }
  };

  return (
    <SafeAreaView className="bg-red-100 flex-1 relative ">
      {/* First Section */}
      <View className="flex-row px-6 mt-5 items-center space-x-2">
        <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
          <Text className="text-[#00BCC9] text-2xl font-semibold">Go</Text>
        </View>
        <Text className="text-[#2A2B4B] text-2xl font-semibold">
          {" "}
          Shoes ERIC
        </Text>
      </View>

      {/* Seccond Section */}
      <View className="px-6 mt-5 space-y-2">
        <Text className="text-[#3c6072] text-[38px]">Enjoy the </Text>
        <Text className="text-[#00BCC9] text-[34px] font-bold">
          Good moments
        </Text>

        <Text className="text-[#3C6072]">
          Lsdjas ddasvnkdjck xlcvv ndsvsdvnk svsdcsdcsdcmv sdskdvlsdvdskvm slkv
          sldv sldv
        </Text>
      </View>

      {/* Circel Section */}
      <View
        className="w-[300px] h-[300px] bg-[#00BCC9]
         rounded-full absolute bottom-36  -right-1/4"
      ></View>
      <View
        className="w-[300px] h-[300px] bg-[#E99265]
         rounded-full absolute -bottom-20 -left-1/4"
      ></View>

      {/* Circel Section */}
      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={ShoesFLas}
          className="w-80 h-80 object-cover mt-20"
        />

        <TouchableOpacity
          onPress={() => getAllUsses()}
          // onPress={() => testAxios()}
          className=" absolute bottom-[100px] w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
        >
          <Animatable.View
            className="w-20  h-20 items-center justify-center rounded-full bg-[#00BCC9]"
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
          >
            <Text className="text-gray-50 text-[34px] font-semibold">GO</Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("HomeTab", { screen: "Feed" })}
          // onPress={() => testAxios()}
          className=" absolute bottom-50 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
        >
          <Animatable.View
            className="w-20  h-20 items-center justify-center rounded-full bg-[#00BCC9]"
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
          >
            <Text className="text-gray-50 text-[34px] font-semibold">Re</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
