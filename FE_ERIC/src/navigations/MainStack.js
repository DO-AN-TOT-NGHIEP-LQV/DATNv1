import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  CreatePostScreen,
  SearchTextScreen,
  DetailProductScreen,
  SearchImageScreen,
  LoginScreen,
  SignupScreen,
  ShopMainScreen,
  CreateProductScreen,
  ManagerProductScreen,
  ProfileShopScreen,
  AdminMainScreen,
  UpdateProductScreen,
  ShopManagerProductScreen,
} from "../screens/index";
import ProfileScreen from "../screens/ProfileScreen";
import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBarIcon from "../components/CustomTabBarIcon";
import { useSelector } from "react-redux";
import { hasAdminRole, hasSalerRole } from "../ultils/helperFunction";
import { Color } from "../constans";
import ShopCreateProduct from "../screens/Shop/ShopCreateProduct";

export default function (Stack) {
  return <Stack.Screen name="MainTab" component={MainTabs} />;
}

const BottomTab = createBottomTabNavigator();
const MainTabs = () => {
  const detailUser = useSelector((state) => state.auth.detailUser);

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            ...styles.tabBarStyle,
            ...styles.shadow,
          },
          null,
        ],

        initialParams: {
          defaultScreen: route.name === "SearchTab" ? "SearchText" : null, // Tên màn hình mặc định của Tab A
        },
      })}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabBarIcon
              nameIcon={"home"}
              textLabel={"HOME"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabBarIcon
              nameIcon={"search1"}
              textLabel={"SEARCH"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="SettingTab"
        component={SettingStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabBarIcon
              nameIcon={"setting"}
              textLabel={"SETTING"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      {detailUser?.roles && hasSalerRole(detailUser?.roles) && (
        <BottomTab.Screen
          name="ShopTab"
          component={SalerManagerStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <CustomTabBarIcon
                nameIcon={"shoppingcart"}
                textLabel={"MY SHOP"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />
      )}

      {/* {detailUser?.roles && hasAdminRole(detailUser?.roles) && ( */}
      {true && (
        <BottomTab.Screen
          name="AdminTab"
          component={AdminManagerStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <CustomTabBarIcon
                nameIcon={"appstore-o"}
                textLabel={"ADMIN"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />
      )}

      {/* Differin Screen */}
      {/* Login */}
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />
      <BottomTab.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      {/* Search and Detail  */}
      <BottomTab.Screen
        name="DetailProduct"
        component={DetailProductScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />

      {/* Mangager Saler Screen */}
      <BottomTab.Screen
        name="CreateProductScreen"
        component={CreateProductScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <BottomTab.Screen
        name="ManagerProductScreen"
        component={ManagerProductScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <BottomTab.Screen
        name="UpdateProductScreen"
        component={UpdateProductScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <BottomTab.Screen
        name="ProfileShopScreen"
        component={ProfileShopScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
    </BottomTab.Navigator>
  );
};

const HomeNavigator = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeNavigator.Screen name="Home" component={HomeScreen} />
      {/* <HomeNavigator.Screen name="Feed" component={Feeds} /> */}
    </HomeNavigator.Navigator>
  );
};

const SearchNavigator = createNativeStackNavigator();
const SearchStackNavigator = () => {
  return (
    <SearchNavigator.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SearchText"
    >
      <SearchNavigator.Screen
        name="SearchImage"
        component={SearchImageScreen}
        // options={{ tabBarStyle: { display: "none" } }}
      />
      <SearchNavigator.Screen
        name="SearchText"
        component={SearchTextScreen}
        // options={{ tabBarStyle: { display: "none" } }}
      />

      {/* <SearchNavigator.Screen name="Search" component={SearchScreen} /> */}
      {/* <HomeNavigator.Screen
        name="DetailProduct"
        component={DetailProductScreen}
      /> */}
    </SearchNavigator.Navigator>
  );
};

// const DiscoverNavigator = createNativeStackNavigator();
// const DiscoverStackNavigator = () => {
//   return (
//     <DiscoverNavigator.Navigator screenOptions={{ headerShown: false }}>
//       <DiscoverNavigator.Screen name="Discover" component={DiscoverScreen} />
//       <DiscoverNavigator.Screen
//         name="DetailPost"
//         component={DetailPostScreem}
//         // options={{ tabBarStyle: { display: "flex" } }}
//       />
//     </DiscoverNavigator.Navigator>
//   );
// };

const CreatePostNavigator = createNativeStackNavigator();
const CreatePostStackNavigator = () => {
  return (
    <CreatePostNavigator.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverNavigator.Screen
        name="CreatePost"
        component={CreatePostScreen}
      />
      {/* <DiscoverNavigator.Screen name="DetailPost" component={DetailPostScreem} /> */}
    </CreatePostNavigator.Navigator>
  );
};

const SettingNavigator = createNativeStackNavigator();
const SettingStackNavigator = () => {
  return (
    <SettingNavigator.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileScreen"
    >
      <SettingNavigator.Screen name="ProfileScreen" component={ProfileScreen} />
    </SettingNavigator.Navigator>
  );
};

const SalerManagerNavigator = createNativeStackNavigator();
const SalerManagerStackNavigator = () => {
  return (
    <SalerManagerNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ShopMainScreen"
    >
      <SalerManagerNavigator.Screen
        name="ShopMainScreen"
        component={ShopMainScreen}
        // options={{ tabBarVisible: true }}
      />
      <SalerManagerNavigator.Screen
        name="ShopManagerProductScreen"
        component={ShopManagerProductScreen}
      />
      <SalerManagerNavigator.Screen
        name="ShopCreateProduct"
        component={ShopCreateProduct}
      />
    </SalerManagerNavigator.Navigator>
  );
};

const AdminSalerManagerNavigator = createNativeStackNavigator();
const AdminManagerStackNavigator = () => {
  return (
    <AdminSalerManagerNavigator.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AdminMainScreen"
    >
      <AdminSalerManagerNavigator.Screen
        name="AdminMainScreen"
        component={AdminMainScreen}
      />
    </AdminSalerManagerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBarStyle: {
    bottom: 0,
    position: "relative",
    borderTopColor: "#3333",
    borderTopWidth: 2,
    elevation: 0,
    backgroundColor: Color.white,
  },
  customTabBarButton: {
    bottom: -10,
    backgroundColor: Color.white,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Color.white,
    borderTopColor: "#3333",
  },
});
// navigation.navigate('CommunityTab', { screen: 'CommunityReply',  params: {key: 'value'}});
