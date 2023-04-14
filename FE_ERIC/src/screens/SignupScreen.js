import React, { useState } from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Surface, TextInput, Title, Text } from 'react-native-paper'
import { LoginImg } from '../public/assets';
import { showMessage } from 'react-native-flash-message';
import { showError } from '../ultils/helperFunction';
import CustomButton from '../components/CustomButton/index.js';
import validator from '../ultils/validations';
import actions from '../redux/actions';


export default function SignupScreen({navigation}) {

    const [state, setState] = useState({
        isLoading: false,
        username: '1',
        email: '123@gmail.com',
        password: '1',
        confirmPassword: '',
        isSecure: true
    })
    const { isLoading, username, email, password, isSecure, confirmPassword } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            username,
            email,
            password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onSignup = async () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })
            try {
                const res = await actions.signup({
                    username,
                    email,
                    password
                })
                console.log("res of signup==>>>>>", res)
                showMessage("Registered successfully...!!!!")
                updateState({ isLoading: false })
                navigation.goBack()
            } catch (error) {
                // console.log("error raised")
                showError(error.error_message)
                updateState({ isLoading: false })
            }
        }
    }

  return (
    <ImageBackground source= {LoginImg} style={styles.image} blurRadius={10} >

        <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
            <Surface style={styles.box}>
            <View>
            
                <TextInput
                label="Username"
                mode="outlined"
                value={username}
                onChangeText={(username) => updateState({ username })}
                />

                <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={(email) => updateState({ email })}
                />


                <TextInput
                label="Password"
                mode="outlined"
                value={password}
                onChangeText={(password) => updateState({ password })}
                />
            </View>

            <CustomButton label={"Register"} onPress={onSignup} isLoading={isLoading} />

            {/* // <Button
            //     mode="contained"
            //     color={'#AD40AF'}
            //     style={{ marginTop: 20 }}
            //     >
            //     Submit
            // </Button> */}
            </Surface>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '',
    // alignItems : 'between'
  },
  box: {
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    height: 250,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
})


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
// import ButtonWithLoader from '../components/ButtonWithLoader';
// import TextInputWithLable from '../components/TextInputWithLable';
// import validator from '../ultils/validations';
// import { showError } from '../ultils/helperFunction';
// import actions from '../redux/actions';
// import { showMessage } from 'react-native-flash-message';
// import InputFieldCustom from '../components/InputFieldCustom';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import CustomButton from '../components/CustomButton/index.js';
// import { LoginImg } from '../public/assets';


// const Signup = (navigation) => {

//     const [state, setState] = useState({
//         isLoading: false,
//         username: '',
//         email: '',
//         password: '',
//         isSecure: true
//     })
//     const { isLoading, username, email, password, isSecure } = state
//     const updateState = (data) => setState(() => ({ ...state, ...data }))


//     const isValidData = () => {
//         const error = validator({
//             username,
//             email,
//             password
//         })
//         if (error) {
//             showError(error)
//             return false
//         }
//         return true
//     }

//     const onSignup = async () => {
//         const checkValid = isValidData()
//         if (checkValid) {
//             updateState({ isLoading: true })
//             try {
//                 const res = await actions.signup({
//                     username: username,
//                     password
//                 })
//                 console.log("res of signup==>>>>>", res)
//                 showMessage("Registered successfully...!!!!")
//                 updateState({ isLoading: false })
//                 navigation.goBack()
//             } catch (error) {
//                 // console.log("error raised")
//                 showError(error)
//                 updateState({ isLoading: false })
//             }
//         }
//     }
//     return (  
//         // {/* <View style={styles.container}>
//         //     <TextInputWithLable
//         //         label="User name"
//         //         placheHolder="enter your user name"
//         //         onChangeText={(username) => updateState({ username })}
//         //     />
//         //     <TextInputWithLable
//         //         label="Email"
//         //         placheHolder="enter your email"
//         //         onChangeText={(email) => updateState({ email })}
//         //     />
//         //     <TextInputWithLable
//         //         label="Password"
//         //         placheHolder="enter your password"
//         //         // isSecure={isSecure}
//         //         secureTextEntry={isSecure}
//         //         onChangeText={(password) => updateState({ password })}
//         //     />

//         //     <ButtonWithLoader
//         //         text="Signup"
//         //         onPress={onSignup}
//         //         isLoading={isLoading}
//         //     />
//         // </View> */}
//         <View className="flex-[1]  justify-center pt-[50]">
//             <View  className="px-[20] " >
//                 <View style={{ alignItems: 'center' }}>
//                     <Image
//                         className="w-40 h-40 object-cover"
//                         style={{ transform: [{ rotate: '-5deg' }] }}
//                         source={LoginImg}
//                     />
//                                     <Text  className="mb-[30] font-lg text-[28px] text-[#333] ">
//                     Register
//                 </Text> 
//                 </View>


//                 <InputFieldCustom
//                     label="Username"
//                     placeholder="enter your username"
//                     value={username}
//                     onChangeText={(username) => updateState({ username })}
//                     icon={
//                         <MaterialIcons
//                         name="alternate-email"
//                         size={20}
//                         color="#666"
//                         style={{ marginRight: 5 }}
//                         />
//                     }
//                 />

//                 <InputFieldCustom
//                         label="Password"
//                         placeholder="enter your password"
//                         value={password}
//                         isSecure={true}
//                         secureTextEntry={isSecure}
//                         onChangeText={(password) => updateState({ password })}
//                         icon={
//                             <Ionicons 
//                             name="ios-lock-closed-outline"
//                             size={20}
//                             color="#666"
//                             style={{ marginRight: 5 }}
//                             />
//                         }
//                         fieldButtonLabel={"Forgot?"}
//                         fieldButtonFunction={() => { }}
//                 />
//                 <CustomButton label={"Login"} onPress={onSignup} isLoading={isLoading} />


//                 <View className="mb-[60] justify-center flex-row">
//                     <Text>New to the app?</Text>
//                     <TouchableOpacity  onPress={() => navigation.navigate('Signup')}>
//                         <Text className=" font-[700] text-[#AD40AF]"> Register</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View> 
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: 'white'
//     },
// });


// export default Signup;