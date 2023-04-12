import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLable';

import validator from '../ultils/validations';

import { showError } from '../ultils/helperFunction';
import actions from '../redux/actions';
import { showMessage } from 'react-native-flash-message';


const Signup = ({ navigation }) => {

    const [state, setState] = useState({
        isLoading: false,
        username: '',
        email: '',
        password: '',
        isSecure: true
    })
    const { isLoading, username, email, password, isSecure } = state
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
                    username: username,
                    password
                })
                console.log("res of signup==>>>>>", res)
                showMessage("Registered successfully...!!!!")
                updateState({ isLoading: false })
                navigation.goBack()
            } catch (error) {
                // console.log("error raised")
                showError(error)
                updateState({ isLoading: false })
            }
        }
    }
    return (
        <View style={styles.container}>
            <TextInputWithLable
                label="User name"
                placheHolder="enter your user name"
                onChangeText={(username) => updateState({ username })}
            />
            <TextInputWithLable
                label="Email"
                placheHolder="enter your email"
                onChangeText={(email) => updateState({ email })}
            />
            <TextInputWithLable
                label="Password"
                placheHolder="enter your password"
                // isSecure={isSecure}
                secureTextEntry={isSecure}
                onChangeText={(password) => updateState({ password })}
            />

            <ButtonWithLoader
                text="Signup"
                onPress={onSignup}
                isLoading={isLoading}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white'
    },
});


export default Signup;