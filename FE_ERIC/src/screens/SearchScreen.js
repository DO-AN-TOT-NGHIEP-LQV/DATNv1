import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import COLORS from "../constans/Color";
import { apiPost } from "../ultils/utilsApi";
import { SEARCH_POST_B_IMG } from "../config/urls";
// import { listImage } from "../constans/raw";
const width = Dimensions.get('window').width / 2 - 30;

export default function SearchScreen  () {

    const [pickedImagePath, setPickedImagePath] = useState("");
    const [loading, setLoading] = useState(false);

    const [listPost, setListPost] = useState()

    useEffect(() => {
          if (pickedImagePath) {


            var formData = new FormData();
            formData.append('fileSearchImg', {
              uri: pickedImagePath  , 
              type: 'image/jpeg', 
              name: "fileSearchImg" 
            }); 

            var headers = {
              "Content-type": "multipart/form-data"
            }
            
            apiPost(SEARCH_POST_B_IMG, formData, headers, true)
              .then((res) => { 
                    console.log(res.data)
                    setListPost(res.data)
                    setLoading( false )

              })
              .catch((error) => {
                showError(error)
                setLoading( false )
            });
          }
        }, [pickedImagePath]
    );

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
            console.log( result.assets )
            setPickedImagePath(result.assets[0].uri);
            setLoading(true)
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
            setPickedImagePath(result.assets[0].uri)
            setLoading(true)
          }
    };


  const Card = ({ shoe }) => {
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
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
              paddingVertical: 5,
              marginRight: 15,
              borderRadius: 15
            }}>
            <Image
              // style={{ width: null, height: null, resizeMode: 'contain',  alignItems: 'center',
              //   justifyContent: 'center',
              //   paddingHorizontal: 5,
              //   paddingVertical: 5,
              //   marginRight: 15 }}
                
              source={{ uri: shoe.postImages[0].url }}
              resizeMode='contain'
              style={{ resizeMode: 'contain',
              width: 100,
              height: 80,
              borderRadius: 5}}

            />
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
            {`${shoe.content}`.slice(0, 19)} ...
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
              {shoe.postImages[0].no} Đ
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5
              }}>
              <Text
                style={{ color: COLORS.white, fontWeight: 'bold' }}>
                +
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backGround }}>
        <View style={style.container}>
          <View style={style.image_ai}>
          {!pickedImagePath ? (
              <Image source={require("../public/assets/splashShoe.png")} style={{ width: 200, height: 200 }} />
          ) : (
            <Image source={{uri: pickedImagePath}} style={{ width: 200, height: 200 }} />
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

        {loading == true ? (
          <ActivityIndicator color="#01c6b2" size="large">
            <Text>Có kết quả nha nhờ chút</Text>
          </ActivityIndicator>
        ) : (
          <SafeAreaView>
            <FlatList
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: 50,
              }}
              numColumns={2}
              data={listPost}
              renderItem={({ item }) => {
                return <Card shoe={item} />;
              }}
            />
          </SafeAreaView>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#EBCAE6",
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
  buttonContainer: { flexDirection: "row" },
  mRight20: { marginRight: 20 },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    height: 200,
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
});






// import { useEffect, useState } from "react";
// import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from "react-native";
// import { ActivityIndicator, Button } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

// import COLORS from "../constans/Color";
// const width = Dimensions.get('window').width / 2 - 30;

// export default function SearchScreen  () {
//   const [hasGalleryPermission, setHasGalleryPermission] = useState();
//   const [image, setImage] = useState();
//   const [typ, setTyp] = useState([]);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
//       setHasGalleryPermission(galleryStatus.status === "granted");
//     })();
//   }, []);

//   const getListSimiar = async (result) => {
//     setImage(result.uri);

//     // let oriImage = {
//     //   imageBase64: result.base64,
//     // };

//     // thay backend ở đây

//     // axios.post("http://103.197.184.55:8080/search-image", { imageBase64: result.base64 }).then((res) => setTyp(res.data)).catch((err) => console.log(err))
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       base64: true,
//       allowsEditing: true,
//       allowsMultipleSelection: false,
//       aspect: [4, 4],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       getListSimiar(result);
//     }
//   };

