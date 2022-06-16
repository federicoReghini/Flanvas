import React, { useState, useEffect } from 'react';

// native components
import { View, Text, Pressable } from 'react-native';

//Components
import TutorialComponent from '../components/hookComponents/TutorialComponent'
import TutorialFirst from '../components/hookComponents/TutorialFirst';

//ASYNCSTORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

interface State {
  isFirstTime: boolean //variabile per capire se é la prima volta che apre l'app
}


const Tutorial = ({ route, navigation }) => {

  const initState = {
    isFirstTime: route.params.isFirstTime
  }

  const [state, setState] = useState<State>(initState)

  return (
    <View style={{ flex: 1 }}>
      {
        state.isFirstTime ?
          <TutorialFirst />
          :
          <TutorialComponent navigation={navigation} />
      }
    </View>
  )
}

export default Tutorial;