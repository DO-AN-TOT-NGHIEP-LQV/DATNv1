
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';


const MasanoryContainer = ({data}) => {

  return (
    <MasonryList
            data={data}
            keyExtractor={(item)  => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <CardItem data={item} />}            
    />
  );
};


const CardItem = ({data}) => {

    const nagivation = useNavigation()

    // useLayoutEffect(() => {
    //     nagivation.setOptions({
    //       headerShown : false,
    //     });
    //   } , [])

    const handleClick = () => {
        nagivation.navigate("DetailPost", {param : data.id}  )
    }

    return (
      <TouchableOpacity 
        style={{height: Math.round(Math.random() * 100 + 160)}}
        className="bg-[#111] m-1 rounded-md relative overflow-hidden"
        onPress={handleClick}
        > 
            <Image 
            source={{uri: data.imageUrl}}
            className="w-full h-full object-cover"
            />
      </TouchableOpacity>
    )
  
};

export default MasanoryContainer