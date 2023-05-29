import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
  VirtualizedList,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
} from "react-native";

import React, { useState } from "react";
import Color from "../../constans/Color";
import actions from "../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import Icons, { icons } from "../Icons";
import TwoPointSlider from "./TwoPointSlider";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const dataType = [
  { key: "Thigh-high", value: "Thigh-high" },
  { key: "Knee-high", value: "Knee-high" },
  { key: "Sneaker", value: "Sneaker" },
  { key: "Sandal", value: "Sandal" },
  { key: "Thigh-high", value: "Thigh-high" },
  { key: "Knee-high", value: "Knee-high" },
  { key: "Sneaker1", value: "Sneaker1" },
  { key: "Sandal2", value: "Sandal2" },
  { key: "Thigh-high3", value: "Thigh-high3" },
  { key: "Knee-high4", value: "Knee-high4" },
  { key: "Sneaker5", value: "Sneaker5" },
  { key: "Sandal6", value: "Sandal6" },
];

import MultipleSelectLists from "./MultipleSelectLists";

const FilterModal = ({ isVisible, onClose }) => {
  const showFilterModel = useSelector((state) => state.filter.showFilterModel);

  const nowRangeMinMaxPrice = useSelector(
    (state) => state.filter.nowRangeMinMaxPrice
  );
  const nowValueMinMaxPrice = useSelector(
    (state) => state.filter.nowValueMinMaxPrice
  );

  const saveRangeMinMaxPrice = useSelector(
    (state) => state.filter.saveRangeMinMaxPrice
  );
  const saveValueMinMaxPrice = useSelector(
    (state) => state.filter.saveValueMinMaxPrice
  );

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showFilterModel) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModel]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, (windowHeight * 1.2) / 10],
  });

  //  state cua Tpye   // se bien thanh 1 kiểu trong redecer
  const [selected, setSelected] = useState([]);

  // Modal search Brand
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    //sẽ đổi thanh 1 biễn check reducer để search
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const [selectedTags, setSelectedTags] = useState(["Adidas", "Nike"]);
  const [newTag, setNewTag] = useState("");

  const handleNewTagSubmit = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    }
  };

  const handleTagPress = (tag) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    setSelectedTags(updatedTags);
  };

  ///////////////////

  function renderTags() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.newTagInput}
          placeholder="Thêm tag mới"
          value={newTag}
          onChangeText={setNewTag}
          onSubmitEditing={handleNewTagSubmit}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleNewTagSubmit}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>

        <View style={styles.selectedTagsContainer}>
          {selectedTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.selectedTag}
              onPress={() => handleTagPress(tag)}
            >
              <Text
                style={{ color: Color.blueMain, fontSize: 13, padding: 10 }}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function renderAutocompleteScreen() {
    const suggestions = [
      { value: "Adidas" },
      { value: "Nike" },
      { value: "Puma" },
      { value: "Converse" },
      { value: "New Balance" },
      { value: "ASICS" },
      { value: "Skechers" },
      { value: "Timberland" },
      { value: "Dr. Martens" },
      { value: "Salomon" },
      { value: "Merrell" },
      { value: "Fila" },
      { value: "Adidas" },
      { value: "Nike" },
      { value: "Puma" },
      { value: "Converse" },
      { value: "New Balance" },
      { value: "ASICS" },
      { value: "Skechers" },
      { value: "Timberland" },
    ];
    const [data, setData] = useState([]);

    const onChangeText = async (text) => {
      setNewTag(text);
      if (text === "") {
        setData([]);
      }
      const regex = new RegExp(`^${text}`, "i");
      setData(suggestions.filter((item) => item.value.match(regex)));
    };

    return (
      <Modal animationType="fade" transparent={true} visible={showPopup}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Animated.View
            style={{
              ...styles.mainPopup,
              ...styles.sessionPopup,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ ...styles.filterMainTitle, ...styles.sessionTittle }}
              >
                Nhãn hiệu
              </Text>

              <TouchableOpacity onPress={() => closePopup()}>
                <View style={styles.closeButton}>
                  <Icons
                    icon={icons.Ionicons}
                    size={20}
                    color={Color.textLight}
                    name={"close"}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.selectedTagsContainer }}>
              {selectedTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={styles.selectedTag}
                  onPress={() => handleTagPress(tag)}
                >
                  <Text
                    style={{
                      color: Color.blueMain,
                      fontSize: 13,
                      padding: 10,
                    }}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <SafeAreaView style={{ flex: 1 }}>
              {/* Input  */}
              <Section title={"_____________"}>
                <View style={{ paddingTop: 3 }}>
                  <TextInput
                    onChangeText={onChangeText}
                    value={newTag}
                    style={{
                      // height: 55,
                      paddingVertical: 10,
                      borderColor: Color.textLight,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                    placeholder="Nhập vào nhãn hiệu bạn muốn tìm"
                    onSubmitEditing={handleNewTagSubmit}
                  />
                  {newTag && data.length > 0 ? (
                    <View style={{ height: 400 }}>
                      <FlatList
                        data={data}
                        contentContainerStyle={{ height: 200 }}
                        showsVerticalScrollIndicator={true}
                        renderItem={({ item, index }) => (
                          <Pressable
                            style={({ pressed }) => [
                              { opacity: pressed ? 0.5 : 1 },
                            ]}
                            onPress={async () => {
                              await setNewTag(item.value);
                              handleNewTagSubmit();
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 15,
                              }}
                            >
                              <View style={{ marginLeft: 10, flexShrink: 1 }}>
                                <Text style={{ fontWeight: "700" }}>
                                  {item.value}
                                </Text>
                                <Text style={{ fontSize: 12 }}>
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          </Pressable>
                        )}
                        keyExtractor={(item, index) => item + index}
                      />
                    </View>
                  ) : null}
                </View>
              </Section>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  //////////////////////////////////////////////
  // FILTER MODAL
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        {/* Transparent  */}
        <TouchableWithoutFeedback
          onPress={() => actions.updateShowFilterModel(false)}
        >
          <View style={styles.absoluteFull}></View>
        </TouchableWithoutFeedback>

        {/* Main Content */}
        <Animated.View
          style={{
            ...styles.mainPopup,
            top: modalY,
            flex: 1,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.filterMainTitle}>Bộ lọc của bạn</Text>

            <TouchableOpacity
              onPress={() => actions.updateShowFilterModel(false)}
            >
              <View style={styles.closeButton}>
                <Icons
                  icon={icons.Ionicons}
                  size={20}
                  color={Color.textLight}
                  name={"close"}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: windowHeight }}>
            {/* Price */}
            <Section title={"Giá"}>
              <View style={{ alignItems: "center", paddingTop: 0 }}>
                <TwoPointSlider
                  values={[0, 99]}
                  min={0}
                  max={10000000}
                  postfix="Đồng"
                  onValueChange={(value) => console.log(value)}
                />
              </View>
            </Section>

            {/* Type */}
            <Section title={"Kiểu loại"}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 5,
                }}
              >
                <MultipleSelectLists
                  setSelected={(val) => setSelected(val)}
                  data={dataType}
                  onSelect={() => console.log(selected)}
                  defaultOption={{ key: "Sandal", value: "Sandal" }}
                  save="value"
                  notFoundText="Không tìm thấy giá trị phù hợp"
                  labelStyles={{ display: "none" }}
                  placeholder="Chọn"
                  searchPlaceholder="Tìm kiếm"
                  badgeStyles={{
                    backgroundColor: Color.whiteColor, //,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: Color.mainColor,
                  }}
                  badgeTextStyles={{ color: Color.blueMain, fontSize: 13 }}
                />
              </View>
            </Section>

            <Section title={"Nhãn hiệu"}>
              <TouchableOpacity
                onPress={() => openPopup()}
                style={{
                  borderWidth: 1,
                  height: 50,
                  ...styles.newTagInput,
                  justifyContent: "center",
                }}
              >
                <Text style={{ opacity: 0.2 }}>Nhập nhãn hiệu muốn tìm</Text>
              </TouchableOpacity>

              {renderAutocompleteScreen()}
              <View style={styles.selectedTagsContainer}>
                {selectedTags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={styles.selectedTag}
                    onPress={() => handleTagPress(tag)}
                  >
                    <Text
                      style={{
                        color: Color.blueMain,
                        fontSize: 13,
                        padding: 10,
                      }}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Section>

            {/* Button Submit */}
            <View
              style={{
                height: 110,
                flex: 1,
                paddingHorizontal: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: Color.mainColor,
                  borderRadius: 10,
                }}
                onPress={() => {
                  console.log(nowRangeMinMaxPrice);
                }}
              >
                <Text>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const Section = ({ containerStyle, title, children }) => {
  return (
    <View
      style={{
        marginVertical: 5,
        // flex: 1,
        marginBottom: 15,
        ...containerStyle,
      }}
    >
      <Text style={styles.sessionTittle}> {title}</Text>
      {children}
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  filterMainTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
  },
  sessionPopup: {
    top: (windowHeight * 1.5) / 10,
    flex: 1,
    borderRadius: 20,
    width: "90%",
    height: (windowHeight * 8) / 10,
    left: "5%",
    right: "5%",
    marginBottom: (windowHeight * 1) / 10,
  },

  sessionTittle: {
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    borderColor: Color.textLight,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  absoluteFull: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  mainPopup: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    paddingTop: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Color.white,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedTag: {
    paddingHorizontal: 4,
    margin: 4,
    backgroundColor: Color.whiteColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.mainColor,
  },
  selectedTagText: {
    fontSize: 12,
  },
  newTagInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: "#2196f3",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
