import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { spacing } from "../../constans/Theme";
import colors from "../../constans/Color";
import Icons, { icons } from "../Icons";
import { Feather } from "@expo/vector-icons";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const onSearch = () => {
    console.log("asdasd");
  };

  return (
    <View style={{ backgroundColor: "#F2F1FD" }}>
      <View style={[styles.headerWrapper]}>
        <TouchableOpacity>
          <View style={styles.headerLeft}>
            <Feather name="chevron-left" size={12} color={colors.black} />
          </View>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.blueMain,
              height: 40,
              borderRadius: 10,
            }}
          >
            <View style={styles.inner}>
              <TextInput
                style={styles.field}
                placeholder="Search"
                value={search}
                onChangeText={setSearch}
              />

              <TouchableOpacity style={styles.filter} onPress={onSearch}>
                <View>
                  <Icons icon={icons.AntDesign} name="search1" />
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
  container: {
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#F2F1FD",
    // flex: 1,
    flexDirection: "row",
  },
  headerLeft: {
    borderColor: colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    flexGrow: 1,
    marginLeft: 8,
    backgroundColor: "#ffffff", // colors.white,
    // borderRadius: 16,
  },

  headerWrapper: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#ffffff", // colors.white,
    height: 55,
    marginHorizontal: 5,
    marginTop: 5,
    // position: "absolute",
    //  transform: [{ translateY }],
    zIndex: 10,
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
  },

  inner: {
    flexDirection: "row",
  },
  field: {
    backgroundColor: colors.white,
    paddingLeft: spacing.s, // spacing.xl + spacing.s,
    paddingRight: spacing.m, // spacing.m,
    paddingVertical: 10,
    borderRadius: 16,
    // height: 55,
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
    // borderLeftColor: 16,
    borderWidth: 2,
    borderColor: colors.blueMain,
    width: 40,
    backgroundColor: colors.blueMain,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 8,
    // borderTopLeftRadius:16,
    // borderTopStartRadius: 16,
    borderTopRightRadius: 8,
    // borderTopLeftRadius:16
  },
});

export default SearchInput;

// import React, { useState } from "react";
// import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
// import { spacing } from "../../constans/Theme";
// import colors from "../../constans/Color";
// import Icons, { icons } from "../Icons";
// import { Feather } from "@expo/vector-icons";

// const SearchInput = () => {
//   const [search, setSearch] = useState("");

//   return (
//     <View style={{ backgroundColor: "#F2F1FD" }}>
//       <View style={[styles.headerWrapper]}>
//         <TouchableOpacity>
//           <View style={styles.headerLeft}>
//             <Feather name="chevron-left" size={12} color={colors.black} />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.headerRight}>
//           <View
//             style={{
//               borderWidth: 2,
//               borderColor: colors.blueMain,
//               height: 40,
//               borderRadius: 10,
//             }}
//           >
//             <View style={styles.inner}>
//               <TextInput
//                 style={styles.field}
//                 placeholder="Search"
//                 value={search}
//                 onChangeText={setSearch}
//               />

//               <TouchableOpacity style={styles.filter}>
//                 <View>
//                   <Icons icon={icons.AntDesign} name="search1" />
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 5,
//     paddingTop: 5,
//     paddingBottom: 5,
//     // flex: 1,
//     flexDirection: "row",
//   },
//   headerLeft: {
//     borderColor: colors.textLight,
//     borderWidth: 2,
//     padding: 12,
//     borderRadius: 10,
//   },
//   headerRight: {
//     flexGrow: 1,
//     marginLeft: 8,
//     backgroundColor: "#ffffff", // colors.white,
//     // borderRadius: 16,
//   },

//   headerWrapper: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     borderRadius: 16,
//     backgroundColor: "#ffffff", // colors.white,
//     height: 55,
//     marginHorizontal: 5,
//     marginTop: 5,
//     position: "absolute",
//     //  transform: [{ translateY }],
//     // zIndex: 10,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//   },

//   inner: {
//     flexDirection: "row",
//   },
//   field: {
//     backgroundColor: colors.white,
//     paddingLeft: spacing.s, // spacing.xl + spacing.s,
//     paddingRight: spacing.m, // spacing.m,
//     paddingVertical: 10,
//     borderRadius: 16,
//     // height: 55,
//     flex: 1,
//     shadowColor: colors.black,
//     shadowRadius: 4,
//     shadowOpacity: 0.1,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//   },
//   filter: {
//     // borderLeftColor: 16,
//     borderWidth: 2,
//     borderColor: colors.blueMain,
//     width: 40,
//     backgroundColor: colors.blueMain,
//     justifyContent: "center",
//     alignItems: "center",
//     borderBottomEndRadius: 8,
//     // borderTopLeftRadius:16,
//     // borderTopStartRadius: 16,
//     borderTopRightRadius: 8,
//     // borderTopLeftRadius:16
//   },
// });

// export default SearchInput;
