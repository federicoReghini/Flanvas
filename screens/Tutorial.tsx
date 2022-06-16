import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useState } from 'react';

// native components
import { View } from 'react-native';

//Components
import TutorialComponent from '../components/hookComponents/TutorialComponent'
import TutorialFirst from '../components/hookComponents/TutorialFirst';


interface State {
  isFirstTime: boolean //variabile per capire se é la prima volta che apre l'app
}

type RootStackParamList = {
  Tutorial: { isFirstTime: boolean } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;


const Tutorial: FunctionComponent<Props> = ({ route }) => {

  const initState = {
    isFirstTime: route.params?.isFirstTime
  }

  const [state, setState] = useState<State>(initState)

  return (
    <View style={{ flex: 1 }}>
      {
        state.isFirstTime ?
          <TutorialFirst />
          :
          <TutorialComponent />
      }
    </View>
  )
}

export default Tutorial;