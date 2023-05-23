import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { shadow, sizes, spacing } from "../../constans/Theme";
import { Feather } from "@expo/vector-icons";

const SearchCard = ({ shoe, index }) => {
  const even = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index < 6 ? index * 80 : 0)}
      style={{
        paddingTop: index === 1 ? spacing.l : 0,
        paddingLeft: !even ? spacing.l / 2 : 0,
        paddingRight: even ? spacing.l / 2 : 0,
        paddingBottom: spacing.l,
      }}
    >
      <Card
        style={{
          width: "100%",
          height: index % 3 === 0 ? 180 : 240,
        }}
      >
        {/* <CardFavoriteIcon onPress={() => {}} /> */}
        {/* <SharedElement id={`trip.${item.id}.image`} style={styles.media}> */}
        {/* <CardMedia
          source={{ uri: shoe.postImages[0].url }}
          borderBottomRadius
        /> */}
        {/* </SharedElement> */}
        <CardContent>
          <View style={styles.titleBox}>
            <Text style={styles.title} numberOfLines={1}>
              "Title"
            </Text>
            <Text style={styles.location}>"location"</Text>
          </View>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

const Card = ({ children, style, onPress, shadowType = "light" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, style, shadow[shadowType]]}
    >
      <View style={styles.inner}>{children}</View>
    </TouchableOpacity>
  );
};

const CardFavoriteIcon = ({ style, active, onPress }) => {
  return <Feather name="chevron-left" size={12} color={"#000"} />;
};

const CardMedia = ({ source, borderBottomRadius = false }) => {
  return (
    <View
      style={[styles.media].concat(
        borderBottomRadius ? styles.borderBottomRadius : null
      )}
    >
      <Image style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: sizes.body,
    fontWeight: "bold",
    // color: colors.primary,
    marginVertical: 4,
  },
  location: {
    fontSize: sizes.body,
    color: "#b2b2b2",
  },
  card: {
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: sizes.radius,
  },
  inner: {
    width: "100%",
    height: "100%",
  },
  icon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  view: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: sizes.radius,
    ...shadow.light,
  },
  media: {
    flex: 1,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  borderBottomRadius: {
    borderBottomLeftRadius: sizes.radius,
    borderBottomRightRadius: sizes.radius,
  },
});

export default SearchCard;
