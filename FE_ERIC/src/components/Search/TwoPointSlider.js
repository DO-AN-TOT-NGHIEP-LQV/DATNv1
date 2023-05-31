import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Color from "../../constans/Color";
import { useState } from "react";
import { useSelector } from "react-redux";
import actions from "../../redux/actions";

const windowWidth = Dimensions.get("window").width;

const TwoPointSlider = ({ values, min, max, postfix, onValueChange }) => {
  const [sliderValue, setSliderValue] = useState([0, 100]);

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

  const handleSliderChange = (values) => {
    setSliderValue(values);
    // actions.nowRangeMinMaxPrice(values);
  };

  const calculateDisplayValue = (value) => {
    const min = 0;
    const max = 100;
    const threshold = 70;

    if (value <= threshold) {
      // Phần đầu (0 - threshold)
      const range = 1000000 - min;
      const adjustedValue = (value - min) / (threshold - min);
      return Math.round(min + adjustedValue * range);
    } else {
      // Phần sau (threshold - max)
      const range = 20000000 - 1000000;
      const adjustedValue = (value - threshold) / (max - threshold);
      return Math.round(1000000 + adjustedValue * range);
    }
  };

  return (
    <MultiSlider
      values={nowRangeMinMaxPrice}
      sliderLength={windowWidth - 50 - 20}
      min={0}
      max={110}
      step={1}
      markerOffsetY={20}
      selectedStyle={{
        backgroundColor: Color.mainColor,
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: Color.textLight,
      }}
      minMarkerOverlapDistance={10}
      isMarkersSeparated={true}
      customMarkerLeft={(e) => {
        return (
          <View style={styles.customMakerContainer}>
            <View
              style={{
                ...styles.customMakerPoint,
                ...styles.shadowColor,
              }}
            />
            <Text
              style={{
                height: 30,
                color: Color.textDark,
                fontSize: 10,
                fontWeight: 400,
              }}
            >
              {/* {e.currentValue} {postfix} */}
              {calculateDisplayValue(sliderValue[0])} {postfix}
            </Text>
          </View>
        );
      }}
      customMarkerRight={(e) => {
        return (
          <View style={styles.customMakerContainer}>
            <View
              style={{
                ...styles.customMakerPoint,
                ...styles.shadowColor,
                backgroundColor:
                  e.currentValue > 100 ? Color.yellow : Color.mainColor,
              }}
            />
            <Text
              style={{
                height: 30,
                color: Color.textDark,
                fontSize: 10,
                fontWeight: 400,
              }}
            >
              {e.currentValue > 100
                ? ">20 triệu"
                : `${calculateDisplayValue(sliderValue[1])}`}
            </Text>
          </View>
        );
      }}
      onValuesChange={handleSliderChange}
    />
  );
};

export default TwoPointSlider;

const styles = StyleSheet.create({
  shadowColor: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
  customMakerContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    zIndex: 10,
  },
  customMakerPoint: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: Color.white,
    backgroundColor: Color.mainColor,
  },
});
