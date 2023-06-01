import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeroImage, ShoesFLas } from "../public/assets";
import * as Animatable from "react-native-animatable";
import actions from "../redux/actions";
import { useSelector } from "react-redux";
import { showError } from "../ultils/helperFunction";
import Color from "../constans/Color";
import { GET_DETAIL_USERS } from "../config/urls";
import { saveDetailUser, saveUserData } from "../redux/actions/auth";
import { apiGet } from "../ultils/utilsApi";
import { banner1, banner2, banner3 } from "../public/assets/image";
import { FONTS, SIZES } from "../constans/Theme";
import Swiper from "react-native-swiper";

const HomeScreen = () => {
  const navigation = useNavigation();
  const tokenData = useSelector((state) => state.auth.tokenData);
  const detailData = useSelector((state) => state.auth.detailUser);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    console.log(tokenData);
    console.log(detailData);
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

  const refreshToken = async (refresh_token = tokenData.refresh_token) => {
    // try {
    //   const res = await actions.refreshToken(refresh_token);
    //   console.log(res.data);
    // } catch (error) {
    //   console.log("////////////");
    //   showError(error.error_message);
    // }
  };

  const getDetailUser = async () => {
    await apiGet(GET_DETAIL_USERS, {}, {}, true)
      .then((res) => {
        console.log("GET_DETAIL_USERS");
        saveDetailUser(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          marginBottom: 10,
          paddingHorizontal: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h2 }}>
            Xin chào, {`${detailData.username}`}{" "}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="bg-red-100 flex-1 relative "
      style={{ backgroundColor: Color.mainTheme }}
    >
      {renderHeader()}
      {/* First Section */}
      <View className="flex-row px-6 mt-5 items-center space-x-2">
        <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
          <Text className="text-[#00BCC9] text-2xl font-semibold">Go</Text>
        </View>
        <Text
          className="text-[#2A2B4B] text-2xl font-semibold"
          style={{ color: "rgb(0 188 201)" }}
        >
          Shoes ERIC
        </Text>
        <TouchableOpacity onPress={() => refreshToken()}>
          <Text>dsfdsf</Text>
        </TouchableOpacity>
      </View>

      {/* Seccond Section */}
      <View className="px-6 mt-5 space-y-2" style={{ zIndex: 0 }}>
        <Text className="text-[#3c6072] text-[38px]">Enjoy the </Text>
        <Text className="text-[#00BCC9] text-[34px] font-bold">
          Good moments
        </Text>

        <Text className="text-[#3C6072]">
          Lsdjas ddasvnkdjck xlcvv ndsvsdvnk svsdcsdcsdcmv sdskdvlsdvdskvm slkv
          sldv sldv
        </Text>
      </View>

      {/* Swiper Section */}
      <View style={{ marginTop: 5, zIndex: 10, marginHorizontal: 5 }}>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal={true}
            height={200}
            activeDotColor="#FF6347"
          >
            <View style={{ ...styles.slide, flex: 1 }}>
              <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
                <Text className="text-[#00BCC9] text-2xl font-semibold">
                  Go
                </Text>
              </View>
              <Text
                className="text-[#2A2B4B] text-2xl font-semibold"
                style={{ color: "rgb(0 188 201)" }}
              >
                Shoes ERIC
              </Text>
            </View>

            {/* <View style={styles.slide}>
              <Image
                source={banner1}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={banner2}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={banner3}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View> */}
          </Swiper>
        </View>
      </View>

      {/* Circel Section */}
      <View
        className="w-[300px] h-[300px] bg-[#00BCC9]
         rounded-full absolute bottom-36  -right-1/4"
        style={{ opacity: 0.1, zIndex: -10 }}
      ></View>
      <View
        className="w-[300px] h-[300px] bg-[#E99265]
         rounded-full absolute -bottom-20 -left-1/4"
        style={{ opacity: 0.1, zIndex: -10 }}
      ></View>

      {/* Circel Section */}
      <View
        className="flex-1 relative items-center justify-center"
        style={{ zIndex: -10 }}
      >
        {/* <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={ShoesFLas}
          className="w-80 h-80 object-cover mt-20"
        /> */}

        {/* <TouchableOpacity
          onPress={() => getDetailUser()}
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
        </TouchableOpacity> */}
      </View>

      <ScrollView>
        <Text>
          "access_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdfQ.yX_06xiMUKl4oDscAIk8FTWkm-s50zn6MdUZk2ceFMs",
          "refresh_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIn0.yDC7XkdXs1biumfsFBT8zqKzZVQAwpgVuXLM0zeps_I"
        </Text>
        <Text>
          "access_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdfQ.yX_06xiMUKl4oDscAIk8FTWkm-s50zn6MdUZk2ceFMs",
          "refresh_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIn0.yDC7XkdXs1biumfsFBT8zqKzZVQAwpgVuXLM0zeps_I"
        </Text>
        <Text>
          "access_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdfQ.yX_06xiMUKl4oDscAIk8FTWkm-s50zn6MdUZk2ceFMs",
          "refresh_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIn0.yDC7XkdXs1biumfsFBT8zqKzZVQAwpgVuXLM0zeps_I"
        </Text>
        <Text>
          "access_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdfQ.yX_06xiMUKl4oDscAIk8FTWkm-s50zn6MdUZk2ceFMs",
          "refresh_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIn0.yDC7XkdXs1biumfsFBT8zqKzZVQAwpgVuXLM0zeps_I"
        </Text>
        <Text>
          "access_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdfQ.yX_06xiMUKl4oDscAIk8FTWkm-s50zn6MdUZk2ceFMs",
          "refresh_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIn0.yDC7XkdXs1biumfsFBT8zqKzZVQAwpgVuXLM0zeps_I"
        </Text>
        <Text>
          "access_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdfQ.yX_06xiMUKl4oDscAIk8FTWkm-s50zn6MdUZk2ceFMs",
          "refresh_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIn0.yDC7XkdXs1biumfsFBT8zqKzZVQAwpgVuXLM0zeps_I"
        </Text>
        <Text>
          "access_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdfQ.yX_06xiMUKl4oDscAIk8FTWkm-s50zn6MdUZk2ceFMs",
          "refresh_token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImV4cCI6MTY4NTYzMjExOCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44OjgwODAvYXBpL2xvZ2luIn0.yDC7XkdXs1biumfsFBT8zqKzZVQAwpgVuXLM0zeps_I"
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: Color.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: Color.green,
  },
  card: {
    height: 250,
    backgroundColor: Color.light,
    width: SIZES.width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: Color.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: Color.darkGray,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Color.green,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    height: 200,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },

  sliderContainer: {
    height: 200,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
});
