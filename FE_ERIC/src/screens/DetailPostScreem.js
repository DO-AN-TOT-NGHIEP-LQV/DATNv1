
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const DetailScreem = ( { route} ) => {

  const id = route?.params?.param 
  const [isLoading, setLoading] = useState(false)

  const navigation = useNavigation();
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown : false,
  //   });
  // } , [])

  return (
    <View className=" flex-1 bg-white   relative mt-6">
       {isLoading ? (
        <ActivityIndicator color={"#ff0000"} size={"large"} /> 
        ) : (
          <> 
            <Image    
                source={{uri: "https://cdn.pixabay.com/photo/2020/05/04/07/15/nike-5128118__340.jpg"}}
                className="w-full h-full object-cover"
            />
            
            <SafeAreaView className="absolute z-10 inset-0 flex items-center justify-start">
                <TouchableOpacity 
                    className="w-full flex px-4"
                    onPress={()=> navigation.navigate("Discover")}
                >
                  <AntDesign name="caretleft" size={24} color="white" />
                </TouchableOpacity>

                <View className="w-full h-full relative ">
                  <View className=" absolute bottom-12 inset-x-0 px-4" >
                     </View>
                </View>

            </SafeAreaView>
          </>
        )}
    </View>
  )
}

export default DetailScreem