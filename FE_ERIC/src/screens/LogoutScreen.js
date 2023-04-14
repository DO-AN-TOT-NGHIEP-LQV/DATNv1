

import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import ButtonWithLoader from '../components/ButtonWithLoader'
import actions from '../redux/actions'
import CustomButton from '../components/CustomButton/index.js'

export default function LogoutScreen() {

  const [isLoading, setLoading] = useState(false)

  const onLogoutAlert = () => {
    Alert.alert(
        'Logout',
        'Are you sure, you want to logout from this device',
        [{ text: 'Yes', onPress: logout }, { text: 'No', }],
        { cancelable: true }
    )
}
  const logout = () => {
      setLoading(true)
      setTimeout(() => {
          actions.logout()
          setLoading(false)
      }, 2000);

  }
  return (
    <View>

    <CustomButton
            isLoading={isLoading}
            label="Logout"
            onPress={onLogoutAlert}
        />

  </View>
  )
}