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

const initState = {
  isFirstTime: true
}

const Tutorial = (props) => {

  const [state, setState] = useState<State>(initState)

  const getItemFromStorage_ = async (): Promise<void> => {

    const value = await AsyncStorage.getItem('firstTime')
    const newState = Object.assign({}, state)

    if (value !== null) {
      newState.isFirstTime = JSON.parse(value)
    }

    setState(newState)
  }

  useEffect(() => {
    getItemFromStorage_()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {
        state.isFirstTime ?
          <TutorialFirst />
          :
          <TutorialComponent navigation={props.navigation} />
      }
    </View>
  )
}

export default Tutorial;