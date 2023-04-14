import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const InputFieldCustom = ({
  label,
  value,
  placeholder,
  onChangeText,
  fieldButtonLabel,
  fieldButtonFunction,
  isSecure  = false,
  icon,
  ...props }) => {
  return (
    <View className = 'pb-2 mb-[25px] flex-row border-y-[#ccc]'
          style = {{borderBottomWidth: 1}}
    >
      {icon}
      <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                placeholderTextColor="gray"
                isSecure = {isSecure}
                className= "flex-[1] py-0  "
                {...props}
                
      />
      
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: '#AD40AF', fontWeight: '700' }}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default InputFieldCustom;