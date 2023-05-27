import types from "../types";

const initialState = {
  categoryIndex: 0,
  showAllCategories: false,

  listSearch: [
    {
      id: 1,
      name: "pro1",
      description:
        "gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd, gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd",
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
        sAddress1:
          " Thon 2 thai son dien tien dien ban quan nam Thon 2 thai son dien tien dien ban quan nam n ban quan nam",
        sAddress2: "434",
        sFax: null,
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 2,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        sAddress1: "",
        sAddress2: null,
        sFax: null,
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 2,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 2,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 2,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
        created_at: "2023-05-24T16:40:04",
        updated_at: "2023-05-24T16:40:04",
        user_id: 5,
      },
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
    },
    {
      id: 1,
      title: "adasd",
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
      created_at: "2023-05-24T16:40:04",
      updated_at: "2023-05-24T16:40:04",
      user_id: 1,
    },
    {
      id: 2,
      title: "3223423",
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
      created_at: "2023-05-24T16:40:04",
      updated_at: "2023-05-24T16:40:04",
      user_id: 3,
    },
    {
      id: 3,
      title: "dsd",
      content: "ewr",
      price: 0.0,
      images: [
        {
          id: 3,
          no: "3.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F3.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 1,
    },
    {
      id: 4,
      title: "ưer",
      content: "ẻ",
      price: 0.0,
      images: [
        {
          id: 4,
          no: "4.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F4.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 5,
      title: "df",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 8,
      title: "sde",
      content: "ưe435",
      price: 0.0,
      images: [
        {
          id: 8,
          no: "8.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F8.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 2,
    },
    {
      id: 9,
      title: "dsf",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 10,
      title: "asdasd",
      content: "345fd",
      price: 0.0,
      images: [
        {
          id: 10,
          no: "10.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F10.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 13,
      title: "dưe",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 1,
    },
    {
      id: 21,
      title: "adasd",
      content: "fdsf",
      price: 0.0,
      images: [
        {
          id: 1,
          no: "1.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F1.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 1,
    },
    {
      id: 22,
      title: "sd",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 23,
      title: "dsd",
      content: "ewr",
      price: 0.0,
      images: [
        {
          id: 3,
          no: "3.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F3.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 1,
    },
    {
      id: 24,
      title: "ưer",
      content: "ẻ",
      price: 0.0,
      images: [
        {
          id: 4,
          no: "4.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F4.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 25,
      title: "df",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 26,
      title: "dsf",
      content: "sdf",
      price: 0.0,
      images: [
        {
          id: 6,
          no: "6.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F6.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 1,
    },
    {
      id: 27,
      title: "asdasd",
      content: "dsf",
      price: 0.0,
      images: [
        {
          id: 7,
          no: "7.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F7.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 28,
      title: "sde",
      content: "ưe435",
      price: 0.0,
      images: [
        {
          id: 8,
          no: "8.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F8.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 2,
    },
    {
      id: 29,
      title: "dsf",
      content: "sdf",
      price: 0.0,
      images: [
        {
          id: 9,
          no: "9.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F9.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 30,
      title: "sdf",
      content: "345fd",
      price: 0.0,
      images: [
        {
          id: 10,
          no: "10.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F10.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 31,
      title: "sdf",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 2,
    },
    {
      id: 32,
      title: "745234",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 33,
      title: "dưe",
      content: "sdtasd",
      price: 0.0,
      images: [
        {
          id: 13,
          no: "13.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F13.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 34,
      title: "g",
      content: "gt",
      price: 0.0,
      images: [
        {
          id: 14,
          no: "14.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F14.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 35,
      title: "ahgsdasd",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 36,
      title: "56",
      content: "24",
      price: 0.0,
      images: [
        {
          id: 16,
          no: "16.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F16.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 37,
      title: "as456dasd",
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 1,
    },
    {
      id: 38,
      title: "asdasd",
      content: "3234",
      price: 0.0,
      images: [
        {
          id: 18,
          no: "18.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F18.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 39,
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
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 3,
    },
    {
      id: 40,
      title: "asdasd",
      content: "sd23asd",
      price: 0.0,
      images: [
        {
          id: 20,
          no: "20.jpg",
          url: "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F20.jpg?alt=media",
          isProductImage: false,
        },
      ],
      created_at: "2023-05-24T16:40:05",
      updated_at: "2023-05-24T16:40:05",
      user_id: 1,
    },
  ],
  page: 0,
  pageProduct: 0,
  pagePost: 0,
  searchText: "",
  isMainViewVisible: true,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_LIST_SEARCH: {
      const data = action.payload;
      return { ...state, listSearch: data };
    }
    case types.UPDATE_CATEGORY_INDEX: {
      const data = action.payload;
      return {
        ...state,
        categoryIndex: data,
      };
    }
    case types.SHOW_ALL_CATEGORY: {
      const data = action.payload;
      return {
        ...state,
        showAllCategories: data,
      };
    }
    case types.SEARCH_TEXT: {
      const data = action.payload;
      return {
        ...state,
        searchText: data,
      };
    }

    case types.PAGE_PRODUCT: {
      const data = action.payload;
      return {
        ...state,
        pageProduct: data,
      };
    }
    case types.PAGE_POST: {
      const data = action.payload;
      return {
        ...state,
        pagePost: data,
      };
    }
    case types.IS_MAIN_VIEW_DISPLAY: {
      const data = action.payload;
      return {
        ...state,
        isMainViewVisible: data,
      };
    }
    case types.IS_LOADING: {
      const data = action.payload;
      return {
        ...state,
        isLoading: data,
      };
    }
    default:
      return { ...state };
  }
}
