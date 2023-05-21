import { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { apiPost } from "../ultils/utilsApi";
import { SEARCH_POST_B_IMG } from "../config/urls";
import COLORS from "../constans/Color";
import SearchInput from "../components/Search/SearchInput";
import Color from "../constans/Color";
import * as Progress from "react-native-progress";

import MasanoryContainer from "../components/MasanoryContainer";
import MasonryListAll from "../components/Search/MasonryListAll";
import MasonryListProducts from "../components/Search/MasonryListProducts";
import MasonryListPosts from "../components/Search/MasonryListPosts";

const width = Dimensions.get("window").width / 2 - 30;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SearchScreen() {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [loading, setLoading] = useState(false);

  const [listAll, setListAll] = useState();

  const [isMainViewVisible, setMainViewVisible] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const translateYAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const CATEGORIES = ["All", "Products", "Posts"];

  const listTmp = [
    {
      id: 1,
      name: "pro1",
      description:
        "gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd",
      quantity: 5,
      originalPrice: 0.0,
      price: 6.0,
      status: null,
      images: [
        {
          id: 21,
          no: "21.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F21.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 1,
        sName: "Shop2",
        sNumber: "3853",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop1.png?alt=media",
        sAddress1: "Quang Nam",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 2,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 2,
      name: "pro2",
      description: "gdegrh asdasd asdasd",
      quantity: 50,
      originalPrice: 100000.0,
      price: 66000.0,
      status: null,
      images: [
        {
          id: 22,
          no: "22.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F22.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 3,
      name: "pro3",
      description: "gdegrh asdasd asdasd",
      quantity: 55,
      originalPrice: 10000.0,
      price: 100000.0,
      status: null,
      images: [
        {
          id: 23,
          no: "23.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F23.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 1,
        sName: "Shop2",
        sNumber: "3853",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop1.png?alt=media",
        sAddress1: "Quang Nam",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 2,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 4,
      name: "pro4",
      description: "gdegrh asdasd asdasd",
      quantity: 54,
      originalPrice: 0.0,
      price: 72005.0,
      status: null,
      images: [
        {
          id: 24,
          no: "24.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F24.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 5,
      name: "pro5",
      description: "gdegrh asdasd asdasd",
      quantity: 52,
      originalPrice: 100300.0,
      price: 60000.0,
      status: null,
      images: [
        {
          id: 25,
          no: "25.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F25.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 1,
        sName: "Shop2",
        sNumber: "3853",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop1.png?alt=media",
        sAddress1: "Quang Nam",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 2,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 6,
      name: "pro6",
      description: "gdegrh asdasd asdasd",
      quantity: 523,
      originalPrice: 130000.0,
      price: 60005.0,
      status: null,
      images: [
        {
          id: 26,
          no: "26.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F26.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 7,
      name: "pro7",
      description: "gdegrh asdasd asdasd",
      quantity: 53,
      originalPrice: 0.0,
      price: 6.0,
      status: null,
      images: [
        {
          id: 27,
          no: "27.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F27.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 1,
        sName: "Shop2",
        sNumber: "3853",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop1.png?alt=media",
        sAddress1: "Quang Nam",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 2,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 8,
      name: "pro8",
      description: "gdegrh asdasd asdasd",
      quantity: 53,
      originalPrice: 140000.0,
      price: 69999.0,
      status: null,
      images: [
        {
          id: 28,
          no: "28.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F28.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 9,
      name: "pro9",
      description: "gdegrh asdasd asdasd",
      quantity: 25,
      originalPrice: 754333.0,
      price: 6.5,
      status: null,
      images: [
        {
          id: 29,
          no: "29.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F29.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 10,
      name: "pro10",
      description: "gdegrh asdasd asdasd",
      quantity: 25,
      originalPrice: 140000.0,
      price: 100000.0,
      status: null,
      images: [
        {
          id: 30,
          no: "30.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F30.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 11,
      name: "pro11",
      description: "gdegrh asdasd asdasd",
      quantity: 35,
      originalPrice: 12333.0,
      price: 6500.0,
      status: null,
      images: [
        {
          id: 31,
          no: "31.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F31.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 12,
      name: "pro12",
      description: "gdegrh asdasd asdasd",
      quantity: 5,
      originalPrice: 0.0,
      price: 65222.0,
      status: null,
      images: [
        {
          id: 32,
          no: "32.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F32.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 13,
      name: "pro13",
      description: "gdegrh asdasd asdasd",
      quantity: 5,
      originalPrice: 15000.0,
      price: 14000.0,
      status: null,
      images: [
        {
          id: 33,
          no: "33.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F33.jpg?alt=media",
          isProductImage: true,
        },
      ],
      shop: {
        id: 2,
        sName: "Shop5",
        sNumber: "0384",
        sStatus: null,
        sLogo:
          "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",
        sAddress1: "Quang Binh",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-19T15:20:52",
        updated_at: "2023-05-19T15:20:52",
        user_id: 5,
      },
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
    },
    {
      id: 1,
      title: "asds",
      content: "Sadds",
      price: 0.0,
      images: [
        {
          id: 1,
          no: "1.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F1.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 1,
    },
    {
      id: 2,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 2,
          no: "2.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F2.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 3,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 3,
          no: "3.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F3.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 1,
    },
    {
      id: 4,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 4,
          no: "4.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F4.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 5,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 5,
          no: "5.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F5.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 6,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 6,
          no: "6.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F6.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 1,
    },
    {
      id: 7,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 7,
          no: "7.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F7.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 8,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 8,
          no: "8.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F8.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 2,
    },
    {
      id: 9,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 9,
          no: "9.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F9.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 10,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 10,
          no: "10.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F10.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 11,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 11,
          no: "11.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F11.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 2,
    },
    {
      id: 12,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 12,
          no: "12.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F12.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 13,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 13,
          no: "13.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F13.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 14,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 14,
          no: "14.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F14.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 15,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 15,
          no: "15.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F15.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 16,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 16,
          no: "16.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F16.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 17,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 17,
          no: "17.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F17.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 1,
    },
    {
      id: 18,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 18,
          no: "18.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F18.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 19,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 19,
          no: "19.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F19.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 3,
    },
    {
      id: 20,
      title: "asdasd",
      content: "sdasd",
      price: 0.0,
      images: [
        {
          id: 20,
          no: "20.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F20.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-19T15:20:52",
      updated_at: "2023-05-19T15:20:52",
      user_id: 1,
    },
  ];

  useEffect(() => {
    // setListAll(listTmp);
  }, []);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < 300) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setMainViewVisible(true);
      });
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setMainViewVisible(false);
      });
    }
  };

  useEffect(() => {
    if (pickedImagePath) {
      var formData = new FormData();
      formData.append("fileSearchImg", {
        uri: pickedImagePath,
        type: "image/jpeg",
        name: "fileSearchImg",
      });

      var headers = {
        "Content-type": "multipart/form-data",
      };

      apiPost(SEARCH_POST_B_IMG, formData, headers, true)
        .then((res) => {
          console.log(res.data);
          setListAll(res.data);
          setLoading(false);
        })
        .catch((error) => {
          showError(error);
          setLoading(false);
        });
    }
  }, [pickedImagePath]);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setPickedImagePath(result.assets[0].uri);
      setLoading(true);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      setLoading(true);
    }
  };

  return (
    <View style={style.container}>
      {/* Search Bar */}
      <SearchInput />

      {isMainViewVisible ? (
        <Animated.View
          style={{
            justifyContent: "center",
            alignItems: "center",
            zIndex: -1,
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
            borderBottomColor: COLORS.backGround,
          }}
        >
          <View
            style={{
              marginVertical: 5,
            }}
          >
            {!pickedImagePath ? (
              <Image
                source={require("../public/assets/splashShoe.png")}
                // style={{ width: 200, height: 200 }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: (windowHeight * 1) / 5,
                  height: (windowHeight * 1) / 5,
                  borderRadius: 16,
                  borderColor: COLORS.darkGray,
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                }}
              />
            ) : (
              <Image
                source={{ uri: pickedImagePath }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: (windowWidth * 4) / 5,
                  height: (windowHeight * 1) / 5,
                  borderRadius: 16,
                  borderColor: COLORS.darkGray,
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                }}
              />
            )}
          </View>

          <View style={style.buttonContainer}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => openCamera()}
              style={style.mRight20}
            >
              Camera
            </Button>
            <Button
              icon="image-multiple"
              mode="outlined"
              onPress={() => showImagePicker()}
              style={{ backgroundColor: "white" }}
            >
              Gallery
            </Button>
          </View>
        </Animated.View>
      ) : null}

      {/* <View
        style={{
          paddingVertical: 3,
        }}
      >
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            justifyContent: "flex-end",
            alignItems: "center",
            // marginLeft: 0,
            // paddingLeft: 0,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  backgroundColor: isSelected
                    ? Color.textDark
                    : Color.textLight,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 20,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: Color.white,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? Color.white : Color.black,
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View> */}

      {loading == true ? (
        <ActivityIndicator color="#01c6b2" size="large"></ActivityIndicator>
      ) : (
        <>
          <View
            style={{
              paddingVertical: 3,
            }}
          >
            <FlatList
              data={CATEGORIES}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 12,
                flexGrow: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
              renderItem={({ item, index }) => {
                const isSelected = categoryIndex === index;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCategoryIndex(index);
                    }}
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 6,
                      borderBottomColor: isSelected ? Color.blueMain : null,
                      borderBottomWidth: isSelected ? 1 : 0,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 14,
                        opacity: isSelected ? 1 : 0.5,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View>
            <ScrollView
              onScroll={handleScroll}
              scrollEventThrottle={200}
              contentContainerStyle={{}}
            >
              {listAll && categoryIndex === 0 ? (
                <MasonryListAll data={listAll} />
              ) : null}
              {listAll && categoryIndex === 1 ? (
                <MasonryListProducts
                  data={listAll.filter(
                    (item) => item.images[0].isProductImage === true
                  )}
                />
              ) : null}
              {listAll && categoryIndex === 2 ? (
                <MasonryListPosts
                  data={listAll.filter(
                    (item) => item.images[0].isProductImage === false
                  )}
                />
              ) : null}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1FD",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#561870",
    marginTop: 80,
    marginBottom: 0,
  },

  image_ai: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    // marginBottom: 3,
    // bottom: 24,
    top: -24,
    marginBottom: -24,
  },
  mRight20: { marginRight: 20 },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    height: 200,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
});
