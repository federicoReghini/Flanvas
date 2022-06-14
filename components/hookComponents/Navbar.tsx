import React, { FunctionComponent, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

//Styles
import { styles } from '../../styles_generic';
import { navbar_style } from '../../assets/styles/navbar_style'

//Ionicons
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    callbackUndo: () => void,
    callbackRedo: () => void,
    callbackPenEraser: () => void,
    callbackMenu: () => void,
    callbackCamera: () => void,
    callbackConfirm: () => void
}

interface State {
    isPencil: boolean
}

const initState = {
    isPencil: false
}

const Navbar: FunctionComponent<Props> = ({ callbackUndo, callbackRedo, callbackPenEraser, callbackMenu, callbackCamera, callbackConfirm }) => {

    const [state, setState] = useState<State>(initState)

    const changePenEraser = () => {
        setState({
            ...state,
            isPencil: !state.isPencil
        })
        callbackPenEraser()
    }

    return (

        <View
            style={styles.containerFlexRow}>
            <Pressable onPress={callbackUndo} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="arrow-undo" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable onPress={callbackRedo} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="arrow-redo" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable onPress={changePenEraser} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    {
                        state.isPencil ?
                            <Ionicons name="pencil" size={30} color="black" />
                            :
                            <Ionicons name="bandage-outline" size={30} color="black" />
                    }
                </Text>
            </Pressable>

            <Pressable onPress={callbackCamera} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="camera" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable onPress={callbackConfirm} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="save" size={30} color="black" />
                </Text>
            </Pressable>

            <Pressable onPress={callbackMenu} style={navbar_style.button}>
                <Text style={navbar_style.icons}>
                    <Ionicons name="logo-react" size={30} color="black" />
                </Text>
            </Pressable>

        </View>

    )
}

export default Navbar