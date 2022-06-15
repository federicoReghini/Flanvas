import { View, Text, Pressable } from 'react-native'
import React, { FunctionComponent } from 'react'

//ASYNCSTORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

const TutorialFirst: FunctionComponent = () => {

    const __functionTest = async (): Promise<void> => {
        await AsyncStorage.setItem('firstTime', JSON.stringify(false))
    }

    return (
        <View>
            <Text>TutorialFirst</Text>
            <Pressable onPress={__functionTest}>
                <Text>Cliccami Senpai e poi Ricarica hihi</Text>
            </Pressable>
        </View>
    )
}

export default TutorialFirst