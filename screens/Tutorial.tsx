import React from 'react';

// native components
import { View, Text, Pressable } from 'react-native';
import CustomCamera from '../components/hookComponents/CustomCamera';

const Tutorial = (props) => {
  return (
    <View style={{flex: 1}}>
      <Pressable onPress={() => { }}>
        <Text>Go to home</Text>
      </Pressable>
      <Text>Tutorial</Text>
      <CustomCamera />

    </View>
  )
}

export default Tutorial;