//   const openCamera = async () => {
//     Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
//       .then((response) => {
//         const { status, expires, permissions } = response;
//         if (status === "granted") {
//           ImagePicker.launchCameraAsync({
//             // mediaTypes: 'All',
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             aspect: [4, 4],
//             allowsEditing: true,
//             base64: true,
//             quality: 1,
//           })
//             .then((response) => {
//               if (!response.canceled) {
//                 getListSimiar(response);
//               }
//             })
//             .catch((error) => console.log(error));
//         }
//       })
//       .catch((error) => console.log(error));
//   };

//   if (hasGalleryPermission === false) {
//     console.log("");
//   }

//   console.log(typ)


//   const Card = ({ shoe }) => {

//     return (
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={() => navigation.navigate('Details', shoe)}>
//         <View style={style.card}>
//           <View
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//             }}>
//             <Image
//               style={{ width: 115, height: 115 }}
//               source={{ uri: shoe.image }}
//             />
//           </View>

//           <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
//             {`${shoe.name}`.slice(0, 19)} ...
//           </Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginTop: 5,
//             }}>
//             <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
//               {shoe.price} Đ
//             </Text>
//             <View
//               style={{
//                 height: 25,
//                 width: 25,
//                 backgroundColor: COLORS.green,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 5
//               }}>
//               <Text
//                 style={{ color: COLORS.white, fontWeight: 'bold' }}>
//                 +
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: "#EBCAE6" }}>
//       <View style={style.container}>
//         <View style={style.image_ai}>
//           {image ? (
//             <Image
//               source={{ uri: image }}
//               style={{ width: 360, height: 200, marginBottom: 30, borderRadius: 10 }}
//             />
//           ) : (
//             <Image source={require("../public/assets/splashShoe.png")} style={{ width: 200, height: 200 }} />
//           )}
//         </View>

//         <View style={style.buttonContainer}>
//           <Button
//             icon="camera"
//             mode="contained"
//             onPress={() => openCamera()}
//             style={style.mRight20}
//           >
//             Camera
//           </Button>
//           <Button
//             icon="image-multiple"
//             mode="outlined"
//             onPress={() => pickImage()}
//             style={{ backgroundColor: "white" }}
//           >
//             Gallery
//           </Button>
//         </View>

//         {loading == true ? (
//           <ActivityIndicator color="#01c6b2" size="large">
//             {/* <Text>Có kết quả nha nhờ chút</Text> */}
//           </ActivityIndicator>
//         ) : (
//           <SafeAreaView>
//             <FlatList
//               columnWrapperStyle={{ justifyContent: 'space-between' }}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{
//                 marginTop: 10,
//                 paddingBottom: 50,
//               }}
//               numColumns={2}
//               data={typ}
//               renderItem={({ item }) => {
//                 return <Card shoe={item} />;
//               }}
//             />
//           </SafeAreaView>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     // backgroundColor: "#EBCAE6",
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "600",
//     color: "#561870",
//     marginTop: 80,
//     marginBottom: 0,
//   },

//   image_ai: {
//     marginTop: 10,

//   },
//   buttonContainer: { flexDirection: "row" },
//   mRight20: { marginRight: 20 },
//   categoryContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//     marginBottom: 10,
//     justifyContent: 'space-between',
//   },
//   categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
//   categoryTextSelected: {
//     color: COLORS.green,
//     paddingBottom: 5,
//     borderBottomWidth: 2,
//     borderColor: COLORS.green,
//   },
//   card: {
//     height: 250,
//     backgroundColor: COLORS.light,
//     width,
//     marginHorizontal: 2,
//     borderRadius: 10,
//     marginBottom: 20,
//     padding: 15,
//   },
//   header: {
//     marginTop: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   searchContainer: {
//     height: 50,
//     backgroundColor: COLORS.light,
//     borderRadius: 10,
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//     color: COLORS.dark,
//   },
//   sortBtn: {
//     marginLeft: 10,
//     height: 50,
//     width: 50,
//     borderRadius: 10,
//     backgroundColor: COLORS.green,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sliderContainer: {
//     height: 200,
//     width: '100%',
//     marginTop: 10,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     borderRadius: 8,
//   },

//   wrapper: {},

//   slide: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//     borderRadius: 8,
//   },
//   sliderImage: {
//     height: '100%',
//     width: '100%',
//     alignSelf: 'center',
//     borderRadius: 8,
//   },
// });