import React, { FunctionComponent } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../../styles_generic';

interface Props {
    callbackUndo: () => void,
    callbackRedo: () => void,
    callbackPenEraser: () => void,
    callbackMenu: () => void,
    callbackCamera: () => void
}

const Navbar: FunctionComponent<Props> = ({ callbackUndo, callbackRedo, callbackPenEraser, callbackMenu, callbackCamera }) => {

    return (

        <View
        style={styles.containerFlexRow}>
            <Pressable onPress={callbackUndo}>
                <Text>Undo</Text>
            </Pressable>

            <Pressable onPress={callbackRedo}>
                <Text>Redo</Text>
            </Pressable>

            <Pressable onPress={callbackPenEraser}>
                <Text>Pen/Eraser</Text>
            </Pressable>

            <Pressable onPress={callbackCamera}>
                <Text>Camera</Text>
            </Pressable>

            <Pressable onPress={callbackMenu}>
                <Text>Menu</Text>
            </Pressable>

        </View>

    )
}

export default Navbar