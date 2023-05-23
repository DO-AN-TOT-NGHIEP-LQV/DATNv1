import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, Hotels, Restaurants, Attractions } from "../public/assets";
// import MasanoryContainer from "../components/MasanoryContainer";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";

const Discover = () => {
  const data = [
    {
      id: 1,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/09/02/11/10/boots-1638873__340.jpg",
    },
    {
      id: 2,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496__340.jpg",
    },
    {
      id: 4,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/06/03/17/35/shoes-1433925__340.jpg",
    },
    {
      id: 3,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/06/03/17/35/shoes-1433925__340.jpg",
    },
    {
      id: 5,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/09/02/11/10/boots-1638873__340.jpg",
    },
    {
      id: 6,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496__340.jpg",
    },
    {
      id: 7,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/06/03/17/35/shoes-1433925__340.jpg",
    },
    {
      id: 8,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/09/02/11/10/boots-1638873__340.jpg",
    },
    {
      id: 9,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496__340.jpg",
    },
    {
      id: 10,
      name: "Shoes",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/09/02/11/10/boots-1638873__340.jpg",
    },
  ];

  const MasanoryContainer = ({ data }) => {
    return (
      <MasonryList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        // spacing={4}
        imageContainerStyle={{ borderRadius: 8 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => <CardItem data={item} i={i} />}
      />
    );
  };

  const CardItem = ({ data, i }) => {
    const nagivation = useNavigation();

    const handleClick = () => {
      nagivation.navigate("DetailPost", { param: data.id });
    };

    return (
      <TouchableOpacity
        style={{ height: Math.round(200) }}
        // style={{height: Math.round(Math.random() * 100 + 160)}}
        className="bg-[#111] m-1 rounded-md relative overflow-hidden"
        onPress={handleClick}
      >
        <Image
          source={{ uri: data.imageUrl }}
          className="w-full h-full object-cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className=" flex-1 bg-white   relative ">
      <View className=" bg-red-100">
        <View className="flex-row items-center  justify-between px-6">
          <View>
            <Text className="text-[38px] text-[#0B646B] font-bold">
              Discover
            </Text>
            <Text className="text-[32px] text-[#527283] ">
              the beauty today
            </Text>
          </View>

          <View className=" w-12 h-12 bg-gray-400 rounded-md items-center justify-center">
            <Image
              source={Avatar}
              className="w-full h-full rounded object-cover"
            ></Image>
          </View>
        </View>

        <View className="flex-row items-center  h-[50] border-2 drop-shadow-xl bg-white mx-4 rounded-xl py-1 px-4 mt-2 mb-2 shadow-lg">
          <Text>Search</Text>
        </View>
      </View>

      <ScrollView className="w-full h-full px-1 py-1">
        {data ? (
          <MasanoryContainer data={data} />
        ) : (
          <>
            <ActivityIndicator color={"#ff000"} size={"large"} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discover;
