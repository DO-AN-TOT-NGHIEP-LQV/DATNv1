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
} from "react-native";

import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../constans/Color";
import { FONTS } from "../constans/Theme";

import { product_tabs } from "../constans/raw";

import Icons, { icons } from "../components/Icons";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import LineDivider from "../components/LineDivider";

import {
  DetailProduct,
  DetailShop,
  DetailDiscussion,
} from "../components/DetailProductTabs";
import AuthRequired from "../components/AuthRequired";
import { useSelector } from "react-redux";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 65;
const MAX_HEIGHT = 300;

const product_details_tabs = product_tabs.map((product_details_tab) => ({
  ...product_details_tab,
  ref: React.createRef(),
}));

const DetailProductScreen = ({ route }) => {
  // const dataProduct = route.params.dataProduct;
  const { dataProduct, fromManagement, shopId } = route.params;

  // Cac state cho Home icon
  const navTitleView = useRef(null);
  const [scrollY] = useState(new Animated.Value(0));
  const [homeBarColor, setHomeBarColor] = useState("rgba(0,0,0,0.2)");
  const [homeIconBColor, setHomeIconColor] = useState(Color.textLight);

  const navigation = useNavigation();
  // const route = useRoute();
  // const fromManagement = route.params?.fromManagement || false;
  // const shopId = route.params?.shopId || null;

  const isLogin = useSelector((state) => state.auth.isLogin);

  // Cac ref cho Tabs
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const onTabPress = useCallback((tabIndex) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * width,
    });
  });

  // Phong to thu nho hinh anh
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Xu ly thay doi mau khi scroll
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      // Tính toán màu nền mới dựa trên giá trị cuộn
      const [colorGround, colorIconBColor] = interpolateColor(value);

      setHomeBarColor(colorGround);
      setHomeIconColor(colorIconBColor);
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

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
            if (fromManagement == true && shopId) {
              console.log(fromManagement);
              console.log(shopId);
              navigation.navigate("ManagerProductScreen", {
                shopId: shopId,
              });
            } else {
              navigation.navigate("SearchTab", {
                screen: "SearchText",
              });
            }
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
    return (
      <View
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        {/* Tabs */}
        <View
          style={{
            height: 55,
          }}
        >
          <Tabs scrollX={scrollX} onTabPress={onTabPress} />
        </View>

        {/* Line Divider */}
        <LineDivider lineStyle={{ zIndex: -10 }} />

        {/* Content */}
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={width}
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          data={product_details_tabs}
          keyExtractor={(item) => `productDetailsTabs-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width, position: "relative" }}>
                {index == 0 && <DetailProduct dataProduct={dataProduct} />}
                {index == 1 && (
                  <DetailShop dataProduct={dataProduct}></DetailShop>
                )}
                {index == 2 &&
                  (isLogin ? (
                    <DetailDiscussion dataProduct={dataProduct} />
                  ) : (
                    <AuthRequired />
                  ))}
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Hearder */}

      {renderHeader()}

      {/* Content */}
      <ImageHeaderScrollView
        maxHeight={expanded ? MAX_HEIGHT : MIN_HEIGHT}
        minHeight={MIN_HEIGHT}
        // maxOverlayOpacity={0.3}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        renderHeader={() => (
          <Image
            source={{
              uri: dataProduct?.images[0].url || null,
              // uri: "https://dictionary.cambridge.org/vi/images/thumb/shoe_noun_002_33438.jpg?version=5.0.318",
              // uri: "https://sneakerdaily.vn/wp-content/uploads/2022/11/giay-chay-bo-nike-quest-5-black-grey-white-dd0204-001-2.jpg",
            }}
            style={[styles.image, styles.shadowTouch]}
          />
        )}
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Overview</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <FontAwesome name="star" size={16} color="#FF6347" />
              <Text style={{ marginHorizontal: 2 }}>{dataProduct?.price}</Text>
              <Text>({dataProduct?.quantity})</Text>
            </View>
          </View>
        </TriggeringView>

        <TriggeringView
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Color.textLight,
            backgroundColor: "white",
            borderTopColor: Color.darkGray,
            borderTopWidth: 1,
            position: "relative",
          }}
        >
          {renderContent()}
        </TriggeringView>

        {/* <View style={[styles.section, styles.sectionLarge]}>
          <Text
            numberOfLines={showMore ? undefined : 10}
            style={styles.sectionContent}
          >
            {dataProduct.description}
          </Text>
          <TouchableOpacity
            onPress={toggleShowMore}
            style={styles.arrowContainer}
          >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Ionicons
                name={showMore ? "arrow-up-outline" : "arrow-down-outline"}
                size={24}
                color="black"
              />
              <Text style={{ color: Color.mainColor }}>
                {showMore ? "Thu gọn" : "Xem thêm"}
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}

        {/* <View style={styles.section}>
          <View style={styles.categories}>
            {dataProduct.categories.map((category, index) => (
              <View style={styles.categoryContainer} key={index}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>{category}</Text>
              </View>
            ))}
          </View>
        </View> */}

        {/* <View style={[styles.section]}></View> */}
      </ImageHeaderScrollView>
      {/* Phong to thu nho  */}
      {/* <TouchableOpacity
        onPress={toggleExpand}
        style={{ alignItems: "center", marginBottom: 10 }}
      >
        <Text>{expanded ? "Thu gọn" : "Phóng to"}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const Tabs = ({ scrollX, onTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];

    product_details_tabs.forEach((product_details_tab) => {
      product_details_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === product_details_tabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {/* Tabs */}
      {product_details_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`Tab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              onTabPress(index);
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", ...FONTS.h3 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = product_details_tabs.map((_, i) => i * width);

  const TabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: -2,
        zIndex: 10,
        height: 4,
        width: width / 3,
        borderRadius: 50,
        backgroundColor: Color.mainColor,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

export default DetailProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
  image: {
    height: MAX_HEIGHT,
    width: width,
    alignSelf: "stretch",
    resizeMode: "cover",
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
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: "bold",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.textLight,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    fontSize: 16,
    textAlign: "justify",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  categoryContainer: {
    flexDirection: "row",
    backgroundColor: "#FF6347",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  imageTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: Color.blueTheme,
    fontSize: 18,
    backgroundColor: "transparent",
    backgroundColor: Color.blueTheme,
  },
  sectionLarge: {
    minHeight: 200,
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
  shadowTouch: {
    borderRadius: 16,
    shadowColor: Color.mainColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    // elevation: 2,
  },
});
