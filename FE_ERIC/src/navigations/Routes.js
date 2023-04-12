import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();

const Routes = () => {

    const userData = useSelector((state) => state.auth.userData)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} >

                {!!userData && userData?.access_token ? MainStack(Stack) 
                : AuthStack(Stack)
                }
            </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Routes








