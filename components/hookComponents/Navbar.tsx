import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

//Styles
import { styles } from '../../styles_generic';
import { navbar_style } from '../../assets/styles/navbar_style'

//Ionicons
import Ionicons from '@expo/vector-icons/Ionicons';
import { getStorage, setStorage } from '../../utils/storage';

interface Props {
    callbackUndo: () => void,
    callbackRedo: () => void,
    callbackPenEraser: () => void,
    callbackMenu: () => void,
    callbackCamera: () => void,
    callbackConfirm: () => void
}

interface State {
    isPencil?: boolean,
    isTutorial?: boolean,
    count: number
}

const initState = {
    isPencil: false,
    count: 0
}

const Navbar: FunctionComponent<Props> = ({ callbackUndo, callbackRedo, callbackPenEraser, callbackMenu, callbackCamera, callbackConfirm }) => {

    const [state, setState] = useState<State>(initState)

    /*   if (state.count === 5) {
          Alert.alert('this is the menu')
      } */

    useEffect(() => {

        (async () => {
            let result = await getStorage('firstTime');
            setState({
                ...state,
                isTutorial: result
            })
            if (state.count === 0 && result) {
                Alert.alert('Draw something and press undo button!', '', [{ text: 'Got it' }])
            }
        })()

        if (state.count > 0) {
            functionShowAlert(state.count)
        }

    }, [state.count])

    const functionShowAlert = (count) => {
        switch (count) {
            case 1: {
                Alert.alert('Now press redo!', '', [{ text: 'ok' }])
                break;
            }
            case 2: {
                Alert.alert('Switch between pen and eraser here!', '', [{ text: 'Wow' }])
                break;
            }
            case 3: {
                Alert.alert('Change background! Take a pic or choose one from gallery!', '', [{ text: 'Cool' }])
                break;
            }
            case 5: {
                Alert.alert('Press menù logo to see other functions! Have fun with our app!', '', [{ text: 'Thanks' }])
                break;
            }
        }
    }

    const __handleOnPress = (callback: any) => async () => {
        const newState = Object.assign({}, state)
        callback()

        if (callback === callbackPenEraser) {
            newState.isPencil = !newState.isPencil
        }

        if (state?.isTutorial) {
            newState.count = newState.count + 1;
            if (newState.count === 6) {
                await setStorage('firstTime', false)
                newState.isTutorial = await getStorage('firstTime')
            }
        }

        setState(newState)
    }

    return (

        <View
            style={styles.containerFlexRow}>
            <TouchableOpacity
                disabled={state.isTutorial === false ? state.isTutorial : state.count === 0 ? !state.isTutorial : state.isTutorial}
                onPress={__handleOnPress(callbackUndo)}
                style={navbar_style.button}
            >

                <Text style={navbar_style.icons}>
                    <Ionicons name="arrow-undo" size={30} color={state.isTutorial === false ? 'white' : state.count === 0 ? 'white' : 'black'} />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                disabled={state.isTutorial === false ? state.isTutorial : state.count === 1 ? !state.isTutorial : state.isTutorial}
                onPress={__handleOnPress(callbackRedo)} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="arrow-redo" size={30} color={state.isTutorial === false ? 'white' : state.count === 1 ? 'white' : 'black'} />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                disabled={state.isTutorial === false ? state.isTutorial : state.count === 2 ? !state.isTutorial : state.isTutorial}
                onPress={__handleOnPress(callbackPenEraser)} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    {
                        state.isPencil ?
                            <Ionicons name="pencil" size={30} color={state.isTutorial === false ? 'white' : state.count === 2 ? 'white' : 'black'} />
                            :
                            <Ionicons name="bandage-outline" size={30} color={state.isTutorial === false ? 'white' : state.count === 2 ? 'white' : 'black'} />
                    }
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                disabled={state.isTutorial === false ? state.isTutorial : state.count === 3 ? !state.isTutorial : state.isTutorial}
                onPress={__handleOnPress(callbackCamera)} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="camera" size={30} color={state.isTutorial === false ? 'white' : state.count === 3 ? 'white' : 'black'} />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                disabled={state.isTutorial === false ? state.isTutorial : state.count === 4 ? !state.isTutorial : state.isTutorial}
                onPress={__handleOnPress(callbackConfirm)} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="save" size={30} color={state.isTutorial === false ? 'white' : state.count === 4 ? 'white' : 'black'} />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                disabled={state.isTutorial === false ? state.isTutorial : state.count === 5 ? !state.isTutorial : state.isTutorial}
                onPress={__handleOnPress(callbackMenu)} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="logo-react" size={30} color={state.isTutorial === false ? 'white' : state.count === 5 ? 'white' : 'black'} />
                </Text>
            </TouchableOpacity>

        </View>

    )
}

export default Navbar