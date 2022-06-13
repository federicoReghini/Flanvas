import React, { FC, ReactElement } from 'react';

// native components
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// screens
import Home from './screens/Home';
import Tutorial from './screens/Tutorial';

type RootStackParamList = {
    Home: undefined;
    Tutorial: undefined;
};

const EntryApp: FC = (): ReactElement => {

    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <>

            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={'Home'}
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