import React from "react";
import { StyleSheet } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { spacing } from "../../constans/Theme";
// import SearchCard from "./SearchCard";

const SearchMasonry = ({ list }) => {
  return (
    <MasonryList
      data={list}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.masonry}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => <SearchCard item={item} index={i} />}
      refreshing={false}
    />
  );
};

const SearchCard = ({ shoe }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // onPress={() => navigation.navigate('Details', shoe)}
    >
      <View style={style.card}>
        <View
          style={{
            // display: 'flex',
            // alignItems: 'center',
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 5,
            paddingVertical: 5,
            marginRight: 15,
            borderRadius: 15,
          }}
        >
          <Image
            // style={{ width: null, height: null, resizeMode: 'contain',  alignItems: 'center',
            //   justifyContent: 'center',
            //   paddingHorizontal: 5,
            //   paddingVertical: 5,
            //   marginRight: 15 }}
            source={{ uri: shoe.postImages[0].url }}
            resizeMode="contain"
            style={{
              resizeMode: "contain",
              width: 100,
              height: 80,
              borderRadius: 5,
            }}
          />
        </View>

        <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
          {`${shoe.content}`.slice(0, 19)} ...
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            {shoe.postImages[0].no} Đ
          </Text>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.green,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontWeight: "bold" }}>+</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  masonry: {
    paddingHorizontal: spacing.l,
  },
});

export default SearchMasonry;
