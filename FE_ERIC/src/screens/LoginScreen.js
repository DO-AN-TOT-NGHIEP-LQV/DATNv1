

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLable';
import validator from '../ultils/validations';
import { showError } from '../ultils/helperFunction';
import actions from '../redux/actions';
import { showMessage } from 'react-native-flash-message';

const LoginScreen = ({ navigation }) => {

    const [state, setState] = useState({
        isLoading: false,
        username: '1',
        password: '1',
        isSecure: true
    })
    const { isLoading, username, password, isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))

    const isValidData = () => {
        const error = validator({
            username,
            password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onLogin = async () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })
            try {
                var bodyFormData = new FormData();
                bodyFormData.append('username', username);
                bodyFormData.append('password', password); 

                const res = await actions.login(bodyFormData)
                showMessage("Login successfully...!!!!")
                updateState({ isLoading: false })
            } catch (error) {
                showError(error.error_message)
                updateState({ isLoading: false })
            }

            // navigation.navigate('Signup')
        }
    }
    return (
        <View style={styles.container}>
            <TextInputWithLable
                label="Username"
                placheHolder="enter your username"
                value={state.username}
                onChangeText={(username) => updateState({ username })}
            />
            <TextInputWithLable
                label="Password"
                placheHolder="enter your password"
                value={state.password}

                // isSecure={isSecure}
                secureTextEntry={isSecure}
                onChangeText={(password) => updateState({ password })}
            />

            <ButtonWithLoader
                text="Login"
                onPress={onLogin}
                isLoading={isLoading}
            />

            <View style={{marginVertical: 8}} />

            <ButtonWithLoader
                text="Signup"
                onPress={() => navigation.navigate('Signup')}
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


export default LoginScreen;