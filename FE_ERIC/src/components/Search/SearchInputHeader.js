import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { spacing } from "../../constans/Theme";
import colors from "../../constans/Color";
import Icons, { icons } from "../Icons";
import actions from "../../redux/actions";
import { showError } from "../../ultils/helperFunction";
import { useSelector } from "react-redux";
import Color from "../../constans/Color";
import { updateIsMainViewDisplay } from "../../redux/actions/search";
import { checkStringEmpty } from "../../ultils/validations";

const SearchInputHeader = () => {
  const [searchText, setSearchText] = useState("");
  const isMainViewVisible = useSelector(
    (state) => state.search.isMainViewVisible
  );

  const nowRangeMinMaxPrice = useSelector(
    (state) => state.filter.nowRangeMinMaxPrice
  );

  const typeSelectedList = useSelector(
    (state) => state.filter.typeSelectedList
  );

  const isApplyFilter = useSelector((state) => state.filter.isApplyFilter);

  const brandSelectedList = useSelector(
    (state) => state.filter.brandSelectedList
  );

  const onSearch = async () => {
    console.log(nowRangeMinMaxPrice);
    console.log(typeSelectedList);
    console.log(brandSelectedList);
    console.log(isApplyFilter);

    if (isApplyFilter) {
      // neu filter == true thi ap dung
      // call api voi cac param da duoc luu trong reducer
      // cho phep search filter voi textSearch == null || ""
    } else {
      // neu khong thi load mac dinh
      // Khong cho phep search rongg ""
      if (!checkStringEmpty(searchText)) {
        const res = await actions.searchAndFilterProducts(0);
      }
    }

    // if (true) {
    //   // if (!checkStringEmpty(searchText)) {
    //   try {
    //     actions.updateIsLoading(true);

    //     const isApplyFilter = useSelector(
    //       (state) => state.filter.isApplyFilter
    //     );

    //     if (categoryIndex == 0) actions.updateCategoryIndex(1);

    //     actions.saveListSearch(null);

    //     const res = await actions.fetchDataForSearchText(
    //       searchText,
    //       0,
    //       SEARCH_ALL_BY_TEXT
    //     );
    //     actions.saveListSearch(res.data);
    //     actions.updateShowAllCategories(false);
    //     actions.updateIsMainViewDisplay(false);
    //     actions.updateIsLoading(false);

    //     // actions.updatePage(0);

    //     actions.updatePagePost(0);
    //     actions.updatePageProduct(0);
    //     actions.updateSearchText(searchText);
    //   } catch (error) {
    //     console.log("Có lỗi xảy ra");
    //     showError(error.error_message);
    //   }
    // }
  };

  return (
    <View style={{ backgroundColor: "#F2F1FD" }}>
      <View style={[styles.headerWrapperHeader, styles.shadowTouch]}>
        <TouchableOpacity>
          <View style={styles.headerLeft}>
            <Icons
              icon={icons.Feather}
              size={12}
              color={colors.black}
              name={"chevron-left"}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.blueMain,
              borderRadius: 10,
              // marginVertical: 5,
              // paddingVertical:5
            }}
          >
            <View style={styles.inner}>
              <TextInput
                style={styles.field}
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
              />

              {/* Camera icon */}
              <TouchableOpacity
                style={{
                  ...styles.cameraButton,
                }}
                onPress={() => {
                  updateIsMainViewDisplay(!isMainViewVisible);
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
                  ...styles.cameraButton,
                }}
                onPress={() => actions.updateShowFilterModel(true)}
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
              <TouchableOpacity style={styles.filter} onPress={onSearch}>
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
};

const styles = StyleSheet.create({
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
    borderColor: colors.textLight,
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
    shadowColor: colors.black,
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
    backgroundColor: colors.white,
    paddingLeft: spacing.s, // spacing.xl + spacing.s,
    // paddingRight: spacing.m, // spacing.m,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 3,

    flex: 1,
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  filter: {
    borderWidth: 2,
    borderColor: colors.blueMain,
    width: 40,
    backgroundColor: colors.blueMain,
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

export default SearchInputHeader;
