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
import FilterModal from "../components/Search/FilterModal";

const width = Dimensions.get("window").width / 2 - 30;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SearchTextScreen = () => {
  const CATEGORIES = ["All", "Products", "Posts"];

  const pagePost = useSelector((state) => state.search.pagePost);
  const pageProduct = useSelector((state) => state.search.pageProduct);
  const [isLoading, setIsLoading] = useState(false);
  const searchText = useSelector((state) => state.search.searchText);

  const showFilterModel = useSelector((state) => state.filter.showFilterModel);

  return (
    <View style={style.container}>
      {/* Search Input */}
      <SearchInput />

      {/* Filter */}
      {showFilterModel && (
        <FilterModal
          isVisible={showFilterModel}
          onClose={() => actions.updateShowFilterModel(false)}
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
});
