import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";

import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Color from "../constans/Color";
import { Color } from "../constans";
import { product_tabs } from "../constans/raw";

import Icons, { icons } from "../components/Icons";
import { useNavigation } from "@react-navigation/core";
import LineDivider from "../components/LineDivider";

import {
  DetailProduct,
  DetailShop,
  DetailDiscussion,
} from "../components/DetailProductTabs";
import hideTabBar from "../hookFuntion/hideTabBar ";
import * as ImagePicker from "expo-image-picker";
import actions from "../redux/actions";
import { showError } from "../ultils/helperFunction";
import MasonryListProducts from "../components/Search/MasonryListProducts";

// const { width, height } = Dimensions.get("window");
const width = Dimensions.get("window").width / 2 - 30;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 65;
const MAX_HEIGHT = 200;
const product_details_tabs = product_tabs.map((product_details_tab) => ({
  ...product_details_tab,
  ref: React.createRef(),
}));

const SearchImageScreen = () => {
  /// Cac state reder chon Image
  const navTitleView = useRef(null);
  const [scrollY] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [homeBarColor, setHomeBarColor] = useState("rgba(0,0,0,0.2)");
  const [homeIconBColor, setHomeIconColor] = useState(Color.textLight);
  const interpolateColor = (value) => {
    // Điều chỉnh các giá trị này để tùy chỉnh màu nền dựa trên giá trị cuộn
    const startValue = 0;
    const endValue = 200;

    const startColorGround = "rgba(0,0,0,0.2)";
    const endColorGround = "white";
    const colorGround = scrollY.interpolate({
      inputRange: [startValue, endValue],
      outputRange: [startColorGround, endColorGround],
      extrapolate: "clamp",
    });

    const startIconBColor = Color.textLight;
    const endIconBColor = Color.mainColor;
    const colorIconBColor = scrollY.interpolate({
      inputRange: [startValue, endValue],
      outputRange: [startIconBColor, endIconBColor],
      extrapolate: "clamp",
    });

    return [colorGround, colorIconBColor];
  };

  /// State
  const [pickedImagePath, setPickedImagePath] = useState(null);
  const [listSearch, setListSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      if (pickedImagePath) {
        try {
          setIsLoading(true);
          const res = await actions.searchWithImage(pickedImagePath);
          setListSearch(res.data);
          console.log(res.data);
          setIsLoading(false);
        } catch (error) {
          console.log("Có lỗi xảy ra");
          showError(error.error_message);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [pickedImagePath]);

  function renderMainImage() {
    return (
      <View
        style={{
          marginVertical: 5,
          alignItems: "center",
          // alignSelf: "center",
          borderWidth: 2,
          height: MAX_HEIGHT,
          paddingVertical: 5,
          paddingHorizontal: 5,
          margin: 20,
          backgroundColor: Color.mainColor,
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {!pickedImagePath ? (
          <Image
            source={require("../public/assets/splashShoe.png")}
            // source={{
            //   uri: "https://sneakerdaily.vn/wp-content/uploads/2022/11/giay-chay-bo-nike-quest-5-black-grey-white-dd0204-001-2.jpg",
            // }}
            style={{
              // width: (windowHeight * 1) / 5,
              // height: (windowHeight * 1) / 5,
              // borderRadius: 16,
              // borderWidth: 1,

              height: MAX_HEIGHT / 2,
              width: MAX_HEIGHT / 2,
              // alignSelf: "center",
              // justifyContent: "center",
              alignSelf: "center",
              // alignSelf: "stretch",
              resizeMode: "cover",
            }}
          />
        ) : (
          <Image
            source={{ uri: pickedImagePath }}
            style={{
              height: MAX_HEIGHT,
              width: width,
              alignSelf: "stretch",
              resizeMode: "cover",
            }}
          />
        )}
      </View>
    );
  }

  function renderButtonChose() {
    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result.assets);
        setPickedImagePath(result.assets[0].uri);
      }
    };

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        // setPickedImagePath(result.assets[0].uri);
        // fetchData();
        // actions.updateIsLoading(true);
        // setLoading(true);
      }
    };
    return (
      <View style={styles.buttonContainer}>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => openCamera()}
          style={{ marginRight: 20 }}
        >
          Camera
        </Button>
        <Button
          icon="image-multiple"
          mode="outlined"
          onPress={() => showImagePicker()}
          style={{ backgroundColor: "white" }}
        >
          Gallery
        </Button>
      </View>
    );
  }

  function renderHeader() {
    return (
      <Animated.View
        style={{
          ...styles.headerWrapperHeader,
        }}
      >
        {/* Icon call back  */}
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('CommunityTab', { screen: 'CommunityReply',  params: {key: 'value'}});
            navigation.navigate("SearchTab", {
              screen: "SearchText",
            });
            // navigation.goBack();
          }}
        >
          <Animated.View
            style={{
              ...styles.backStyles,
              backgroundColor: homeBarColor,
            }}
          >
            <Icons
              icon={icons.Feather}
              size={18}
              color={Color.black}
              name={"chevron-left"}
            />
          </Animated.View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          {/* Icon 1  */}
          <TouchableOpacity>
            <Animated.View
              style={{
                ...styles.rightHomeIconStyle,
                backgroundColor: homeBarColor,
                borderColor: homeIconBColor,
              }}
            >
              <Icons
                icon={icons.Feather}
                size={20}
                color={Color.mainColor}
                name={"chevron-left"}
              />
            </Animated.View>
          </TouchableOpacity>

          {/* Icon 2  */}
          <TouchableOpacity>
            <Animated.View
              style={{
                ...styles.rightHomeIconStyle,
                backgroundColor: homeBarColor,
                borderColor: homeIconBColor,
              }}
            >
              <Icons
                icon={icons.Ionicons}
                size={20}
                name="ellipsis-vertical-outline"
                color={Color.mainColor}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  function renderContent() {
    return isLoading ? (
      <ActivityIndicator color="#01c6b2" size="large" />
    ) : (
      <MasonryListProducts
        data={listSearch.filter(
          (item) => item.images[0].isProductImage === true
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ImageHeaderScrollView
        maxHeight={expanded ? MAX_HEIGHT : MIN_HEIGHT}
        minHeight={MIN_HEIGHT}
        // maxOverlayOpacity={0.3}
        // minOverlayOpacity={0.3}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        renderHeader={() => renderMainImage()}
      >
        <TriggeringView
          style={{
            ...styles.section,
            borderTopColor: Color.darkGray,
            borderTopWidth: 1,
          }}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          {renderButtonChose()}
        </TriggeringView>

        {/* <TriggeringView
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Color.textLight,
            backgroundColor: "white",
            borderTopColor: Color.darkGray,
            borderTopWidth: 1,
            position: "relative",
          }}
        >
         
        </TriggeringView> */}
        {renderContent()}
      </ImageHeaderScrollView>
    </View>
  );
};

export default SearchImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: Color.mainColor,
  },
  image: {
    height: MAX_HEIGHT,
    width: width,
    alignSelf: "stretch",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  shadowTouch: {
    borderRadius: 16,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.textLight,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    // marginBottom: 3,
    // bottom: 24,
    top: -24,
    backgroundColor: Color.mainColor,
    borderWidth: 1,
  },
  headerWrapperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 16,
    height: Dimensions.get("window").height / 15,
    marginHorizontal: 5,
    marginTop: 5,
    zIndex: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },

  backStyles: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: Color.textLight,
  },
  rightHomeIconStyle: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 50,
    borderColor: Color.textLight,
  },
});
