

import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import ButtonWithLoader from '../components/ButtonWithLoader'
import actions from '../redux/actions'

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

    <ButtonWithLoader
            isLoading={isLoading}
            text="Logout"
            onPress={onLogoutAlert}
        />

  </View>
  )
}