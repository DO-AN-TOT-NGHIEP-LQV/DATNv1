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

import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../constans/Color";
import { FONTS, SIZES, spacing } from "../constans/Theme";

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

import LottieLoading from "../components/LottieLoading";
import { ActivityIndicator } from "react-native";
import { Fragment } from "react";

const { width, height } = Dimensions.get("window");

const MIN_HEIGHT = (Platform.OS === "ios" ? 90 : 65) + spacing.statusbarHeight;
const MAX_HEIGHT = 200 + spacing.statusbarHeight;

const product_details_tabs = product_tabs.map((product_details_tab) => ({
  ...product_details_tab,
  ref: React.createRef(),
}));

const DetailProductScreen = ({ route }) => {
  const { fromManagement, shopId } = route.params;
  const { previousScreen, productId, dataProduct } = route.params;

  // const [dataProduct, setDataProduct] = useState(null);

  // Cac state cho Home icon
  const [loading, setLoading] = useState(false);

  const [scrollY] = useState(new Animated.Value(0));
  const [homeBarColor, setHomeBarColor] = useState("rgba(0,0,0,0.2)");

  const navigation = useNavigation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const flatListRef = useRef();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     var headers = {
  //       "Content-Type": "application/json",
  //     };

  //     var data = {
  //       params: {
  //         productId: productId,
  //       },
  //     };
  //     await apiGet(GET_PRODUCT_BY_ID, data, headers, false)
  //       .then((res) => {
  //         // setDataProduct(res.data);
  //       })
  //       .catch((error) => {
  //         showError(error.error_message);
  //       });

  //     setLoading(false);
  //   };

  //   fetchData();
  // }, [productId]);

  // Cac ref cho Tabs
  const scrollX = useRef(new Animated.Value(0)).current;

  const onTabPress = useCallback((tabIndex) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * width,
    });
  });

  // Phong to thu nho hinh anh
  // const [expanded, setExpanded] = useState(true);
  // const toggleExpand = () => {
  //   setExpanded(!expanded);
  // };

  const gpPreviousScreen = () => {
    if (fromManagement == true && shopId) {
      navigation.navigate("ManagerProductScreen", {
        shopId: shopId,
      });
      return;
    }

    if (fromManagement == true && previousScreen) {
      navigation.navigate("ManagerProductScreen");
      return;
    }

    if (previousScreen) {
      navigation.navigate("SearchTab", { screen: previousScreen });
    } else navigation.goBack();
  };

  function renderHeader() {
    return (
      <Animated.View
        style={{
          ...styles.headerWrapperHeader,
        }}
      >
        {/* Icon call back  */}
        <TouchableOpacity onPress={() => gpPreviousScreen()}>
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

        {/* <View style={{ flexDirection: "row" }}>
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
        </View> */}
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
          <Tabs
            scrollX={scrollX}
            onTabPress={onTabPress}
            productId={productId}
          />
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
              <ScrollView style={{ width }}>
                {index == 0 && (
                  <View>
                    <DetailProduct
                      dataProduct={dataProduct}
                      productId={dataProduct.id}
                    />
                  </View>
                )}
                {index == 1 && (
                  <DetailShop
                    dataProduct={dataProduct}
                    productId={dataProduct.id}
                  ></DetailShop>
                )}
                {index == 2 &&
                  (isLogin ? (
                    <DetailDiscussion dataProduct={dataProduct} />
                  ) : (
                    <AuthRequired />
                  ))}
              </ScrollView>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Hearder */}

      {/* <LottieLoading /> */}
      {renderHeader()}
      {/* Content */}
      {loading ? (
        <LottieLoading />
      ) : (
        <Fragment>
          <ImageHeaderScrollView
            // maxHeight={expanded ? MAX_HEIGHT : MIN_HEIGHT}
            maxHeight={MAX_HEIGHT}
            minHeight={MIN_HEIGHT}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            renderHeader={() =>
              loading ? (
                <LottieLoading />
              ) : (
                <Image
                  source={{
                    uri: dataProduct?.images[0].url,
                  }}
                  style={{
                    height: MAX_HEIGHT,
                    width: "100%",
                    resizeMode: "contain",
                  }}
                />
              )
            }
          >
            <TriggeringView
              style={{
                borderBottomColor: Color.textLight,
                backgroundColor: "white",
                position: "relative",
              }}
            >
              {loading ? <ActivityIndicator /> : renderContent()}
            </TriggeringView>
          </ImageHeaderScrollView>
        </Fragment>
      )}
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
        backgroundColor: Color.mainTheme,
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
    // position: "relative",
    // paddingTop: spacing.statusbarHeight,
    backgroundColor: Color.mainTheme,
  },
  backStyles: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: Color.textLight,
  },
  rightHomeIconStyle: {
    // borderWidth: 2,
    padding: 8,
    borderRadius: 50,
    borderColor: Color.textLight,
  },
  image: {
    height: MAX_HEIGHT,
    width: "100%",
    resizeMode: "contain",
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
    backgroundColor: Color.mainTheme,
    borderWidth: 1,
    marginHorizontal: 5,
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
    color: Color.white,
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
    top: spacing.statusbarHeight,
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

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   Platform,
//   TouchableOpacity,
//   Animated,
// } from "react-native";

// import {
//   ImageHeaderScrollView,
//   TriggeringView,
// } from "react-native-image-header-scroll-view";

// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Color from "../constans/Color";
// import { FONTS, SIZES, spacing } from "../constans/Theme";

// import { product_tabs } from "../constans/raw";

// import Icons, { icons } from "../components/Icons";
// import {
//   CommonActions,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";
// import LineDivider from "../components/LineDivider";

// import {
//   DetailProduct,
//   DetailShop,
//   DetailDiscussion,
// } from "../components/DetailProductTabs";
// import AuthRequired from "../components/AuthRequired";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { apiGet } from "../ultils/utilsApi";
// import { showError } from "../ultils/messageFunction";
// import { GET_PRODUCT_BY_ID } from "../config/urls";
// import LottieLoading from "../components/LottieLoading";
// import { ActivityIndicator } from "react-native";

// const { width, height } = Dimensions.get("window");

// const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 65;
// const MAX_HEIGHT = 200;

// const product_details_tabs = product_tabs.map((product_details_tab) => ({
//   ...product_details_tab,
//   ref: React.createRef(),
// }));

// const DetailProductScreen = ({ route }) => {
//   // const { dataProduct, fromManagement, shopId } = route.params;
//   const { fromManagement, shopId } = route.params;
//   const { previousScreen, productId } = route.params;

//   const [dataProduct, setDataProduct] = useState(null);

//   // Cac state cho Home icon
//   const [loading, setLoading] = useState(true);

//   const [scrollY] = useState(new Animated.Value(0));
//   const [homeBarColor, setHomeBarColor] = useState("rgba(0,0,0,0.2)");

//   const navigation = useNavigation();
//   const isLogin = useSelector((state) => state.auth.isLogin);
//   const flatListRef = useRef();

//   useEffect(() => {
//     fetchData();

//   }, [productId]);

//   const fetchData = async () => {
//     setLoading(true);
//     var headers = {
//       "Content-Type": "application/json",
//     };

//     var data = {
//       params: {
//         productId: productId,
//       },
//     };
//     await apiGet(GET_PRODUCT_BY_ID, data, headers, false)
//       .then((res) => {
//         setDataProduct(res.data);
//       })
//       .catch((error) => {
//         showError(error.error_message);
//       });

//     setLoading(false);
//   };

//   // Cac ref cho Tabs
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const onTabPress = useCallback((tabIndex) => {
//     flatListRef?.current?.scrollToOffset({
//       offset: tabIndex * width,
//     });
//   });

//   // Phong to thu nho hinh anh
//   const [expanded, setExpanded] = useState(true);
//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const interpolateColor = (value) => {
//     // Điều chỉnh các giá trị này để tùy chỉnh màu nền dựa trên giá trị cuộn
//     const startValue = 0;
//     const endValue = 200;

//     const startColorGround = "rgba(0,0,0,0.2)";
//     const endColorGround = "white";
//     const colorGround = scrollY.interpolate({
//       inputRange: [startValue, endValue],
//       outputRange: [startColorGround, endColorGround],
//       extrapolate: "clamp",
//     });

//     const startIconBColor = Color.textLight;
//     const endIconBColor = Color.mainColor;
//     const colorIconBColor = scrollY.interpolate({
//       inputRange: [startValue, endValue],
//       outputRange: [startIconBColor, endIconBColor],
//       extrapolate: "clamp",
//     });

//     return [colorGround, colorIconBColor];
//   };

//   const gpPreviousScreen = () => {
//     if (fromManagement == true && shopId) {
//       navigation.navigate("ManagerProductScreen", {
//         shopId: shopId,
//       });
//       return;
//     }

//     if (previousScreen) {
//       navigation.navigate("SearchTab", { screen: previousScreen });
//     } else navigation.goBack();
//   };

//   function renderHeader() {
//     return (
//       <Animated.View
//         style={{
//           ...styles.headerWrapperHeader,
//         }}
//       >
//         {/* Icon call back  */}
//         <TouchableOpacity onPress={() => gpPreviousScreen()}>
//           <Animated.View
//             style={{
//               ...styles.backStyles,
//               backgroundColor: homeBarColor,
//             }}
//           >
//             <Icons
//               icon={icons.Feather}
//               size={18}
//               color={Color.black}
//               name={"chevron-left"}
//             />
//           </Animated.View>
//         </TouchableOpacity>

//         {/* <View style={{ flexDirection: "row" }}>
//           <TouchableOpacity>
//             <Animated.View
//               style={{
//                 ...styles.rightHomeIconStyle,
//                 backgroundColor: homeBarColor,
//                 borderColor: homeIconBColor,
//               }}
//             >
//               <Icons
//                 icon={icons.Feather}
//                 size={20}
//                 color={Color.mainColor}
//                 name={"chevron-left"}
//               />
//             </Animated.View>
//           </TouchableOpacity>

//           <TouchableOpacity>
//             <Animated.View
//               style={{
//                 ...styles.rightHomeIconStyle,
//                 backgroundColor: homeBarColor,
//                 borderColor: homeIconBColor,
//               }}
//             >
//               <Icons
//                 icon={icons.Ionicons}
//                 size={20}
//                 name="ellipsis-vertical-outline"
//                 color={Color.mainColor}
//               />
//             </Animated.View>
//           </TouchableOpacity>
//         </View> */}
//       </Animated.View>
//     );
//   }

//   function renderContent() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           position: "relative",
//         }}
//       >
//         {/* Tabs */}
//         <View
//           style={{
//             height: 55,
//           }}
//         >
//           <Tabs
//             scrollX={scrollX}
//             onTabPress={onTabPress}
//             productId={productId}
//           />
//         </View>

//         {/* Line Divider */}
//         <LineDivider lineStyle={{ zIndex: -10 }} />

//         {/* Content */}
//         <Animated.FlatList
//           ref={flatListRef}
//           horizontal
//           pagingEnabled
//           snapToAlignment="center"
//           snapToInterval={width}
//           decelerationRate="fast"
//           keyboardDismissMode="on-drag"
//           showsHorizontalScrollIndicator={false}
//           data={product_details_tabs}
//           keyExtractor={(item) => `productDetailsTabs-${item.id}`}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             {
//               useNativeDriver: false,
//             }
//           )}
//           renderItem={({ item, index }) => {
//             return (
//               <View style={{ width, position: "relative" }}>
//                 {index == 0 && <DetailProduct dataProduct={dataProduct} />}
//                 {index == 1 && (
//                   <DetailShop dataProduct={dataProduct}></DetailShop>
//                 )}
//                 {index == 2 &&
//                   (isLogin ? (
//                     <DetailDiscussion dataProduct={dataProduct} />
//                   ) : (
//                     <AuthRequired />
//                   ))}
//               </View>
//             );
//           }}
//         />
//       </View>
//     );
//   }

//   // return <View></View>;
//   return (
//     <View style={styles.container}>
//       {/* Hearder */}

//       {renderHeader()}
//       {/* Content */}

//       {loading ? (
//         <LottieLoading />
//       ) : (
//         <ImageHeaderScrollView
//           maxHeight={expanded ? MAX_HEIGHT : MIN_HEIGHT}
//           minHeight={MIN_HEIGHT}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: false }
//           )}
//           renderHeader={() =>
//             loading ? (
//               <LottieLoading />
//             ) : (
//               <View
//                 style={{
//                   alignItems: "center",
//                   paddingHorizontal: 5,
//                   height: MAX_HEIGHT,
//                   width: "100%",
//                   backgroundColor: Color.mainTheme,
//                 }}
//               >
//                 <Image
//                   source={{
//                     uri: dataProduct?.images[0].url,
//                   }}
//                   style={[styles.image, styles.shadowTouch]}
//                 />
//               </View>
//             )
//           }
//         >
//           <TriggeringView
//             style={{
//               borderBottomColor: Color.textLight,
//               backgroundColor: "white",
//               position: "relative",
//             }}
//           >
//             {renderContent()}
//           </TriggeringView>
//         </ImageHeaderScrollView>
//       )}
//     </View>
//   );
// };

// const Tabs = ({ scrollX, onTabPress, productId }) => {
//   const [measureLayout, setMeasureLayout] = useState([]);
//   const containerRef = useRef();

//   useEffect(() => {
//     let ml = [];

//     product_details_tabs.forEach((product_details_tab) => {
//       product_details_tab?.ref?.current?.measureLayout(
//         containerRef.current,
//         (x, y, width, height) => {
//           ml.push({
//             x,
//             y,
//             width,
//             height,
//           });

//           console.log(ml);
//           console.log(product_details_tabs.length);

//           if (ml.length === product_details_tabs.length) {
//             setMeasureLayout(ml);
//           }
//         }
//       );
//     });
//   }, [containerRef.current]);

//   // useEffect(() => {
//   //   setMeasureLayout([]);
//   // }, [productId]);

//   return (
//     <View
//       ref={containerRef}
//       style={{
//         flex: 1,
//         flexDirection: "row",
//         backgroundColor: Color.mainTheme,
//       }}
//     >
//       {/* Tab Indicator */}
//       {measureLayout.length > 0 && (
//         <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
//       )}

//       {/* Tabs */}
//       {product_details_tabs.map((item, index) => {
//         return (
//           <TouchableOpacity
//             key={`Tab-${index}`}
//             ref={item.ref}
//             style={{
//               flex: 1,
//               paddingHorizontal: 15,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             onPress={() => {
//               onTabPress(index);
//             }}
//           >
//             <Text style={{ fontSize: 17, fontWeight: "600", ...FONTS.h3 }}>
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const TabIndicator = ({ measureLayout, scrollX }) => {
//   const inputRange = product_details_tabs.map((_, i) => i * width);
//   const TabIndicatorWidth = scrollX.interpolate({
//     inputRange,
//     outputRange: measureLayout.map((measure) => measure.width),
//   });
//   const translateX = scrollX.interpolate({
//     inputRange,
//     outputRange: measureLayout.map((measure) => measure.x),
//   });
//   return (
//     <Animated.View
//       style={{
//         position: "absolute",
//         bottom: -2,
//         zIndex: 10,
//         height: 4,
//         width: width / 3,
//         borderRadius: 50,
//         backgroundColor: Color.mainColor,
//         transform: [
//           {
//             translateX,
//           },
//         ],
//       }}
//     />
//   );
// };

// export default DetailProductScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: "relative",
//     paddingTop: spacing.statusbarHeight,
//     backgroundColor: Color.mainTheme,
//   },
//   backStyles: {
//     borderWidth: 2,
//     padding: 10,
//     borderRadius: 10,
//     borderColor: Color.textLight,
//   },
//   rightHomeIconStyle: {
//     // borderWidth: 2,
//     padding: 8,
//     borderRadius: 50,
//     borderColor: Color.textLight,
//   },
//   image: {
//     height: MAX_HEIGHT,
//     width: "100%",
//     resizeMode: "contain",
//     borderRadius: SIZES.radius,
//     borderColor: Color.textLight,
//     backgroundColor: Color.mainTheme,
//     borderWidth: 1,
//     marginHorizontal: 5,
//   },
//   shadowTouch: {
//     borderRadius: 16,
//     shadowColor: Color.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 16,
//   },
//   title: {
//     fontSize: 20,
//   },
//   name: {
//     fontWeight: "bold",
//   },
//   section: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: Color.textLight,
//     backgroundColor: "white",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   sectionContent: {
//     fontSize: 16,
//     textAlign: "justify",
//   },
//   categories: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "flex-start",
//     flexWrap: "wrap",
//   },
//   categoryContainer: {
//     flexDirection: "row",
//     backgroundColor: "#FF6347",
//     borderRadius: 20,
//     margin: 10,
//     padding: 10,
//     paddingHorizontal: 15,
//   },
//   category: {
//     fontSize: 14,
//     color: Color.white,
//     marginLeft: 10,
//   },
//   titleContainer: {
//     flex: 1,
//     alignSelf: "stretch",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   imageTitle: {
//     color: "white",
//     backgroundColor: "transparent",
//     fontSize: 24,
//   },
//   navTitleView: {
//     height: MIN_HEIGHT,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: Platform.OS === "ios" ? 40 : 5,
//     opacity: 0,
//   },
//   navTitle: {
//     color: Color.blueTheme,
//     fontSize: 18,
//     backgroundColor: "transparent",
//     backgroundColor: Color.blueTheme,
//   },
//   sectionLarge: {
//     minHeight: 200,
//   },
//   headerWrapperHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     borderRadius: 16,
//     height: Dimensions.get("window").height / 15,
//     marginHorizontal: 5,
//     marginTop: 5,
//     zIndex: 10,
//     position: "absolute",
//     top: spacing.statusbarHeight,
//     left: 0,
//     right: 0,
//   },
//   shadowTouch: {
//     borderRadius: 16,
//     shadowColor: Color.mainColor,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 16,
//     // elevation: 2,
//   },
// });
