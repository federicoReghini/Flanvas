import React, { FC, ReactElement, useEffect, useState } from 'react';

// native components
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';


// screens
import Home from './screens/Home';
import Tutorial from './screens/Tutorial';

type RootStackParamList = {
    Home: undefined;
    Tutorial: undefined;
};

interface State {
    isPermission: boolean
}

const initState = {
    isPermission: false,
}

const EntryApp: FC = (): ReactElement => {

    const Stack = createStackNavigator<RootStackParamList>();

    const [state, setState] = useState(initState);

    const handleUseEffect = (): void => {

        const newState = Object.assign({}, state);

        (async (): Promise<void> => {

            const [CAMERA, MEDIA] = await Promise.all([
                Camera.getCameraPermissionsAsync(),
                MediaLibrary.requestPermissionsAsync()
            ]);

            if ((CAMERA.status && MEDIA.status) === "granted") {
                newState.isPermission = true;
            }

            setState(newState);
        })()
    }

    useEffect(handleUseEffect, []);

    return (
        <>

            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={'Tutorial'}
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