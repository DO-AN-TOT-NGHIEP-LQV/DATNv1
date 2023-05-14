import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Hotels, Restaurants, Attractions } from "../public/assets";
import { Image } from "react-native";
import MasanoryContainer from "../components/MasanoryContainer";
// import RNFS from 'react-native-fs';
// import ImagePicker from 'react-native-image-picker';

const Discover = () => {
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   // getImageList()
  //   navigation.setOptions({
  //     headerShown : false,
  //   });
  // } , [])

  const [type, setType] = useState("restaurants");
  const [categories, setCategories] = useState(null);
  const data = [
    // { id: 1, name : 'Shoes', imageUrl : 'https://cdn.pixabay.com/photo/2016/09/02/11/10/boots-1638873__340.jpg'},
    // { id: 2, name : 'Shoes', imageUrl : 'https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496__340.jpg'},

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

  // async function getImageList() {
  //   // const dirPath = RNFS.DocumentDirectoryPath + '/myImageFolder';
  //   const dirPath = 'E:/Do_an_nhap/testimg';
  //   const items = await RNFS.readDir(dirPath);
  //   const imageList = [];

  //   for (let i = 0; i < items.length; i++) {
  //     if (items[i].isFile()) {
  //       const imageMetadata = await ImagePicker.getImageInfo(items[i].path);
  //       imageList.push({
  //         imageUrl: `file://${imageMetadata.path}`,
  //         name: items[i].name,
  //         width: imageMetadata.width,
  //         height: imageMetadata.height,
  //       });
  //     }
  //   }
  //   setdataI(imageList)
  //   // return imageList;
  // }

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
