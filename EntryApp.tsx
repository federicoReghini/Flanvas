import React, { FC, ReactElement, useEffect, useState } from 'react';

// native components
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

//Asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage'

// screens
import Home from './screens/Home';
import Tutorial from './screens/Tutorial';

type RootStackParamList = {
    Home: undefined;
    Tutorial: {isFirstTime: boolean};
};

interface State {
    isPermission: boolean
    isFirstTime?: boolean
}

const initState = {
    isPermission: false,
}

const EntryApp: FC = (): ReactElement => {

    const Stack = createStackNavigator<RootStackParamList>();

    const [state, setState] = useState<State>(initState);

    const handleUseEffect = (): void => {

        const newState = Object.assign({}, state);

        (async (): Promise<void> => {

            //await AsyncStorage.clear()

            const [CAMERA, MEDIA, STORAGE] = await Promise.all([
                Camera.getCameraPermissionsAsync(),
                MediaLibrary.requestPermissionsAsync(),
                AsyncStorage.getItem('firstTime')
            ]);

            if ((CAMERA.status && MEDIA.status) === "granted") {
                newState.isPermission = true;
            }

            if (STORAGE !== null) {
                newState.isFirstTime = JSON.parse(STORAGE)
            }

            setState(newState);
        })()
    }

    useEffect(handleUseEffect, []);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={state.isFirstTime ? 'Tutorial' : 'Home'}
                >

                    <Stack.Screen
                        name='Tutorial'
                        component={Tutorial}
                        options={
                            {
                                title: 'Tutorial',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                },
                                headerTintColor: '#44403C',
                                headerTitleAlign: 'center',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    fontSize: 24,
                                }
                            }
                        }
                        initialParams={{
                            isFirstTime: state.isFirstTime
                        }}
                    />

                    <Stack.Screen
                        name='Home'
                        component={Home}
                        options={{
                            headerShown: false
                        }}
                    />



                </Stack.Navigator>
            </NavigationContainer>

        </>
    )
}

export default EntryApp;