import {
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Fragment, useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Button, Modal } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Color from "../../constans/Color";
import { ShoesFLas } from "../../public/assets";
import Icons, { icons } from "../../components/Icons";
import CustomButton from "../../components/CustomButton/index.js";
import LineDivider from "../../components/LineDivider";
import { SIZES } from "../../constans/Theme";
import ProductValue from "../../components/SalerManager/ProductValue";
import ModalInputText from "../../components/SalerManager/ModalInputText";
import ModalInputNumber from "../../components/SalerManager/ModalInputNumber";
import openWebLink from "../../hookFuntion/openWebLink";
import InputModal from "../../components/InputModal";
import { typeList } from "../../constans/raw";
import { TypeCard } from "../../components/Home";
import { showError, showSuccess } from "../../ultils/messageFunction";
import ModalInputBrand from "../../components/SalerManager/ModalInputBrand";
import { CREATE_NEW_PRODUCT } from "../../config/urls";
import { validatorCreateProduct } from "../../ultils/validations";
import { error } from "is_js";
import { getFileExtension } from "../../ultils/helperFunction";
import { apiPost } from "../../ultils/utilsApi";
import Header from "../../components/Header";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CreateProductScreen = ({ route }) => {
  const shopId = route.params?.shopId;

  const navigation = useNavigation();
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("FFX-007034");
  const [description, setDescription] = useState("Mieu ta so lươc");
  const [price, setPrice] = useState(100000);
  const [link, setLink] = useState("https://shopee.vn/ruby_store.88");
  const [type, setType] = useState("Sandals");
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("Ad");

  const [nameModal, setNameModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [priceModal, setPriceModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);

  useEffect(() => {
    if (!shopId) {
      showError("Khong tim thay id Shop");
      navigation.goBack();
    }
    return () => {
      setPickedImagePath("");
    };
  }, []);

  function renderHeader() {
    const product = {
      name,
      description,
      price,
      quantity,
      type,
      brand,
      link,
      pickedImagePath,
      shop_id: shopId,
    };
    const isValidData = () => {
      const error = validatorCreateProduct(product);
      if (error) {
        showError(error);
        return false;
      }
      return true;
    };

    const createNewProduct = async () => {
      setLoading(true);
      const checkValid = isValidData();
      try {
        if (checkValid) {
          const fileUri = pickedImagePath;
          const fileName = fileUri.split("/").pop(); // Lấy tên tệp từ đường dẫn
          const fileExtension = getFileExtension(fileName);

          var formData = new FormData();
          formData.append("product", JSON.stringify(product));
          formData.append("fileImage", {
            uri: fileUri, // Đường dẫn đến file
            type: `image/${fileExtension}`,
            name: fileName, // Tên file
          });

          var headers = {
            "Content-type": "multipart/form-data",
          };

          console.log(product);

          await apiPost(CREATE_NEW_PRODUCT, formData, headers, true)
            .then((res) => {
              setLoading(false);
              showSuccess("Success!");
            })
            .catch((error) => {
              showError(error.error_message);
              setLoading(false);
            });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    return (
      <Header
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: Color.textLight,
              borderRadius: SIZES.radius,
              backgroundColor: Color.whileOpacity,
            }}
            onPress={() =>
              navigation.navigate("SalerTab", { screen: "ShopMainScreen" })
            }
          >
            <View style={styles.headerLeft}>
              <Icons
                icon={icons.Feather}
                size={12}
                color={Color.black}
                name={"chevron-left"}
              />
            </View>
          </TouchableOpacity>
        }
        rightComponent={
          <CustomButton
            loading={loading}
            label="Hoàn tất"
            onPress={() => createNewProduct()}
            // styleContainer={{ height: 35 }}
            textStyle={{ lineHeight: 18 }}
          />
        }
      ></Header>
    );
  }

  function renderImageChose() {
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
      }
    };

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

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
      }
    };

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        {!pickedImagePath ? (
          <TouchableOpacity style={styles.imagePickerStyle}>
            <ImageBackground
              source={ShoesFLas}
              resizeMode="contain"
              imageStyle={styles.image}
              style={styles.header}
            />
            <Text>Thêm ảnh</Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={{ uri: pickedImagePath }}
            style={styles.imagePickerStyle}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 5,
          }}
        >
          <Button
            icon="camera"
            mode="contained"
            onPress={() => openCamera()}
            style={{ marginRight: 20 }}
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
      </View>
    );
  }

  function renderDetailField() {
    return (
      <ScrollView>
        <View style={styles.profileSessionContainer}>
          <ProductValue
            label={"Tên sản phẩm"}
            value={name}
            onPress={() => {
              setNameModal(true);
            }}
          />
          <LineDivider />

          <ProductValue
            label={"Mô tả "}
            value={description}
            onPress={() => {
              setDescriptionModal(true);
            }}
          />
          <LineDivider />

          <ProductValue
            label={"Giá"}
            value={price}
            onPress={() => {
              setPriceModal(true);
            }}
          />
          <LineDivider />

          <ProductValue
            label={"Link sản phẩm"}
            value={link}
            onPress={() => {
              setLinkModal(true);
            }}
          >
            <CustomButton
              label={"Kiểm tra"}
              onPress={() => {
                link ? openWebLink(link) : null;
              }}
              styleContainer={{
                backgroundColor: Color.transparent,
                marginRight: 5,
              }}
              textStyle={{ color: Color.mainColor }}
            />
          </ProductValue>
          <LineDivider />

          <ProductValue
            label={"Kiểu dáng"}
            value={type}
            onPress={() => {
              setTypeModal(true);
            }}
          />
          <LineDivider />

          <ProductValue
            label={"Số lượng"}
            value={quantity}
            onPress={() => {
              setQuantityModal(true);
            }}
          />
          <LineDivider />

          <ProductValue
            label={"Nhãn hàng"}
            value={brand}
            onPress={() => {
              setBrandModal(true);
            }}
          />
        </View>
      </ScrollView>
    );
  }

  function renderTagType() {
    const handleTypeTagPress = (tag) => {
      if (type === tag) {
        setType("");
      } else {
        setType(tag);
      }
    };

    return (
      <View style={styles.selectedTagsContainer}>
        {typeList.map((tag, index) => (
          <Fragment key={index}>
            <TypeCard
              type={tag}
              onPress={() => handleTypeTagPress(tag?.value)}
              imageStyle={{
                opacity: type == tag.value ? 1 : 0.1,
                marginRight: 15,
                paddingRight: 15,
              }}
              containerStyle={{
                height: 40,
                width: "100%",
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginRight: 15,
                justifyContent: "flex-end",
                ...styles.tagType,
                paddingRight: 10,
              }}
              textStyle={{
                color: Color.black,
                fontSize: 16,
              }}
            />
          </Fragment>
        ))}
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F2F1FD",
      }}
    >
      {loading && (
        <>
          <Progress.Bar
            progress={0.9}
            indeterminate={true}
            width={windowWidth}
            borderColor={Color.blueMain}
            color={Color.blueMain}
            height={4}
            style={{ position: "absolute", zIndex: 10 }}
            borderRadius={0}
            borderWidth={0}
          />
          <View
            style={{
              position: "absolute",
              top: 3,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color="white" />
            <Text style={{ color: Color.white, alignItems: "center" }}>
              Quá trình này có thể mất vài phút, xin hãy giữ kết nối
            </Text>
          </View>
        </>
      )}

      {/* {Header} */}
      {renderHeader()}

      {/* Image */}
      {renderImageChose()}

      {/* Detail */}
      {renderDetailField()}

      {nameModal && (
        <ModalInputText
          isVisible={nameModal}
          label={"Tên sản phẩm"}
          onClose={() => setNameModal(false)}
          value={name}
          onPress={(name) => setName(name)}
        />
      )}

      {descriptionModal && (
        <ModalInputText
          isVisible={descriptionModal}
          label={"Mô tả sản phẩm"}
          onClose={() => setDescriptionModal(false)}
          value={description}
          onPress={(description) => setDescription(description)}
          maxLength={2500}
        />
      )}

      {priceModal && (
        <ModalInputNumber
          isVisible={priceModal}
          label={"Giá sản phẩm"}
          onClose={() => setPriceModal(false)}
          value={price}
          onPress={(price) => setPrice(price)}
          isInteger={false}
        />
      )}

      {linkModal && (
        <ModalInputText
          isVisible={linkModal}
          label={"Link sản phẩm"}
          onClose={() => setLinkModal(false)}
          // value={link || "https://shopee.vn/ruby_store.88"}
          value={link || "https://"}
          maxLength={500}
          onPress={(link) => {
            setLink(link);
          }}
        />
      )}

      {typeModal && (
        <InputModal
          isVisible={typeModal}
          label={"Loại giày"}
          onClose={() => setTypeModal(false)}
          styleContainer={{
            height: 600,
          }}
        >
          <View
            styleContainer={{
              borderWidth: 2,
            }}
          >
            {renderTagType()}
          </View>
        </InputModal>
      )}

      {quantityModal && (
        <ModalInputNumber
          isVisible={quantityModal}
          label={"Số lượng"}
          onClose={() => setQuantityModal(false)}
          value={quantity}
          onPress={(quantity) => setQuantity(quantity)}
          isInteger={true}
        />
      )}

      {brandModal && (
        <ModalInputBrand
          isVisible={brandModal}
          label={"Nhãn hiệu"}
          value={brand}
          onClose={() => setBrandModal(false)}
          onPress={(value) => setBrand(value)}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: Color.white,
    height: Dimensions.get("window").height / 15,
    marginHorizontal: 5,
    marginTop: 5,
  },
  headerLeft: {
    borderColor: Color.textLight,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    borderRadius: 10,
  },

  shadowTouch: {
    borderRadius: 16,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  // textInput: {
  //   backgroundColor: Color.white,
  //   borderRadius: 25,
  //   color: "#14171A",
  //   fontSize: 16,
  //   height: 120,
  //   marginBottom: 10,
  //   marginTop: 10,
  //   marginHorizontal: 5,
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   textAlignVertical: "top",
  //   borderColor: "#E1E8ED",
  //   borderWidth: 2,
  // },

  header: {
    height: 75,
    width: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileSessionContainer: {
    marginHorizontal: SIZES.font,
    paddingHorizontal: SIZES.title,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
    backgroundColor: Color.whileOpacity,
  },

  imagePickerStyle: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: (windowWidth * 4) / 5,
    height: (windowHeight * 1) / 5,
    borderRadius: 15,
    borderColor: Color.darkGray,
    borderWidth: 1,
    backgroundColor: "#c0c0c0",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    alignItems: "baseline",
  },
  tagType: {
    margin: 2,
    borderRadius: 8,
  },
  selectedTagType: {
    paddingHorizontal: 4,
    margin: 2,
    backgroundColor: Color.white,
    color: Color.mainColor,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Color.mainColor,
  },
});
