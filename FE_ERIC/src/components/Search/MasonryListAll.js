import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useRef } from "react";

import { useNavigation } from "@react-navigation/native";
import Color from "../../constans/Color";
import MasonryList from "@react-native-seoul/masonry-list";
import { v4 as uuidv4 } from "uuid";
import { forwardRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MasonryListAll = ({ data }) => {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item) => uuidv4()}
      numColumns={3}
      // spacing={4}
      imageContainerStyle={{ borderRadius: 8 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => <CardItem data={item} i={i} />}
    />
  );
};

const CardItem = ({ data, i }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      // style={{ height: Math.round(200) }}
      style={{
        height: Math.round(100),
        borderColor: Color.textLight,
        borderWidth: 1,
      }}
      // className="bg-[#111] m-1 rounded-md relative overflow-hidden"
      className="bg-[#111]  relative overflow-hidden"
      onPress={handleClick}
    >
      <Image
        source={{ uri: data.images[0].url || null }}
        className="w-full h-full object-cover"
      />
    </TouchableOpacity>
  );
};

export default MasonryListAll;

const style = StyleSheet.create({
  ca: {
    marginBottom: 55,
  },
});

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import React, { useLayoutEffect } from "react";
// import { useRef } from "react";

// import { useNavigation } from "@react-navigation/native";
// import Color from "../../constans/Color";
// import MasonryList from "@react-native-seoul/masonry-list";
// import { v4 as uuidv4 } from "uuid";
// import { forwardRef } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const width = Dimensions.get("window").width / 2 - 30;

// const MasonryListWithRef = forwardRef((props, ref) => {
//   const masonryRef = useRef();

//   const handleLayout = () => {
//     if (masonryRef.current) {
//       masonryRef.current.forceUpdate();
//     }
//   };

//   return <MasonryList ref={masonryRef} onLayout={handleLayout} {...props} />;
// });

// const MasonryListAll = ({ data }) => {
//   const masonryRef = useRef();

//   const insets = useSafeAreaInsets();
//   const tabBarHeight = insets.bottom;
//   return (
//     // <MasonryList
//     //   style={{ flex: 1 }}
//     //   data={data}
//     //   keyExtractor={(item) => uuidv4()}
//     //   numColumns={3}
//     //   // spacing={4}
//     //   imageContainerStyle={{ borderRadius: 8 }}
//     //   showsVerticalScrollIndicator={false}
//     //   renderItem={({ item, i }) => <CardItem data={item} i={i} />}
//     // />

//     <MasonryListWithRef
//       ref={masonryRef}
//       data={data}
//       renderItem={({ item, i }) => <CardItem data={item} i={i} />}
//       keyExtractor={(item) => uuidv4()}
//       numColumns={2}
//       // style={{ marginBottom: tabBarHeight }}
//       imageContainerStyle={{ borderRadius: 8 }}
//       showsVerticalScrollIndicator={false}
//     />
//   );
// };

// const CardItem = ({ data, i }) => {
//   const navigation = useNavigation();

//   const handleClick = () => {
//     navigation.goBack();
//   };

//   return (
//     <TouchableOpacity
//       // style={{ height: Math.round(200) }}
//       style={{
//         height: Math.round(100),
//         borderColor: Color.textLight,
//         borderWidth: 1,
//       }}
//       // className="bg-[#111] m-1 rounded-md relative overflow-hidden"
//       className="bg-[#111]  relative overflow-hidden"
//       onPress={handleClick}
//     >
//       <Image
//         source={{ uri: data.images[0].url || null }}
//         className="w-full h-full object-cover"
//       />
//     </TouchableOpacity>
//   );
// };

// export default MasonryListAll;

// const style = StyleSheet.create({
//   ca: {
//     marginBottom: 55,
//   },
// });
