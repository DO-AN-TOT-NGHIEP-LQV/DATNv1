import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Color from "../../constans/Color";

const TagList = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [storedTags, setStoredTags] = useState([]);

  useEffect(() => {
    // Lấy danh sách các tag đã chọn từ lưu trữ (ví dụ: AsyncStorage)
    // và cập nhật vào state khi khởi tạo lại component
    const storedTagsData = ["Tag 2", "Tag 4"]; // Đây là danh sách tag đã lưu trữ, bạn có thể thay thế bằng phương thức lấy từ lưu trữ thực tế

    setSelectedTags(storedTagsData);
    setStoredTags(storedTagsData);
  }, []);

  const handleTagPress = (tag) => {
    if (selectedTags.includes(tag)) {
      // Hủy chọn tag nếu đã được chọn trước đó
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      // Chọn tag nếu chưa được chọn trước đó
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Danh sách các tag
  const tags = [
    "Tag 1",
    "Tag 2",
    "Tag 3",
    "Tag 4",
    "Tag 555555",
    "asdasdoasod55",
  ];

  return (
    <View style={styles.selectedTagsContainer}>
      {tags.map((tag) => (
        <TouchableOpacity
          key={tag}
          style={[styles.tag, selectedTags.includes(tag) && styles.selectedTag]}
          onPress={() => handleTagPress(tag)}
        >
          <Text
            style={{
              color: Color.black,
              fontSize: 13,
              padding: 10,
            }}
          >
            {tag}
          </Text>
        </TouchableOpacity>
      ))}

      {/* {selectedTags.map((tag) => (
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
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 4,
    margin: 4,
    backgroundColor: Color.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
  selectedTag: {
    paddingHorizontal: 4,
    margin: 4,
    backgroundColor: Color.whiteColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.mainColor,
  },
  tagText: {
    color: "#000000",
    fontSize: 13,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default TagList;
