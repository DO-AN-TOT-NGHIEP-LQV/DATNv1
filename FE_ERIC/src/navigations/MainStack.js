import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen, DiscoverScreen, DetailPostScreem} from '../screens/index'
import Profile from '../screens/Profile';
import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function (Stack){
    return (
    <Stack.Screen name="MainTab" component={MainTabs}  >
    </Stack.Screen>
  )
}

const BottomTab = createBottomTabNavigator();

const MainTabs = () => {
    return( 
        <BottomTab.Navigator         
            screenOptions={{headerShown: false}}        
            >
            <BottomTab.Screen name="HomeTab" component={HomeStackNavigator}/>
            <BottomTab.Screen name="DiscoverTab" component={DiscoverStackNavigator}/>
            <BottomTab.Screen name="SettingTab" component={SettingStackNavigator}/>

        </BottomTab.Navigator>
    )
}

const HomeNavigator = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeNavigator.Navigator     
        screenOptions={{headerShown: false}}        
    >
      <HomeNavigator.Screen
        name="Home"
        component={HomeScreen}
      />

    </HomeNavigator.Navigator>
  );
};

const DiscoverNavigator = createNativeStackNavigator();
const DiscoverStackNavigator = () => {
  return (
    <DiscoverNavigator.Navigator
    screenOptions={{headerShown: false}}        
    >

      <DiscoverNavigator.Screen
        name="Discover"
        component={DiscoverScreen}
      />
       <DiscoverNavigator.Screen
        name="DetailPost"
        component={DetailPostScreem}
      />
    </DiscoverNavigator.Navigator>
  );
};

const SettingNavigator = createNativeStackNavigator();
const SettingStackNavigator = () => {
  return (
    <SettingNavigator.Navigator 
        screenOptions={{headerShown: false}}        
    >
    
      <SettingNavigator.Screen
        name="Profile"
        component={Profile}
      />
    </SettingNavigator.Navigator>
  );
};

// navigation.navigate('CommunityTab', { screen: 'CommunityReply',  params: {key: 'value'}});