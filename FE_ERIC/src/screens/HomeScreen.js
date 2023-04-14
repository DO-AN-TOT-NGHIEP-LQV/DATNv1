import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeroImage } from '../public/assets';
import * as Animatable from 'react-native-animatable';
import actions from '../redux/actions';
import { useSelector } from 'react-redux';
import { showError } from '../ultils/helperFunction';

const HomeScreen = () => {

  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth.userData)

   useLayoutEffect(() => {
      navigation.setOptions({
        headerShown : false,
      });
    } , [])

    const navigatorToScreen = () =>{
      navigation.navigate('DiscoverTab', { screen: 'DetailPost' });
    }

   const getAllUsses = async() =>{
    try{
          const res = await actions.getAllUsers()
          console.log(res.data)
    }
    catch(error){
      console.log('co loi')
      showError(error.error_message)
    }
     }

   const refreshToken = async (refresh_token =  userData.refresh_token) =>{
    try{
          const res = await actions.refreshToken(refresh_token)
          console.log(res.data)
    }
    catch(error){
      showError(error.error_message)
    }
     }
    /*

  //   var bodyFormData = new FormData();
  //   bodyFormData.append('username', 1);
  //   bodyFormData.append('password', 1); 

  //   axios.post('http://192.168.1.4:8080/api/login', bodyFormData, {
  //       headers:{
  //         "Content-Type": "multipart/form-data",
  //       }
  //   }).then( response => ( console.log(response.data.access_token)));


  //   axios.get('http://192.168.1.4:8080/api/users', {
  //     headers: {
  //       Authorization : 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjgwODM3NzM4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2xvZ2luIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX1VTRVIiXX0.FPV7h8yc5Mt83P3XWo0cy0kAhu1o53Cvn5LtdeaBVgc'
  //     },
  // }).then( response => ( console.log(response.data)));
  */


  return (
    <SafeAreaView className="bg-red-100 flex-1 relative ">

      
      {/* First Section */}
      <View className="flex-row px-6 mt-5 items-center space-x-2">
        <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
          <Text className="text-[#00BCC9] text-2xl font-semibold">Go</Text>
        </View>
        <Text className="text-[#2A2B4B] text-2xl font-semibold"> Travel</Text>
      </View>

      {/* Seccond Section */}
      <View className="px-6 mt-5 space-y-2">
        <Text className="text-[#3c6072] text-[38px]">Enjoy the trip with</Text>
        <Text className="text-[#00BCC9] text-[34px] font-bold">Good moments</Text>

        <Text className="text-[#3C6072]">
            Lsdjas  ddasvnkdjck xlcvv ndsvsdvnk svsdcsdcsdcmv 
            sdskdvlsdvdskvm slkv sldv sldv  
        </Text>
      </View>

      {/* Circel Section */}
        <View className="w-[300px] h-[300px] bg-[#00BCC9]
         rounded-full absolute bottom-36  -right-1/4" ></View>
        <View className="w-[300px] h-[300px] bg-[#E99265]
         rounded-full absolute -bottom-20 -left-1/4" ></View>

      {/* Circel Section */}
      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={ HeroImage }
          className="w-full h-full object-cover mt-20"
        />

        <TouchableOpacity
          onPress={ () => refreshToken()}

          // onPress={() => testAxios()}
          className=" absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center">
            <Animatable.View 
              className="w-20  h-20 items-center justify-center rounded-full bg-[#00BCC9]"
              animation={"pulse"} 
              easing="ease-in-out"
              iterationCount={'infinite'}
               >  
                  <Text className="text-gray-50 text-[34px] font-semibold">refresh</Text>
            </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ () => getAllUsses()}

          // onPress={() => testAxios()}
          className=" absolute bottom-50 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center">
            <Animatable.View 
              className="w-20  h-20 items-center justify-center rounded-full bg-[#00BCC9]"
              animation={"pulse"} 
              easing="ease-in-out"
              iterationCount={'infinite'}
               >  
                  <Text className="text-gray-50 text-[34px] font-semibold">Go</Text>
            </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>


  )
}

export default HomeScreen