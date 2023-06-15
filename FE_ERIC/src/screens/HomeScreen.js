import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeroImage, ShoesFLas } from "../public/assets";
import * as Animatable from "react-native-animatable";
import actions from "../redux/actions";
import { useSelector } from "react-redux";
import { showError } from "../ultils/messageFunction";
import Color from "../constans/Color";
import { GET_DETAIL_USERS } from "../config/urls";
import { saveDetailUser } from "../redux/actions/auth";
import { apiGet } from "../ultils/utilsApi";
import { banner1, banner2, banner3, bg1, bg2 } from "../public/assets/image";
import { FONTS, SIZES } from "../constans/Theme";
import Swiper from "react-native-swiper";
import Moment from "moment";
import { newListProduct, typeList } from "../constans/raw";
import {
  HorizontalProductCard,
  SectionHome,
  TypeCard,
} from "../components/Home";
import LottieLoading from "../components/LottieLoading";

const HomeScreen = () => {
  const navigation = useNavigation();
  const tokenData = useSelector((state) => state.auth.tokenData);
  const detailData = useSelector((state) => state.auth.detailUser);

  const currentDate = Moment();
  const formattedDate = currentDate.format("dddd, DD/MM/YYYY");

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
    } catch (error) {
      showError(error.error_message);
    }
  };

  const getDetailUser = async () => {
    await apiGet(GET_DETAIL_USERS, {}, {}, true)
      .then((res) => {
        console.log("GET_DETAIL_USERS");
        saveDetailUser(res.data);
      })
      .catch((error) => {});
  };

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          paddingHorizontal: 10,
          position: "absolute",
          top: 20,

          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h3 }}>
            Xin chào, {detailData?.username || null}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...FONTS.body4, color: Color.textLight }}
          >
            {formattedDate}
          </Text>
        </View>
      </View>
    );
  }

  function renderListType() {
    return (
      <SectionHome title={"Loại"} containerStyle={{ marginTop: 20 }}>
        <FlatList
          horizontal
          data={typeList}
          keyExtractor={(item) => item?.value}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.base,
          }}
          renderItem={({ item, index }) => (
            <TypeCard
              type={item}
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                marginRight: index == typeList.length - 1 ? SIZES.padding : 0,
              }}
            ></TypeCard>
          )}
        ></FlatList>
      </SectionHome>
    );
  }

  function renderPopularList() {
    return (
      <SectionHome title={"Thịnh hành"} containerStyle={{}}>
        <FlatList
          data={newListProduct}
          scrollEnabled={false}
          keyExtractor={(item) => `popular-${item?.id}`}
          contentContainerStyle={{ marginHorizontal: 10 }}
          renderItem={({ item, index }) => {
            return (
              <HorizontalProductCard
                product={item}
                containerStyle={{
                  // marginVertical: 20,
                  marginTop: index == 0 ? SIZES.radius : SIZES.padding,
                }}
              />
            );
          }}
        />
      </SectionHome>
    );
  }

  return (
    // <LottieLoading />
    <SafeAreaView
      // className="bg-red-100 flex-1 relative "

      style={{
        backgroundColor: Color.mainTheme,
        flex: 1,
      }}
    >
      {renderHeader()}

      {/* First Section DONE */}
      <View
        className="flex-row px-3 mt-3 mb-3 items-center space-x-2"
        style={{ marginTop: 50 }}
      >
        <View className="w-12 h-12 bg-black rounded-full items-center justify-center">
          <Text
            className="text-[#00BCC9]  font-semibold"
            style={{ fontSize: 20, lineHeight: 32, color: Color.blueTheme }}
          >
            Go
          </Text>
        </View>
        <Text
          className="text-[#2A2B4B]  font-semibold"
          style={{
            fontSize: 20,
            lineHeight: 32,
            fontFamily: "Roboto-Bold",
          }}
        >
          Shoes ERIC
        </Text>
      </View>

      <View
        style={{
          // flex: 1,
          alignItems: "flex-start",
          backgroundColor: "transparent",
          borderRadius: 8,
          paddingHorizontal: 6,
          color: Color.mainColor,
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Text
          className="text-[#3c6072] text-[36px]"
          style={{ alignSelf: "flex-start" }}
        >
          Chào mừng đến với
        </Text>
        <Text className="text-[#00BCC9] text-[30px] font-bold">Shoes ERIC</Text>

        <Text className="text-[#3C6072]">
          Hãy để chúng tôi giúp bạn tìm sản phẩm mà bạn mong muốn
        </Text>
      </View>

      {/* Second Section DONE */}
      {/* <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
          height: 150,
          width: "100%",
          marginTop: 10,
          // justifyContent: "center",
          alignSelf: "center",
          borderRadius: 8,
          // height: 180,
          marginTop: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            // justifyContent: "center",
            backgroundColor: "transparent",
            borderRadius: 8,
            paddingHorizontal: 6,
            color: Color.mainColor,
          }}
        >
          <Text
            className="text-[#3c6072] text-[36px]"
            style={{ alignSelf: "flex-start" }}
          >
            Chào mừng đến với
          </Text>
          <Text
            className="text-[#00BCC9] text-[30px] font-bold"
            // style={{ color: Color.mainTheme }}
          >
            Shoes ERIC
          </Text>

          <Text className="text-[#3C6072]">
            Hãy để chúng tôi giúp bạn tìm sản phẩm mà bạn mong muốn
          </Text>
        </View>
      </View> */}

      <ScrollView>
        {/* Swiper Section */}
        <View
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 10,
            ...styles.sliderContainer,
            marginTop: 0,
            borderRadius: 10,
          }}
        >
          <Swiper
            autoplay
            horizontal={false}
            height={180}
            activeDotColor={Color.mainColor}
          >
            {/* <ImageBackground
            source={bg1}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              // borderRadius: 10,
              paddingHorizontal: 10,
              color: Color.mainColor,
            }}
            imageStyle={{ borderRadius: 10, opacity: 0.5 }}
          >
            <Text
              className="text-[#3c6072] text-[26px]"
              style={{ ...FONTS.body2, color: Color.white }}
            >
              Chào mừng đến với
            </Text>
            <Text
              className="text-[#00BCC9] text-[30px] font-bold"
              style={{ color: Color.white }}
            >
              Shoes ERIC
            </Text>

            <Text
              className="text-[#3C6072]"
              style={{ color: Color.white, marginTop: 8, ...FONTS.body4 }}
            >
              Hãy để chúng tôi giúp bạn tìm sản phẩm mà bạn mong muốn
            </Text>
          </ImageBackground>

          <ImageBackground
            source={bg2}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              borderRadius: 10,
              paddingHorizontal: 10,
              color: Color.mainColor,
            }}
            imageStyle={{ borderRadius: 8, opacity: 0.8 }}
          >
            <Text
              className="text-[#3c6072] text-[30px]"
              style={{ alignSelf: "flex-start" }}
            >
              Chào mừng đến với
            </Text>
            <Text
              className="text-[#00BCC9] text-[34px] font-bold"
              style={{
                color: Color.mainColor,
                ...FONTS.h1,
                fontSize: 34,
                marginTop: 8,
              }}
            >
              Shoes ERIC
            </Text>

            <Text
              className="text-[#3C6072]"
              style={{ color: Color.white, marginTop: 8, ...FONTS.body4 }}
            >
              Hãy để chúng tôi giúp bạn tìm sản phẩm mà bạn mong muốn
            </Text>
          </ImageBackground> */}

            <View style={styles.slide}>
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
            </View>
          </Swiper>
        </View>

        {/* <LineDivider /> */}

        {renderListType()}

        {renderPopularList()}
      </ScrollView>

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
      {/* <View
        className="flex-1 relative items-center justify-center"
        style={{ zIndex: -10 }}
      >
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={ShoesFLas}
          className="w-80 h-80 object-cover mt-20"
        />

        <TouchableOpacity
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
        </TouchableOpacity>
      </View> */}

      {/* <ScrollView> */}

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
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
    height: 180,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  sessionRow: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
  },
  title: { flex: 1, ...FONTS.h2 },
});
