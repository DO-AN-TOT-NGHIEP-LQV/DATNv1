import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  DiscoverScreen,
  DetailPostScreem,
  Feeds,
  CreatePostScreen,
  SearchScreen,
} from "../screens/index";
import Profile from "../screens/Profile";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBarIcon from "../components/CustomTabBarIcon";

export default function (Stack) {
  return <Stack.Screen name="MainTab" component={MainTabs} />;
}

const BottomTab = createBottomTabNavigator();
const MainTabs = () => {
  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   // behavior="height"
    //   behavior="padding"
    //   keyboardVerticalOffset={Dimensions.get("window").height - 50}
    // >
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        // tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            ...styles.tabBarStyle,
            ...styles.shadow,
            // display: "flex",
            // height: 50,
          },
          null,
        ],
      }}
    >
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
        name="PostTab"
        component={CreatePostStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            // <View className=" items-center justify-center " >
            //     <AntDesign name="search1" size={size}  color={ focused ?'#AD40AF' : color } />
            //     <Text style={{ color: focused ?'#AD40AF' : color,  fontSize: 12 }} >
            //       SEARCH
            //     </Text>
            // </View>

            <CustomTabBarIcon
              nameIcon={"pluscircleo"}
              textLabel={"POST"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      {/* 
            <BottomTab.Screen name="PostTab" 
             component={CreatePostStackNavigator}
              options={{
                tabBarIcon: ({color, size, focused }) => (
                    <AntDesign name="plus" size={35} color="#AD40AF"  />
                ),
                tabBarButton: (props)=>(
                    <CustomTabBarButton {...props}/>
                ) 
              }}
            /> */}

      <BottomTab.Screen
        name="DiscoverTab"
        component={DiscoverStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            // <View className=" items-center justify-center " >
            //       <AntDesign name="find" size={size}  color={ focused ?'#AD40AF' : color } />
            //       <Text style={{ color: focused ?'#AD40AF' : color,  fontSize: 12 }} >

            //       </Text>
            // </View>

            <CustomTabBarIcon
              nameIcon={"find"}
              textLabel={"DISCOVER"}
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

            // {/* <View className=" items-center justify-center " >
            //     <AntDesign name="setting" size={size}  color={ focused ?'#AD40AF' : color } />
            //     <Text style={{ color: focused ?'#AD40AF' : color,  fontSize: 12 }} >

            //     </Text>
            // </View> */}
          ),
        }}
      />
    </BottomTab.Navigator>
    // {/* </KeyboardAvoidingView> */}
  );
};

// const CustomTabBarButton = ({children, onPress}) => {
//   return (

//     <TouchableOpacity
//       style={{
//           // top: 20,
//           justifyContent: 'center',
//           alignItems: 'center',
//           ...styles.shadow
//       }}
//       onPress={onPress}
//     >
//         <View
//           style={styles.customTabBarButton}
//         >
//           {children}
//         </View>
//     </TouchableOpacity>
//   )

// }

const HomeNavigator = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeNavigator.Screen name="Home" component={HomeScreen} />
      <HomeNavigator.Screen name="Feed" component={Feeds} />
    </HomeNavigator.Navigator>
  );
};

const SearchNavigator = createNativeStackNavigator();
const SearchStackNavigator = () => {
  return (
    <SearchNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeNavigator.Screen name="Search" component={SearchScreen} />
    </SearchNavigator.Navigator>
  );
};

const DiscoverNavigator = createNativeStackNavigator();
const DiscoverStackNavigator = () => {
  return (
    <DiscoverNavigator.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverNavigator.Screen name="Discover" component={DiscoverScreen} />
      <DiscoverNavigator.Screen
        name="DetailPost"
        component={DetailPostScreem}
      />
    </DiscoverNavigator.Navigator>
  );
};

const CreatePostNavigator = createNativeStackNavigator();
const CreatePostStackNavigator = () => {
  return (
    <DiscoverNavigator.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverNavigator.Screen
        name="CreatePost"
        component={CreatePostScreen}
      />
      {/* <DiscoverNavigator.Screen name="DetailPost" component={DetailPostScreem} /> */}
    </DiscoverNavigator.Navigator>
  );
};

const SettingNavigator = createNativeStackNavigator();
const SettingStackNavigator = () => {
  return (
    <SettingNavigator.Navigator screenOptions={{ headerShown: false }}>
      <SettingNavigator.Screen name="Profile" component={Profile} />
    </SettingNavigator.Navigator>
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
    // position: "absolute",
    // left: 0,
    // right: 0,
    bottom: 0,
    position: "relative",
    borderTopColor: "#3333",
    borderTopWidth: 2,
    elevation: 0,
    backgroundColor: "#ffffff",
    // borderRadius: 15,
    // height: 60
  },
  customTabBarButton: {
    bottom: -10,
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderTopColor: "#3333",
  },
});
// navigation.navigate('CommunityTab', { screen: 'CommunityReply',  params: {key: 'value'}});
