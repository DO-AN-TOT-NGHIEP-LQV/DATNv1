import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../../constans/Color";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const DetailProduct = ({ dataProduct }) => {
  // xem them
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={[styles.section]}>
      <Text
        numberOfLines={showMore ? undefined : 10}
        style={styles.sectionContent}
      >
        {dataProduct.description}
      </Text>
      <TouchableOpacity onPress={toggleShowMore} style={styles.arrowContainer}>
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
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.textLight,
    backgroundColor: "white",
    minHeight: 200,
  },
  sectionContent: {
    fontSize: 16,
    textAlign: "justify",
  },
  arrowContainer: {
    alignItems: "center",
  },
});
