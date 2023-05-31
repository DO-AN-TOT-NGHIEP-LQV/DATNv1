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
  TextInput,
  Animated,
  KeyboardAvoidingView,
  RefreshControl,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import Color from "../constans/Color";
import actions from "../redux/actions";

import MasonryListProducts from "../components/Search/MasonryListProducts";
import { useSelector } from "react-redux";
import { showError } from "../ultils/helperFunction";
import FilterModal from "../components/Search/FilterModal";
// import SearchInputHeader from "../components/Search/SearchInputHeader";
import { spacing } from "../constans/Theme";
import Icons, { icons } from "../components/Icons";

const width = Dimensions.get("window").width / 2 - 30;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SearchTextScreen = () => {
  // const listSearch = useSelector((state) => state.search.listSearch);
  const [listSearch, setListSearch] = useState([]);

  // const pageProduct = useSelector((state) => state.search.pageProduct);

  const [isLoading, setIsLoading] = useState(false);
  // const searchText = useSelector((state) => state.search.searchText);

  const [searchText, setSearchText] = useState("");

  // const showFilterModel = useSelector((state) => state.filter.showFilterModel); /////////////////////////
  const [showFilterModel, setShowFilterModel] = useState(false);

  const isApplyFilter = useSelector((state) => state.filter.isApplyFilter);

  const nowRangeMinMaxPrice = useSelector(
    (state) => state.filter.nowRangeMinMaxPrice
  );

  const typeSelectedList = useSelector(
    (state) => state.filter.typeSelectedList
  );

  const brandSelectedList = useSelector(
    (state) => state.filter.brandSelectedList
  );

  /////////
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log("Render count:", renderCount.current);
  });

  //Search Input State

  ///// State va func  Scroll
  const [pageProduct, setPageProduct] = useState(0);
  const [loadingEndScroll, setLoadingEndScroll] = useState(false);
  const [isEndOfData, setIsEndOfData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    firstRenderData();
    setIsEndOfData(false);
    setIsRefreshing(false);
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndReached =
      contentOffset.y + layoutMeasurement.height >= contentSize.height;

    if (isEndReached && !isLoading && !isEndOfData) {
      fetchMoreDataSearch();
    }
  };

  const firstRenderData = async () => {
    // day la ham load lai dau tien
    try {
      setListSearch([]);
      setLoadingEndScroll(true);
      setIsEndOfData(false);

      if (isApplyFilter) {
        const res = await actions.searchAndFilterProducts(
          0,
          searchText,
          typeSelectedList,
          brandSelectedList,
          nowRangeMinMaxPrice[0],
          nowRangeMinMaxPrice[1]
        );
        setListSearch(res.data);
      } else {
        const res = await actions.searchAndFilterProducts(0, searchText);
        setListSearch(res.data);
      }

      setPageProduct(0);
      setLoadingEndScroll(false);
    } catch (error) {
      showError(error.error_message);
      setLoadingEndScroll(false);
    }
  };

  const fetchMoreDataSearch = async () => {
    // Hay featch data cho van de scroll
    try {
      setLoadingEndScroll(true);

      if (isApplyFilter) {
        const res = await actions.searchAndFilterProducts(
          pageProduct + 1,
          searchText,
          typeSelectedList,
          brandSelectedList,
          nowRangeMinMaxPrice[0],
          nowRangeMinMaxPrice[1]
        );
        setListSearch([...listSearch, ...res.data]);
        if (res.data.length === 0) {
          setIsEndOfData(true);
        }
      } else {
        const res = await actions.searchAndFilterProducts(
          pageProduct + 1,
          searchText
        );
        setListSearch([...listSearch, ...res.data]);
        if (res.data.length === 0) {
          setIsEndOfData(true);
        }
      }

      setPageProduct((pre) => pre + 1);
      setLoadingEndScroll(false);
    } catch (error) {
      console.log(error);
      showError(error.error_message);
      setLoadingEndScroll(false);
    }
  };

  ///// Effect render
  useEffect(() => {
    setPageProduct(0);
    firstRenderData();
  }, []);

  const isChangeFilter = useSelector((state) => state.filter.isChangeFilter);
  useEffect(() => {
    firstRenderData();
  }, [isChangeFilter]);
  ///////////////

  function searchInputHeader() {
    const onSearch = async () => {
      firstRenderData();
    };

    return (
      <View style={{ backgroundColor: "#F2F1FD" }}>
        <View style={[style.headerWrapperHeader, style.shadowTouch]}>
          <TouchableOpacity>
            <View style={style.headerLeft}>
              <Icons
                icon={icons.Feather}
                size={12}
                color={Color.black}
                name={"chevron-left"}
              />
            </View>
          </TouchableOpacity>

          <View style={style.headerRight}>
            <View
              style={{
                borderWidth: 1,
                borderColor: Color.blueMain,
                borderRadius: 10,
              }}
            >
              <View style={style.inner}>
                <TextInput
                  style={style.field}
                  placeholder="Search"
                  value={searchText}
                  onChangeText={setSearchText}
                />

                {/* Camera icon */}
                <TouchableOpacity
                  style={{
                    ...style.cameraButton,
                  }}
                  onPress={() => {
                    // updateIsMainViewDisplay(!isMainViewVisible);
                  }}
                >
                  <View>
                    <Icons
                      icon={icons.Ionicons}
                      size={20}
                      name="camera-outline"
                    />
                  </View>
                </TouchableOpacity>

                {/* Filter icon */}
                <TouchableOpacity
                  style={{
                    ...style.cameraButton,
                  }}
                  onPress={() => setShowFilterModel(true)}
                >
                  <View>
                    <Icons
                      icon={icons.Ionicons}
                      size={20}
                      name="md-filter-outline"
                    />
                  </View>
                </TouchableOpacity>

                {/* Search Button */}
                <TouchableOpacity style={style.filter} onPress={onSearch}>
                  <View>
                    <Icons
                      icon={icons.AntDesign}
                      name="search1"
                      color={Color.white}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  //////////////////////////////////////////////

  return (
    <View style={style.container}>
      {searchInputHeader()}

      <TouchableOpacity
        style={{
          paddingHorizontal: 15,
          paddingVertical: 6,
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontStyle: "italic",
            fontSize: 14,
            opacity: 1,
            borderBottomWidth: 1,
            paddingLeft: 50,
          }}
        >
          Products
        </Text>
      </TouchableOpacity>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {listSearch ? (
          <MasonryListProducts
            data={listSearch.filter(
              (item) => item.images[0].isProductImage === true
            )}
          />
        ) : null}

        {loadingEndScroll && (
          <View>
            <ActivityIndicator />
          </View>
        )}
        {isEndOfData && (
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 12,
              alignSelf: "center",
            }}
          >
            Đã đến cuối cùng
          </Text>
        )}
      </ScrollView>

      {/* Filter */}
      {showFilterModel && (
        <FilterModal
          isVisible={showFilterModel}
          onClose={() => setShowFilterModel(false)}
          firstRenderData={() => {
            firstRenderData();
          }}
        />
      )}
    </View>
  );
};

export default SearchTextScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1FD",
  },
  headerWrapperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    height: Dimensions.get("window").height / 15,
    marginHorizontal: 5,
    marginTop: 5,
    zIndex: 10,
  },
  headerLeft: {
    borderColor: Color.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
    // backgroundColor: "#ffffff",
  },
  headerRight: {
    height: "90%",
    flexGrow: 1,
    marginLeft: 8,
    // marginVertical: 10,
    backgroundColor: "#ffffff",
    // borderRadius: 16,
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
    elevation: 2,
  },

  inner: {
    flexDirection: "row",
  },
  field: {
    backgroundColor: Color.white,
    paddingLeft: spacing.s,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 3,

    flex: 1,
    shadowColor: Color.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  filter: {
    borderWidth: 2,
    borderColor: Color.blueMain,
    width: 40,
    backgroundColor: Color.blueMain,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 8,
    borderTopRightRadius: 8,
  },
  cameraButton: {
    justifyContent: "center",
    marginRight: 3,
  },
});
