import { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import COLORS from "../constans/Color";
import SearchInput from "../components/Search/SearchInput";
import Color from "../constans/Color";
import actions from "../redux/actions";

import MasonryListAll from "../components/Search/MasonryListAll";
import MasonryListProducts from "../components/Search/MasonryListProducts";
import MasonryListPosts from "../components/Search/MasonryListPosts";
import { useSelector } from "react-redux";
import { showError } from "../ultils/helperFunction";
import { updateCategoryIndex, updateIsLoading } from "../redux/actions/search";
import { SEARCH_POST_B_TEXT, SEARCH_PRODUCT_B_TEXT } from "../config/urls";

const width = Dimensions.get("window").width / 2 - 30;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SearchScreen() {
  const listAll = useSelector((state) => state.search.listSearch);
  // const listAll =

  const showAllCategories = useSelector(
    (state) => state.search.showAllCategories
  );

  const pagePost = useSelector((state) => state.search.pagePost);
  const pageProduct = useSelector((state) => state.search.pageProduct);

  const isMainViewVisible = useSelector(
    (state) => state.search.isMainViewVisible
  );

  const searchText = useSelector((state) => state.search.searchText);

  const loading = useSelector((state) => state.search.isLoading);

  const categoryIndex = useSelector((state) => state.search.categoryIndex);

  const [isLoading, setIsLoading] = useState(false);

  const [pickedImagePath, setPickedImagePath] = useState("");
  const [loadingEndScroll, setLoadingEndScroll] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const CATEGORIES = ["All", "Products", "Posts"];

  useEffect(() => {}, []);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (showAllCategories == false) {
      const { contentOffset, layoutMeasurement, contentSize } =
        event.nativeEvent;
      const isEndReached =
        contentOffset.y + layoutMeasurement.height >= contentSize.height;

      if (isEndReached && !isLoading) {
        console.log("cuoou");
        fetchDataSearch();
      }
    } else {
      if (offsetY < 200) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          // Animated.timing(translateYAnim, {
          //   toValue: 0,
          //   duration: 100,
          //   useNativeDriver: true,
          // }),
        ]).start(() => {
          actions.updateIsMainViewDisplay(true);
        });
      } else {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          // Animated.timing(translateYAnim, {
          //   toValue: -100,
          //   duration: 100,
          //   useNativeDriver: true,
          // }),
        ]).start(() => {
          actions.updateIsMainViewDisplay(false);
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (pickedImagePath) {
        try {
          const res = await actions.searchWithImage(pickedImagePath);
          const a = actions.updateShowAllCategories(true);
          console.log(showAllCategories);
          actions.updateIsLoading(false);
        } catch (error) {
          console.log("Có lỗi xảy ra");
          showError(error.error_message);
          actions.updateIsLoading(false);
        }
      }
    };
    fetchData();
  }, [pickedImagePath]);

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
      // fetchData();
      // setLoading(true);
      actions.updateIsLoading(true);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

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
      setPickedImagePath(result.assets[0].uri);
      // fetchData();
      actions.updateIsLoading(true);

      // setLoading(true);
    }
  };

  const fetchDataSearch = async () => {
    if (true) {
      try {
        // actions.updateIsLoading(true);
        setLoadingEndScroll(true);

        const res = await actions.fetchDataForSearchText(
          searchText,
          categoryIndex == 1 ? pageProduct + 1 : pagePost + 1,
          categoryIndex == 1 ? SEARCH_PRODUCT_B_TEXT : SEARCH_POST_B_TEXT
        );
        actions.saveListSearch([...listAll, ...res.data]);

        (await categoryIndex) == 1
          ? actions.updatePageProduct(pageProduct + 1)
          : actions.updatePagePost(pagePost + 1);
        // actions.updateIsLoading(false);

        console.log("Post:_", pagePost, "/Product_", pageProduct);
        setLoadingEndScroll(false);
      } catch (error) {
        console.log("Có lỗi xảy ra");
        showError(error.error_message);
      }
    }
  };
  return (
    <View style={style.container}>
      {/* Search Bar */}
      <SearchInput />

      {isMainViewVisible && (
        <Animated.View
          style={{
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            opacity: fadeAnim,
            borderBottomColor: COLORS.backGround,
          }}
        >
          <View
            style={{
              marginVertical: 5,
            }}
          >
            {!pickedImagePath ? (
              <Image
                source={require("../public/assets/splashShoe.png")}
                // style={{ width: 200, height: 200 }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: (windowHeight * 1) / 5,
                  height: (windowHeight * 1) / 5,
                  borderRadius: 16,
                  borderColor: COLORS.darkGray,
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                }}
              />
            ) : (
              <Image
                source={{ uri: pickedImagePath }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: (windowWidth * 4) / 5,
                  height: (windowHeight * 1) / 5,
                  borderRadius: 16,
                  borderColor: COLORS.darkGray,
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                }}
              />
            )}
          </View>

          <View style={style.buttonContainer}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => openCamera()}
              style={style.mRight20}
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
        </Animated.View>
      )}

      {loading == true ? (
        <ActivityIndicator color="#01c6b2" size="large"></ActivityIndicator>
      ) : (
        <>
          <View
            style={{
              paddingVertical: 3,
            }}
          >
            {/* {true ? (
          <FlatList
            data={CATEGORIES}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
              flexGrow: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
            renderItem={({ item, index }) => {
              const isSelected = categoryIndex === index;
              // const shouldDisplay = !showAllCategories && index === 0;
              const shouldDisplay = showAllCategories || index !== 0;

              return (
                <TouchableOpacity
                  onPress={() => {
                    updateCategoryIndex(index);
                  }}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 6,
                    borderBottomColor: isSelected ? Color.blueMain : null,
                    borderBottomWidth: isSelected ? 1 : 0,
                    display: shouldDisplay ? "flex" : "none",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 14,
                      opacity: isSelected ? 1 : 0.5,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            data={CATEGORIES}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
              flexGrow: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
            renderItem={({ item, index }) => {
              const isSelected = categoryIndex === index;
              return (
                <TouchableOpacity
                  onPress={() => {
                    // setCategoryIndex(index);
                    updateCategoryIndex(index);
                    // call api tuy theo index o day
                    // khong chi cap nhat index ma con phai load lai du lieu nua kia
                  }}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 6,
                    borderBottomColor: isSelected ? Color.blueMain : null,
                    borderBottomWidth: isSelected ? 1 : 0,
                    // display: shouldDisplay ? "flex" : "none",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 14,
                      opacity: isSelected ? 1 : 0.5,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )} */}

            {
              <FlatList
                data={CATEGORIES}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 12,
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
                renderItem={({ item, index }) => {
                  const isSelected = categoryIndex === index;
                  const shouldDisplay = showAllCategories || index !== 0;

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        updateCategoryIndex(index);
                      }}
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 6,
                        borderBottomColor: isSelected ? Color.blueMain : null,
                        borderBottomWidth: isSelected ? 1 : 0,
                        display: shouldDisplay ? "flex" : "none",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 14,
                          opacity: isSelected ? 1 : 0.5,
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            }
          </View>
          <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{}}
          >
            {listAll && categoryIndex === 0 ? (
              <MasonryListAll data={listAll} />
            ) : null}
            {listAll && categoryIndex === 1 ? (
              <MasonryListProducts
                data={listAll.filter(
                  (item) => item.images[0].isProductImage === true
                )}
              />
            ) : null}
            {listAll && categoryIndex === 2 ? (
              <MasonryListPosts
                data={listAll.filter(
                  (item) => item.images[0].isProductImage === false
                )}
              />
            ) : null}

            {loadingEndScroll && (
              <View>
                <ActivityIndicator />
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1FD",
    // marginBottom: 50,
    // paddingBottom:50
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#561870",
    marginTop: 80,
    marginBottom: 0,
  },

  image_ai: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    // marginBottom: 3,
    // bottom: 24,
    top: -24,
    marginBottom: -24,
  },
  mRight20: { marginRight: 20 },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.light,
    width,
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
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
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
});
